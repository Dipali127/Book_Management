//**************************************VALIDATION FUNCTIONS*******************************/

const mongoose = require('mongoose')
// Checks if an object is not empty by verifying if it contains any keys
const isEmpty = (data) => { return Object.keys(data).length > 0 };

// Checks if a value is a non-empty string
const checkData = (data) => { return typeof data === 'string' && data.length > 0 };

// Validates a name to ensure it contains only letters(small & capital) and space is allowed
const checkName = (name) => /^[A-Za-z\s]+$/.test(name);

// Validates an email address using a regular expression
const checkEmail = (email) => { return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) };

// Validates a password to ensure it contains at least one lowercase letter, one uppercase letter, one digit, and one special character. 
// The password must be at least 8 characters long with no maximum length restriction.
const checkPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(password);
};

// Validates a mobile number to ensure it starts with a digit from 6 to 9, followed by exactly 9 digits
//  (any digit from 0 to 9) with a total length of 10 digits.
const checkMobile = (mobileNumber) => { return /^[6-9]\d{9}$/.test(mobileNumber) }

// Validate that the pincode must be of 6 digits long, starting with a digit from 1-9.
// Optionally, it can start with a plus sign (+).
const isValidPincode = (pincode) => { return (/^\+?([1-9]{1})\)?([0-9]{5})$/.test(pincode)); }

// It checks whether the given value matches the standard ISBN-13 format with hyphens.
// It ensures that the ISBN starts with one of the valid ISBN-13 prefixes: 978 or 979.
// The format consists of five groups: the prefix, registration group, registrant element, publication element, and check digit, all separated by hyphens.
// Example: 978-0-306-40615-7, 979-10-90232-11-8, and 978-1-56619-909-4 are valid ISBN-13 formats.

const isValidISBN = function (value) {
    return /^(978|979)-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/.test(value);
}

// Validates a MongoDB ObjectId using mongoose.isValidObjectId().
const checkObjectId = (id) => { return mongoose.isValidObjectId(id); }

// The function checks whether the input `rating` is a number and valid rating from 1 to 5.
const isValidRating = function(rating) {
    return typeof rating === "number" && /^\s*([1-5])\s*$/.test(rating.toString());
  };
  

module.exports = {
    isEmpty, checkData, checkName, checkEmail, checkPassword,  checkMobile, isValidPincode,
    isValidISBN, checkObjectId, isValidRating
}