const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');



const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Request received:', { username, email, password });

    try {
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.status(400).json({ msg: "Username already used", status: false });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(400).json({ msg: 'Email already used', status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });



        return res.status(200).json({ status: true, user });
    } catch (ex) {
        console.error('Error during user registration:', ex);
        res.status(500).json({ msg: 'Internal server error' });
    }
}
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "Incorrect username or password ", status: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Incorrect username or password', status: false });

        }


        return res.status(200).json({ status: true, user });
    } catch (ex) {
        console.error('Error during user registration:', ex);
        res.status(500).json({ msg: 'Internal server error' });
    }
}
const setAvatar = async (req, res, next) => {
    const avatarImage = req.body.image;
    const userId = req.params.id;

    try {
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: avatarImage
        }, { new: true });


        res.status(200).json({ msg: "Avatar set successfully", user: {
            isSet : userData.isAvatarImageSet,
            image : userData.avatarImage
        } });
    } catch (ex) {
        console.error("Error setting avatar:", ex);
        next(ex); // Pass the error to the error handler middleware
    }
};


module.exports = { registerUser, loginUser,setAvatar};
