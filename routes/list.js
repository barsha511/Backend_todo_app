const router = require('express').Router();
const User = require("../model/user");
const List = require("../model/list");
router.post('/AddTodo', async (req, res) => {
    const { title, body, email } = req.body;
    const isexistuser = await User.findOne({ email });
    try {
        if (isexistuser) {
            const list = new List({ title, body, user: isexistuser });
           // await list.save().then(() => res.status(200).json({ list }));
           await list.save()
            isexistuser.list.push(list);
            isexistuser.save();
            res.status(200).json({ list })
        }
    }
    catch (err) {
        res.status(400).json({message:"Loggin again" + err})
    }
});
router.put('/UpdateTodo/:id', async (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;
    const isexistuser = await User.findOne({ email });
    try {
        if (isexistuser) {
            const updatedList = await List.findByIdAndUpdate(id, { title, body }, { new: true });
            await updatedList.save();
            res.status(200).json({ updatedList });
        }
    } catch (err) {
        res.status(400).json({ message: "Error updating todo: " + err });
    }
});
router.delete('/DeleteTodo/:id', async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    const isexistuser = await User.findOneAndUpdate({ email },{ $pull: { list: id } });
    try {
        if (isexistuser) {
            await List.findByIdAndDelete(id);
            res.status(200).json({ message: "deleted" })
        }
    }
    catch (err) {
        res.status(400).json({ message: "Error deleting todo: " + err });
    }
})

router.get('/ReadList/:id', async (req, res) => {
    try {
        const list = await List.find({ user: req.params.id });
        //.sort({createAt:-1})reacent wala list upar aa jayengaa
        if (list.length !== 0) {
            res.status(200).json({ list:list });
        }
        else {
            res.status(400).json({message:"NO task is created"})
        }
    }
    catch (err) {
        res.status(400).json({ message: "Can't read the file" + err });
    }
})
module.exports = router;