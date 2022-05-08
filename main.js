const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

const user = require('./routes/user');
const { SECRET } = require('./config');

const port = process.env.PORT || 8080;

// Setup 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Register routes
app.get('/health', (req, res) => {
    res.json({
        message: 'Running'
    })
})
app.use('/auth', user)

app.use('/api', function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}, (req, res) => res.json({ 'Ok': 'Ok', ...req.user }))


const start = async () => {
    try {
        const mongoose = require('mongoose');
        await mongoose.connect('mongodb://localhost:27017/vin-sell');
        // Server run
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running over here http://localhost:${port}/health`)
        })
    } catch (error) {
        console.error('Failed to get the server running', error)
    }
}

start();