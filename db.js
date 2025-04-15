const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool(
  process.env.DATABASE_URL
    ? { uri: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 12,
        queueLimit: 0,
        ssl: {
          rejectUnauthorized: true, 
        },
      }
);

pool.getConnection()
  .then(conn => {
    console.log("✅ Database connected successfully!");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

module.exports = pool;
