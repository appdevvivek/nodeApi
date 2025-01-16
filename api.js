const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample data
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Routes

// 1. Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// 2. Get a user by ID
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// 3. Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 4. Update a user
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

// 5. Delete a user
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
