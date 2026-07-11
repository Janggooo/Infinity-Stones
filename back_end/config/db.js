const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "intrams",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function initializeDatabase() {
  if (!process.env.DB_HOST && !process.env.DB_USER && !process.env.DB_PASSWORD) {
    console.warn("MySQL environment variables are not set. Skipping database initialization.");
    return null;
  }

  const connection = await pool.getConnection();
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "infinity_stones"}\``);
    await connection.query(`USE \`${process.env.DB_NAME || "infinity_stones"}\``);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS app_health_check (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("MySQL connection initialized successfully.");
    return connection;
  } catch (error) {
    console.error("MySQL initialization failed:", error.message);
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { pool, initializeDatabase };
