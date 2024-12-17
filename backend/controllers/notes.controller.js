const Notes = require("../models/notes.models");
const User = require("../models/user.models");
const mongoose = require("mongoose");

const addNewNote = async (req, res) => {
    try {
        const {title, description, tags} = req.body;
        if (!title || !description || !tags) {
            return res.status(400).json({message: "Please fill all the fields"});
        };
        const notes = new Notes({
            title,
            description,
            tags,
            userId: req.user.id
        });
        await notes.save();
        res.status(201).json({message: "Notes added successfully", data: notes});
    } catch (error) {
        console.error("Error in addNewNote controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const getAllNotes = async (req, res) => {
    try {
        const {tags} = req.query;
        const filters = {userId: req.user.id};
        if (tags) {
            filters.tags = {$in: tags.split(", ")};
        };
        const notes = await Notes.find(filters);
        if (!notes) {
            return res.status(404).json({message: "Notes not found"});
        };
        res.status(200).json({data: notes});
    } catch (error) {
        console.error("Error in getAllNotes controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || "An unexpected error occurred",
        });
    };
};

const updateNotes = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Invalid ID"});
        };
        const notes = await Notes.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!notes) {
            return res.status(404).json({message: "Notes not found"});
        };
        res.status(200).json({message: "Notes updated successfully", data: notes});
    } catch (error) {
        console.error("Error in updateNotes controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || 'An unexpected error occurred',
        });
    };
};

const deleteNotes = async (req, res) => {
    try {
        const notes = await Notes.findByIdAndDelete(req.params.id);
        if (!notes) {
            return res.status(404).json({message: "Notes not found"});
        };
        res.status(200).json({message: "Notes deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNotes controller:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message || 'An unexpected error occurred',
        })
    }
}

module.exports = {addNewNote, getAllNotes, updateNotes, deleteNotes};