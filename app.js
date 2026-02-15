const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = {
  admin: { password: 'admin123', role: 'admin' },
  user1: { password: 'user123', role: 'user' },
  manager: { password: 'manager123', role: 'manager' },
};

// Middleware for authentication
function authenticate(req, res, next) {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    req.user = { username, role: user.role };
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

// Login route
app.post('/login', authenticate, (req, res) => {
  res.status(200).send(`Welcome ${req.user.username}, you are logged in as ${req.user.role}`);
});

// Register route (for demo purposes, we won't save new users)
app.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  users[username] = { password, role };
  res.status(201).send(`User ${username} created.`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});