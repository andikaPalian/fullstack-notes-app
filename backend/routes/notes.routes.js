const express = require("express");
const validateToken = require("../middleware/authMiddleware");
const { getAllNotes, addNewNote, updateNotes, deleteNotes } = require("../controllers/notes.controller");
const router = express.Router();

router.use(validateToken);
router.post("/add", addNewNote);
router.get("/get", getAllNotes);
router.put("/update/:id", updateNotes);
router.delete("/delete/:id", deleteNotes);

module.exports = router;