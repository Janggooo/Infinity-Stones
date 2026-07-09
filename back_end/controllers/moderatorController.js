const moderatorService = require("../services/moderatorService");

exports.getPendingModerators = async (req, res, next) => {

    try {

        const moderators = await moderatorService.getPendingModerators();

        return res.json({
            success: true,
            data: moderators
        });

    } catch (error) {
        next(error);
    }

};

exports.approveModerator = async (req, res, next) => {

    try {

        const moderator = await moderatorService.approveModerator(
            req.params.uid
        );

        if (!moderator) {
            return res.status(404).json({
                success: false,
                message: "Moderator not found."
            });
        }

        return res.json({
            success: true,
            message: "Moderator approved successfully.",
            data: moderator
        });

    } catch (error) {
        next(error);
    }

};

exports.rejectModerator = async (req, res, next) => {

    try {

        const moderator = await moderatorService.rejectModerator(
            req.params.uid
        );

        if (!moderator) {
            return res.status(404).json({
                success: false,
                message: "Moderator not found."
            });
        }

        return res.json({
            success: true,
            message: "Moderator rejected successfully.",
            data: moderator
        });

    } catch (error) {
    next(error);
    }

};