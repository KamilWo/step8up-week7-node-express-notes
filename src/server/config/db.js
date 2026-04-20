// This file contains database connection setup for PostgreSQL.
const { Pool } = require("pg");

// Define the base configuration for the pool.
// For production environments (like Render, Heroku), a secure SSL connection is required.
// The exact SSL configuration can vary by provider.
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

const pool = new Pool(poolConfig);

const connectDB = async () => {
  try {
    // Test the connection by fetching the current time from the database
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.log("PostgreSQL Connected:", result.rows[0].now);
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error("PostgreSQL connection error:", err.stack);
    // Exit the process with a failure code if we can't connect to the DB
    process.exit(1);
  }
};

module.exports = { connectDB, pool };
