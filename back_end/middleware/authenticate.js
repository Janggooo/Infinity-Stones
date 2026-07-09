const { getAuth } = require("firebase-admin/auth");

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No authentication token provided."
        });
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {

        const decodedToken = await getAuth().verifyIdToken(idToken);

        req.user = decodedToken;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }

};