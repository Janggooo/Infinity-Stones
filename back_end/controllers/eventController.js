const eventService = require("../services/eventService");

exports.getSports = async (req, res, next) => {

    try {

        const sports = await eventService.getSports();

        return res.json({
            success: true,
            data: sports
        });

    } catch (error) {
        next(error);
    } 

};

exports.getSportById = async (req, res, next) => {

    try {

        const { id } = req.params;

        const sport = await eventService.getSportById(id);

        if (!sport) {
            return res.status(404).json({
                success: false,
                message: "Sport not found."
            });
        }

        return res.json({
            success: true,
            data: sport
        });

    } catch (error) {
        next(error);
    }

};

exports.createSport = async (req, res, next) => {

    try {

        const { name, category } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                success: false,
                message: "Name and category are required."
            });
        }

        const newSport = await eventService.createSport({
            name,
            category
        });

        return res.status(201).json({
            success: true,
            message: "Sport created successfully.",
            data: newSport
        });

    } catch (error) {
        next(error);
    }

};

exports.updateSport = async (req, res, next) => {

    try {

        const { id } = req.params;
        const { name, category } = req.body;

        if (!name || !category) {
            return res.status(400).json({
                success: false,
                message: "Name and category are required."
            });
        }

        const updatedSport = await eventService.updateSport(id, {
            name,
            category
        });

        if (!updatedSport) {
            return res.status(404).json({
                success: false,
                message: "Sport not found."
            });
        }

        return res.json({
            success: true,
            message: "Sport updated successfully.",
            data: updatedSport
        });

    } catch (error) {
        next(error);
    }

};

exports.deleteSport = async (req, res, next) => {

    try {

        const { id } = req.params;

        const deletedSport = await eventService.deleteSport(id);

        if (!deletedSport) {
            return res.status(404).json({
                success: false,
                message: "Sport not found."
            });
        }

        return res.json({
            success: true,
            message: "Sport deleted successfully.",
            data: deletedSport
        });

    } catch (error) {
        next(error);
    }

};