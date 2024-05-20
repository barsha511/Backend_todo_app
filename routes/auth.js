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
        const user =await User.findOne({ email });
        if (!user) {
            res.status(200).json({ message: "please register first" });
        }
        
        if (req.body.password!==user.password) {
            res.status(200).json({message:"Invalid Password"})
        }
        
        res.status(200).json({user});
    }
    catch (err) {
        res.status(400).json({message:"Loggin again" + err})
    }
})

module.exports = router;
