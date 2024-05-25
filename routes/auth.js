const router = require('express').Router();
const User = require("../model/user");
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        //const hashpassword = bcrypt.hashSync(password);
        const user = new User({ username, email, password });
        await user.save();
        res.status(200).json({ message:"Successfully Register" });
    }
    catch (err) {
        res.status(200).json({message:"User already exist"})
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json({ message: "please register first" });
        }

        if (password !== user.password) {
            return res.status(200).json({ message: "Invalid Password" });
        }

        res.status(200).json({ userDoc: { userId: user._id },message:"Login successful" });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err });
    }
});

module.exports = router;
