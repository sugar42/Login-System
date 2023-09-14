const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const postLogin = async (req, res) =>{
    try {
        const { mail, password } = req.body;

        const user = await User.findOne({mail: mail.toLowerCase() });

        if(user && (await brcryt.compare(password, user.password))){
            // send new token
            const token = jwt.sign(
                {
                    userId: user._id,
                    mail
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '24h',
                }
            );

            return res.status(200).json({
                userDetails: {
                    mail: user.mail,
                    token: token,
                    username: user.username,
                },
            });
        }

        return res.status(400).send('Invalid credentials.');
    } catch (err) {
        return res.status(500).send('Something went wrong.');
    }
};


module.exports = postLogin;

