const sports = [
    {
        id: 1,
        name: "Basketball",
        category: "Outdoor Sports"
    },
    {
        id: 2,
        name: "Volleyball",
        category: "Outdoor Sports"
    },
    {
        id: 3,
        name: "Mobile Legends",
        category: "Esports"
    },
    {
        id: 4,
        name: "Chess",
        category: "Board Games"
    }
];

exports.getSports = async (req, res) => {

    try {

        const sports = await eventService.getSports();

        return res.json({
            success: true,
            data: sports
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }
};

exports.getSportById = async (req, res) => {

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

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }
};

exports.createSport = async (sportData) => {

    try {

    const newSport = {
        id: sports.length
            ? Math.max(...sports.map(s => s.id)) + 1
            : 1,
        name: sportData.name,
        category: sportData.category
    };

    sports.push(newSport);

    return newSport;


}   catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }
};    

exports.updateSport = async (id, sportData) => {

    try {

    const sport = sports.find(s => s.id === Number(id));

    if (!sport) {
        return null;
    }

    sport.name = sportData.name;
    sport.category = sportData.category;

    return sport;

    }   catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }
};

exports.deleteSport = async (id) => {

    try {

    const index = sports.findIndex(sport => sport.id === Number(id));

    if (index === -1) {
        return null;
    }

    const deletedSport = sports[index];

    sports.splice(index, 1);

    return deletedSport;

    }   catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }
};