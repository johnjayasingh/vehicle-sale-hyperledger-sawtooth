const express = require('express');
const cors = require('cors');

const app = express();

const user = require('./routes/user')

const port = process.env.PORT || 8080;

// Setup 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// Register routes
app.get('/health', (req,res)=>{
    res.json({
        message: 'Running'
    })
})
app.use('/auth', user)


// Server run
app.listen(port, '0.0.0.0',()=>{
    console.log(`Server running over here http://localhost:${port}/health`)
})