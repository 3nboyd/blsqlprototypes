const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

// Azure SQL Database Configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // Azure server name
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: false
    }
};

// User Registration Endpoint
app.post('/register', async (req, res) => {
    const { username, email, password, fullName, gradeLevel, subjectsEnrolled } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const pool = await sql.connect(dbConfig);

        const query = `
            INSERT INTO Users (Username, Email, PasswordHash, FullName, GradeLevel, SubjectsEnrolled)
            VALUES (@username, @Email, @PasswordHash, @FullName, @GradeLevel, @SubjectsEnrolled)
        `;

        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('passwordHash', sql.NVarChar, hashedPassword)
            .input('fullName', sql.NVarChar, fullName)
            .input('gradeLevel', sql.NVarChar, gradeLevel)
            .input('subjectsEnrolled', sql.NVarChar, subjectsEnrolled)
            .query(query);

        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error registering user." });
    }
});

// User Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await sql.connect(dbConfig);
        const query = `SELECT * FROM Users WHERE Username = @username`;

        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query(query);

        const user = result.recordset[0];
        if (!user) return res.status(404).send({ error: "User not found." });

        const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
        if (!isPasswordValid) return res.status(401).send({ error: "Invalid password." });

        const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: "Login successful!", token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error logging in." });
    }
});

// Get User Profile
app.get('/profile', async (req, res) => {
    const { userId } = req.query;

    try {
        const pool = await sql.connect(dbConfig);
        const query = `SELECT * FROM Users WHERE UserID = @userId`;

        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query(query);

        const user = result.recordset[0];
        if (!user) return res.status(404).send({ error: "User not found." });

        res.status(200).send({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error retrieving user profile." });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
