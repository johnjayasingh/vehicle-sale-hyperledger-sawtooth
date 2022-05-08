const User = require('../schemas/user');
const { createPrivateKey } = require('../service/credential')
const registerUserSchema = require('../validations/register-user')

const users = {

}

exports.registerUser = async (req, res) => {
    const valid = registerUserSchema.validate(req.body);
    if (valid.error) {
        // TODO meaningful error insight
        return res.json(valid.error.details).status(400);
    }
    const user = await User.findOne({
        username: req.body.username
    })
    if (user) {
        return res.status(409).json({
            message: 'User already exist'
        })
    }
    const { privateKey, publicKey } = createPrivateKey();
    const { username, name } = req.body;
    await User.create({
        username,
        name,
        privateKey,
        publicKey
    })
    res.json({
        name,
        username,
        publicKey,
    })
}