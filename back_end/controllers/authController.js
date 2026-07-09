const authService = require("../services/authService");

const {
    isValidGBoxEmail,
    isValidIDNumber,
    isValidAccountType,
    isValidAffiliation
} = require("../utils/validators");

exports.register = async (req, res) => {

    try {

        const {
            idNumber,
            affiliation,
            firstName,
            lastName,
            email,
            password,
            accountType
        } = req.body;

        // Check required fields
        if (
            !idNumber ||
            !affiliation ||
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !accountType
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields."
            });
        }

        // Validate ID Number
        if (!isValidIDNumber(idNumber)) {
            return res.status(400).json({
                success: false,
                message: "ID Number must contain exactly 9 digits."
            });
        }

        // Validate affiliation
        if (!isValidAffiliation(affiliation)) {
            return res.status(400).json({
                success: false,
                message: "Invalid affiliation."
            });
        }

        // Validate account type
        if (!isValidAccountType(accountType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid account type."
            });
        }

        // Validate GBox Email
        if (!isValidGBoxEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Only ADNU GBox email addresses are allowed."
            });
        }

        const result = await authService.registerUser({
            idNumber,
            affiliation,
            firstName,
            lastName,
            email,
            password,
            accountType
        });

        return res.status(200).json(result);

    } catch (error) {

        console.error(error);

        if (error.code === "auth/email-already-exists") {
            return res.status(409).json({
                success: false,
                message: "This email is already registered."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }

};

exports.login = async (req, res, next) => {

    try {

        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({
                success: false,
                message: "ID token is required."
            });
        }

        const result = await authService.loginUser(idToken);

        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }

};