const { registerUser } = require('../controllers/user');

const router = require('express').Router();



router.post('/register', registerUser)


module.exports = router;