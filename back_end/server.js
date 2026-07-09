console.log(__filename);

const { errorHandler } = require("./middleware/errorHandler");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
require("./config/firebaseAdmin");
const eventRoutes = require("./routes/eventRoutes");
const moderatorRoutes = require("./routes/moderatorRoutes");
const { logger } = require("./middleware/logger");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/moderators", moderatorRoutes);

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});