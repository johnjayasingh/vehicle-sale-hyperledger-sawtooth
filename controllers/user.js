const { createPrivateKey } = require('../service/credential')

const users = {

}

exports.registerUser = (req, res) => {
    const privateKey = createPrivateKey();
    const { userId } = req.body;
    if (users[userId]) {
        return res.status(409).json({
            message: 'User already exist'
        })
    }
    users[userId] = privateKey;
    res.json({
        userId: req.body.userId,
        privateKey,
    })
}