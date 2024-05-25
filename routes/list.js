const router = require('express').Router();
const User = require("../model/user");
const List = require("../model/list");
router.post('/AddTodo', async (req, res) => {
    const { title, body, id } = req.body;
    const isexistuser = await User.findById(id);
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
    const { id } = req.body; // This is the user ID
    const listId = req.params.id; // This is the todo ID

    try {
        // Find and update the user to pull the list item
        const isExistUser = await User.findByIdAndUpdate(
            id,
            { $pull: { list: listId } },
            { new: true } // This returns the updated document
        );

        if (isExistUser) {
            // Find and delete the list item
            await List.findByIdAndDelete(listId);
            res.status(200).json({ message: "Todo deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(400).json({ message: "Error deleting todo: " + err });
    }
});

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