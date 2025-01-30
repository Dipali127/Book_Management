const userModel = require('../models/userModel');
const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const validations = require("../validator/validation")
const moment = require('moment');


//**********************************************Create review************************************************

const createReview = async (req, res) => {
  try {

    let bookId = req.params.bookId;
    let data = req.body;
    const {reviewedBy, reviewedAt, rating,comment} = data;
    if (!validations.isEmpty(data)) {return res.status(400).send({ status: false, msg: "Please Enter Some Data in request body" })}

    if (!validations.checkObjectId(bookId)) {return res.status(400).send({ status: false, msg: "invalid bookId" })}

    let allbooks = await bookModel.findById(bookId)
    if (!allbooks) { return res.status(404).send({ status: false, msg: "no book found" }) }
    if (allbooks.isDeleted === true) { return res.status(400).send({ status: false, msg: "book is Deleted" }) }

    if(!validations.checkData(reviewedBy)){
      return res.status(400).send({status:false, message: "reviewedBy is required"});
    }

    if(!validations.checkObjectId(reviewedBy)){
      return res.status(400).send({status:false, message: "invalid reviewer Id"})
    }

    if (!validations.checkData(reviewedAt)) {
      return res.status(400).send({ status: false, message: "reviewedAt is required" });
    }

    // Parsing the provided date using Moment.js in 'YYYY-MM-DD' format
    const reviewAt = moment(reviewedAt, "YYYY-MM-DD");

    // Checking is the parsed date isvalid
    if (!reviewAt.isValid()) {
      return res.status(400).send({ status: false, message: "invalid date format" });
    }

    if (!rating) {
      return res.status(400).send({ status: false, msg: "please Enter some rating" })
    }

    if (!validations.isValidRating(rating)) {
      return res.status(400).send({ status: false, msg: "rating must be a number and greater than equal to 1 and less than equal to 5  AND not allowed rating in decimal." })
    }

    const newReviewData = {
      book: bookId,
      reviewedBy: reviewedBy,
      reviewedAt: reviewAt.toDate(), // Save the valid date object
      rating: rating,
      comment: comment || ""
    }

    const reviewes = await reviewModel.create(newReviewData)
    // Update the reviewCount in bookModel
    await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviewCount: +1 } })

    return res.status(201).send({ status: true, msg: "Reviewes Added Succesfully", data: reviewes })

  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}


//**********************************************Update review************************************************

const updateReviewByID = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    if (!validations.checkObjectId(bookId)) {
      return res.status(404).send({ status: false, msg: "invalid bookId" });
    }
    let validBook = await bookModel.findById(bookId).select({ ISBN: 0, deletedAt: 0 });
    if (!validBook || validBook.isDeleted == true) {
      return res.status(404).send({ status: false, message: "book not found OR deleted already" });
    }

    let reviewId = req.params.reviewId;
    if (!validations.checkObjectId(reviewId)) {
      return res.status(404).send({ status: false, msg: " invalid reviewId" });
    }

    let validReview = await reviewModel.findOne({ _id: reviewId, book: bookId });
    if (!validReview || validReview.isDeleted == true) {

      return res.status(404).send({ status: false, message: "review not found OR deleted already" });
    }

    // Check reviewer is authoirzed to leave a review on published book.
    if(req.decodedToken.userId !== validReview.reviewedBy.toString()){
      return res.status(400).send({status: false, message: "reviewer is not authorised to leave a review on a book"})
    }

    const { rating, comment, reviewedBy } = req.body;
    if (!validations.isEmpty(req.body)) {
      return res.status(400).send({ status: false, msg: "provide details for update" });
    }

    if (rating) {
      if (!validations.isValidRating(rating)) {
        return res.status(400).send({ status: false, msg: "rating must be a number and greater than equal to 1 and less than equal to 5  AND not allowed rating in decimal." })
      }
    }

    let updatedReview = await reviewModel.findOneAndUpdate(
      { _id: reviewId },
      { $set: { rating: rating, reviewedBy: reviewedBy, review: comment } },
      { new: true }
    );

    let result = {
      bookData: validBook,
      reviewsData: updatedReview
    }
    return res.status(200).send({ status: true, message: "successfully updated", data: result });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
};

//**********************************************Delete review************************************************

const deleteReview = async (req, res) => {
  try{
    let bookId = req.params.bookId;
  if (!validations.checkObjectId(bookId)) {
    return res.status(404).send({ status: false, msg: "invalid bookId" });
  }
  let validBook = await bookModel.findById(bookId).select({ ISBN: 0, deletedAt: 0 });
  if (!validBook || validBook.isDeleted == true) {
    return res.status(404).send({ status: false, message: "book not found OR deleted already" });
  }

  let reviewId = req.params.reviewId;
  if (!validations.checkObjectId(reviewId)) {
    return res.status(404).send({ status: false, msg: " invalid reviewId" });
  }

  let validReview = await reviewModel.findOne({ _id: reviewId, book: bookId });
  if (!validReview || validReview.isDeleted == true) {

    return res.status(404).send({ status: false, message: "review not found OR deleted already" });
  }

  // Check reviewer is authoirzed to leave a review on published book.
  if(req.decodedToken.userId !== validReview.reviewedBy.toString()){
    return res.status(400).send({status: false, message: "reviewer is not authorised to leave a review on a book"})
  }

  // delete the review
  await reviewModel.findOneAndUpdate({ _id: reviewId }, { isDeleted: true });
  // decrement reviewCount
  await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviewCount: -1 } });

    res.status(200).send({ status: true, message: "review has been deleted successfully" });
  
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

//....................................................................................................................//

module.exports.createReview = createReview
module.exports.updateReviewByID = updateReviewByID
module.exports.deleteReview = deleteReview