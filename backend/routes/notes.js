const router = require('express').Router();
const fetchuser = require("../middleware/fetchuser");
const notesdata = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//Route 1: Get All notes using :GET "/api/notes/fetchnotes" , Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const notes = await notesdata.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.send(error);
    }
});

//Route 2: Add a new notes using :POST "/api/notes/addnote" , Login required
router.post('/addnote', fetchuser, [
    body('title', 'title must be atleast 3 character').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        const { title, description, tag } = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const notes = new notesdata({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        });
        const savenote = await notes.save();
        res.json([savenote]);
    } catch (error) {
        res.send(error);
    }
});

//Route 3: Update an existing note using POST "/api/notes/updatenote" , login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newnote = {};
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }
        // Find the note to be updated and update
        const note = await notesdata.findById(req.params.id);
        if (!note) {
            return req.status(404).send("note not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("you not allow update another note");
        }

        let noteupdated = await notesdata.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json({ noteupdated });
    } catch (error) {
        res.send(error);
    }
});

//Route 3: delete an existing note using DELETE "/api/notes/deletenote" , login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        const note = await notesdata.findById(req.params.id);
        if (!note) {
            return req.status(404).send({error:"notes not found"});
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("you not allow update another note");
        }
        let notesdeleted = await notesdata.findByIdAndDelete(req.params.id);
        res.send({ notesdeleted });
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;