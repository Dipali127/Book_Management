const userModel = require("../models/userModel")
const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
const validations = require('../validator/validation')
const moment = require('moment');

//**********************************************Create Book************************************************

const createBooks = async function (req, res) {
    try {
        const data = req.body;
        const { title, preview, userId, ISBN, category, releasedAt } = data;

        if (!validations.isEmpty(data)) { return res.status(400).send({ status: false, message: 'please provided data' }) }

        if (!validations.checkData(title)) { return res.status(400).send({ status: false, message: 'title is required' }) }

        let isUniquetitle = await bookModel.findOne({ title: title })
        if (isUniquetitle) { return res.status(400).send({ status: false, message: 'title already exist' }) }

        if (!validations.checkData(preview)) { return res.status(400).send({ status: false, message: 'preview is required' }) }

        if (!validations.checkData(userId)) { return res.status(400).send({ status: false, message: 'User Id is required' }) }

        if (!validations.checkObjectId(userId)) { return res.status(400).send({ status: false, message: 'Please enter a valid userId' }) }

        let checkId = await userModel.findOne({ _id: userId })
        if (!checkId) { return res.status(400).send({ status: false, message: 'no user found, Please enter a valid User Id' }) }

        if (!validations.checkData(ISBN)) { return res.status(400).send({ status: false, message: 'ISBN is required' }) }

        if (!validations.isValidISBN(ISBN)) { return res.status(400).send({ status: false, message: 'please provide a valid ISBN in the format: 978-XXXX-XXXX-X or 979-XX-XXXXX-XX-X' }) }

        let isISBNUnique = await bookModel.findOne({ ISBN: ISBN })
        if (isISBNUnique) { return res.status(400).send({ status: false, message: 'ISBN already exist, please try again' }) }

        if (!validations.checkData(category)) { return res.status(400).send({ status: false, message: 'category is required' }) }

        if (!validations.checkData(releasedAt)) { return res.status(400).send({ status: false, message: 'released date is required' }) }

        // Parsing the provided date using Moment.js in 'YYYY-MM-DD' format
        const releasedat = moment(releasedAt, 'YYYY-MM-DD');

        // Checking if the parsed date is valid
        if (!releasedat.isValid()) {
            return res.status(400).send({ status: false, message: "invalid date format" });
        }

        const newBook = await bookModel.create(data);
        return res.status(201).send({ status: true, message: 'book is successfully published ', data: newBook })
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
}

//**********************************************Get Book************************************************

const getBooks = async function (req, res) {
    try {
        const queries = req.query;
        let booksDocuments;
        if (!validations.isEmpty(queries)) {
            booksDocuments = await bookModel.find({ isDeleted: false }).
                select({ title: 1, preview: 1, userId: 1, category: 1, releasedAt: 1, reviewsCount: 1 }).sort({ title: 1 })
        } else {
            booksDocuments = await bookModel.find({
                $or: [{ userId: queries.userId }, { category: queries.category }]
            }).find({ isDeleted: false }).select({ title: 1, preview: 1, userId: 1, category: 1, releasedAt: 1, reviewsCount: 1 }).sort({ title: 1 });
        }

        if (booksDocuments.length == 0) {
            return res.status(404).send({ status: false, message: "Sorry, Required books Documents not Found." })
        } else {
            return res.status(200).send({ status: true, message: booksDocuments });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//**********************************************Get Book BY ID************************************************

const getBookById = async function (req, res) {
    try {
        let bookId = req.params.bookId;
        if (!validations.checkObjectId(bookId))
             { return res.status(400).send({ status: false, msg: " Invalid bookId" }) }

        let bookDocument = await bookModel.findById({ _id: bookId }).select({ISBN: 0, deletedAt: 0});
        if (!bookDocument || bookDocument.isDeleted === true) {
            return res.status(404).send({ status: false, message: "books Documents not found" }) }

        let review = await reviewModel.find({book: bookId}).select({ reviewedBy: 1, reviewedAt: 1, rating: 1, comment: 1 })
        let result = {
            bookDocument,
            reviewsData: review
        };
        return res.status(200).send({ status: true, message: "Books list", data: result })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//**********************************************Update Book Document************************************************

const Booksupdate = async function (req, res) {
    try {
        let book_Id = req.params.bookId
        if (!validations.checkObjectId(book_Id)) { return res.status(400).send({ status: false, message: 'please Enter a valid id' }) }

        let data = req.body;
        const { title, preview, releasedAt } = data;
        if (!validations.isEmpty(data)) { return res.status(400).send({ status: false, message: 'please provide data' }) }

        let book = await bookModel.findById(book_Id)
        if (!book || book.isDeleted) return res.status(404).send({ status: false, message: "Book does not exist or has already been deleted" })

        // Authorization Check
        let loggedInUserId = req.decodedToken.userId; 
        if (book.userId.toString() !== loggedInUserId) {
            return res.status(403).send({ status: false, message: "You are not authorized to update this book" });
        }

        if (title) {
            let isTitleUnique = await bookModel.findOne({ title: title, _id: { $ne: book_Id } });
            if (isTitleUnique) {
                return res.status(400).send({ status: false, message: "Title already exists. Please provide a unique title" });
            }
        }

        // Validate ReleasedAt field
        if (releasedAt) {
            // Parsing the provided date using Moment.js in 'YYYY-MM-DD' format
            const releasedAtDate = moment(releasedAt, "YYYY-MM-DD", true);
             // Checking if the parsed date is valid
            if (!releasedAtDate.isValid()) {
                return res.status(400).send({ status: false, message: "Invalid date format. Use YYYY-MM-DD" });
            }
        }
        let updatedBook = await bookModel.findOneAndUpdate({ _id: book_Id }, { title, preview, releasedAt }, { new: true })
        return res.status(200).send({ status: true, message: 'Success', data: updatedBook })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//**********************************************Delete Book By ID************************************************

const deleteBooksbyId = async function (req, res) {
    try {
        let bookId = req.params.bookId
        if (!validations.checkObjectId(bookId)) { return res.status(400).send({ status: false, message: 'please Enter a valid id' }) }
        let bookDocument = await bookModel.findById({ _id: bookId })
        if (!bookDocument) return res.status(404).send({ status: false, message: "Book document does not exists" })

        // Authorization Check
        let loggedInUserId = req.decodedToken.userId; 
        if (bookDocument.userId.toString() !== loggedInUserId) {
            return res.status(403).send({ status: false, message: "You are not authorized to update this book" });
        }

        if (bookDocument.isDeleted == true) return res.status(404).send({ status: false, message: "Book document is already deleted" })
        await bookModel.findOneAndUpdate({ _id: bookId },
            {
                $set: { isDeleted: true, deletedAt: new Date() }
            }
        )
        return res.status(200).send({ message: "Deleted" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.createBooks = createBooks
module.exports.getBooks = getBooks
module.exports.getBookById = getBookById
module.exports.Booksupdate = Booksupdate
module.exports.deleteBooksbyId = deleteBooksbyId






