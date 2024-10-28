// Required modules
const express = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Helper function to read users from JSON file
const readUsersFromFile = () => {
    try {
        if (!fs.existsSync('users.json')) {
            fs.writeFileSync('users.json', '[]'); // Create file if it doesn't exist
        }
        const data = fs.readFileSync('users.json', 'utf-8');
        return JSON.parse(data); // Parse JSON data
    } catch (error) {
        console.error('Error reading users.json:', error);
        return []; // Return empty array if error occurs
    }
};

// Helper function to write users to JSON file
const writeUsersToFile = (users) => {
    try {
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing to users.json:', error);
    }
};

// Registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        const users = readUsersFromFile();
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        writeUsersToFile(users);

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = readUsersFromFile();
        const user = users.find(user => user.username === username);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials: User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials: Incorrect password.' });
        }

        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
