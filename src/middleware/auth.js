const jwt = require("jsonwebtoken")

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(400).send({ status: false, message: "Token required" })

        jwt.verify(token, "group14project3", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ status: false, message: "token is invalid or token expired"} );

            }
            req.decodedToken = decodedToken    

            next()
        });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports={authentication}