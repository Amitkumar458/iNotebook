const todomodel = require('../models/Todo');
const fetchuser = require("../middleware/fetchuser");
const router = require('express').Router();


router.get('/gettodolist' , fetchuser , async (req , res) => {
    try {
        userId = req.user.id;
        const list = await todomodel.find({ user: req.user.id });
        res.json(list);
    } catch (error) {
        res.send(error);
    }
});

router.post('/posttodolist' , fetchuser , async (req , res) => {
    try {
        const list = new todomodel({
            user: req.user.id,
            value:req.body.value
        });
        const savenote = await list.save();
        res.json(savenote);
    } catch (err) {
        res.send(err);
    }
});

router.put('/updatetodolist/:id' , fetchuser , async (req , res) => {
    try {
        const todoupdate = await todomodel.findById(req.params.id);
        if (!todoupdate) {
            return req.status(404).send("note not found");
        }
        if (todoupdate.user.toString() !== req.user.id) {
            return res.status(401).send("you not allow update another note");
        }
    
        let todeupdated = await todomodel.findByIdAndUpdate(req.params.id, { $set: {value:req.body.value} }, { new: true });
        res.json({ todeupdated });
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;