require('dotenv').config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'usersdb',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
pool.getConnection()
    .then((connection) => {
        console.log("Connected to MySQL Database");
        connection.release();
    })
    .catch((err) => {
        console.log("Failed to connect to MySQL", err);
    });

// Api routes
app.post("/api/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId
        });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

//api for get all users
app.get("/api/users", async (req, res) => {
    try {
        const [users] = await pool.execute('SELECT id, username, email FROM users');
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users", error: err.message });
    }
});

// Listening to the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
