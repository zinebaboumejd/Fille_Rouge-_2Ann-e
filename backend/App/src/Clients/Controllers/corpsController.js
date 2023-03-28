const express = require("express"); 
const Corps=require("../Models/corpsModel")
const asyncHandler = require("express-async-handler");


// @desc    Get all corps
// @route   GET /api/corps
// @access  Public
const getCorps = asyncHandler(async (req, res) => {
    const corps = await Corps.find({});
    res.json(corps);
    }
);

// @desc    Get corps by ID
// @route   GET /api/corps/:id
// @access  Public
const getCorpsById = asyncHandler(async (req, res) => {
    const corps = await Corps.findById(req.params.id).populate('User');
    if (corps) {
        res.json(corps);
    } else {
        res.status(404);
        throw new Error("Corps not found");
    }
}
);

// @desc    Delete a corps
// @route   DELETE /api/corps/:id
// @access  Private/Admin
const deleteCorps = asyncHandler(async (req, res) => {
    const corps = await Corps.findById(req.params.id);
    if (corps) {
        await corps.remove();
        res.json({ message: "Corps removed" });
    } else {
        res.status(404);
        throw new Error("Corps not found");
    }
}
);

// @desc    Create a corps
// @route   POST /api/corps
// @access  Private/Client
const createCorps = asyncHandler(async (req, res) => {
    const corps = new Corps({
    //   iduser connercter
    iduser: req.user._id,
    age: req.body.age,
    sexe: req.body.sexe,
    poits: req.body.poits,
    taille: req.body.taille,

    });
    const createdCorps = await corps.save();
    res.status(201).json(createdCorps);
}
);

// @desc    Update a corps
// @route   PUT /api/corps/:id
// @access  Private/Client
const updateCorps = asyncHandler(async (req, res) => {
    const { age, sexe, poits, taille } = req.body;
    const corps = await Corps.findById(req.params.id);
    if (corps) {
        corps.age = age;
        corps.sexe = sexe;
        corps.poits = poits;
        corps.taille = taille;
        const updatedCorps = await corps.save();
        res.json(updatedCorps);
    } else {
        res.status(404);
        throw new Error("Corps not found");
    }
}
);

module.exports = {
    getCorps,
    getCorpsById,
    deleteCorps,
    createCorps,
    updateCorps,
};

