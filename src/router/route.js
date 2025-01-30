const express  = require("express")
const router =express.Router()
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const mw = require("../middleware/auth")



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API's for user >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/register", userController.createuser)
router.post("/login", userController.login)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API's for books >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/books", mw.authentication, bookController.createBooks)
router.get("/books",  mw.authentication, bookController.getBooks)
router.get("/books/:bookId", mw.authentication, bookController.getBookById)
router.put("/books/:bookId", mw.authentication, bookController.Booksupdate)
router.delete("/books/:bookId", mw.authentication, bookController.deleteBooksbyId)


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API's for review >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/books/:bookId/review", mw.authentication, reviewController.createReview)
router.put("/books/:bookId/review/:reviewId", mw.authentication, reviewController.updateReviewByID)
router.delete("/books/:bookId/review/:reviewId", mw.authentication, reviewController.deleteReview)

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> API for pathParam >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.all("/*",(req,res)=>{res.status(400).send({status:false,message:"Invalid path params"})})

module.exports = router;