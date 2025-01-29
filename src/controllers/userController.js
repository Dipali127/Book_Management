const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const validations = require("../validator/validation")


// ****************************************REGISTER NEW USER**********************************/

const createuser = async function (req, res) {
    try {
        let data = req.body
        if (!validations.isEmpty(data)) { return res.status(400).send({ status: false, message: "user data is required" }) }
        const { title, fullName, phoneNumber, email, password, address } = data;

        if (!validations.checkData(title)) { return res.status(400).send({ status: false, message: "title is required" }) }
        if (!(title.trim() == 'Mr' || title.trim() == 'Miss' || title.trim() == 'Mrs')) { return res.status(400).send({ status: false, message: 'Please enter valid title' }) }

        if (!validations.checkData(fullName)){ return res.status(400).send({ status: false, message: "name is required" }) }
        if(!validations.checkName(fullName)){return res.status(400).send({status: false, message: "name should be in correct format"})}

        if (!validations.checkData(phoneNumber)) { return res.status(400).send({ status: false, message: "phone number is required" }) }
        if (!validations.checkMobile(phoneNumber)) { return res.status(400).send({ status: false, message: "please enter a valid phone number" }) }

        let isPhoneUnique = await userModel.findOne({ phoneNumber: phoneNumber})
        if (isPhoneUnique) { return res.status(400).send({ status: false, message: "phone number already exist" }) }

        if (!validations.checkData(email)) { return res.status(400).send({ status: false, message: "email is required" }) }
        if (!validations.checkEmail(email)) { return res.status(400).send({ status: false, message: "Please provide a valid email" }) }

        let isEmailUnique = await userModel.findOne({ email: email })
        if (isEmailUnique) { return res.status(400).send({ status: false, message: "email already exist" }) }

        if (!validations.checkData(password)) { return res.status(400).send({ status: false, message: "password is required" }) }
        if (!validations.checkPassword(password)) { return res.status(400).send({ status: false, message: "password should be in the correct format" }) }

        if (address) {
            if (!validations.checkData(address.street)) { return res.status(400).send({ status: false, message: "street is required" }) }
            if (!validations.checkData(address.city)) { return res.status(400).send({ status: false, message: "city is required" }); }
            if (!validations.checkData(address.pincode)) {
                return res.status(400).send({ status: false, message: "pincode is required" });
            }
            
            if (!validations.isValidPincode(address.pincode)) {
                return res.status(400).send({ status: false, message: "invalid pin" });
            }            
        }

        // Prepare the object and save the user to the database
        const object = {
            title: title,
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
            address: address
        }
        const newUser = await userModel.create(object);
        return res.status(201).send({ status: true, message: 'New User created successfully', data: newUser})

    }catch(error){
        return res.status(500).send({ status: false, message: error.message })
    }
    
}

// ****************************USER LOGIN*******************************/

const login = async function (req, res) {
    try {
        const data = req.body;
         
        // Check if the request body is empty
        if (!validations.isEmpty(data)) { return res.status(400).send({ status: false, message: "data is required" }); }

        const userName = data.email;
        const password = data.password;
         
        // Validate email and password
        if (!validations.checkData(userName)) { return res.status(400).send({ status: false, message: "Email is required" }) }
        if (!validations.checkEmail(userName)) { return res.status(400).send({ status: false, message: "enter a valid email address" }) }

        const user = await userModel.findOne({ email: userName });
        if (!user) { return res.status(401).send({ status: false, message: "email not found" }) }

        if (!validations.checkData(password)) { return res.status(400).send({ status: false, message: "Password is required" }) }
        if (!validations.checkPassword(password)) { return res.status(400).send({ status: false, message: "password should be in the correct format" }) }

        let token = jwt.sign({
            userId: user._id.toString(),
            iat:Math.floor(Date.now()/1000)
        },
            "group14project3", { expiresIn: "1hr" }
        );

        res.header("x-api-key", token);
        return res.status(200).send({ status: true, message: "User Login Successfully", data: token })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createuser = createuser;
module.exports.login = login;