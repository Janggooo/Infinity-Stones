const moderatorApplications = [
    {
        uid: "uid123",
        firstName: "Juan",
        lastName: "Dela Cruz",
        affiliation: "CO",
        email: "juan@gbox.adnu.edu.ph",
        approvalStatus: "pending"
    },
    {
        uid: "uid456",
        firstName: "Maria",
        lastName: "Santos",
        affiliation: "SH",
        email: "maria@gbox.adnu.edu.ph",
        approvalStatus: "pending"
    }
];

exports.getPendingModerators = async () => {
    return moderatorApplications.filter(
        moderator => moderator.approvalStatus === "pending"
    );
};

exports.approveModerator = async (uid) => {

    const moderator = moderatorApplications.find(
        m => m.uid === uid
    );

    if (!moderator) {
        return null;
    }

    moderator.approvalStatus = "approved";

    return moderator;

};

exports.rejectModerator = async (uid) => {

    const moderator = moderatorApplications.find(
        m => m.uid === uid
    );

    if (!moderator) {
        return null;
    }

    moderator.approvalStatus = "rejected";

    return moderator;

};