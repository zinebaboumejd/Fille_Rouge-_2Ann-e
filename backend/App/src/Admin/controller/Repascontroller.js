const express = require("express"); 
const asyncHandler = require("express-async-handler");
const Repas=require ("../Models/RepasModels")


// /get user
const getRepas = asyncHandler(async (req, res) => {
    const repas = await Repas.find();
    res.json(repas);
});

// addRepas
const addRepas = asyncHandler(async (req, res) => {
    const {nom,date,aliments}=req.body;
    const repas = await Repas.create({
        nom,
        date,
        aliments,
    });
    if (repas) {
        res.status(201).json({
            _id: repas._id,
            nom: repas.nom,
            date: repas.date,
            aliments: repas.aliments,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}
);
// deleteRepas
const deleteRepas = asyncHandler(async (req, res) => {
    const repas = await Repas.findById(req.params.id);
    if (repas) {
        await repas.remove();
        res.json({ message: "Repas removed" });
    } else {
        res.status(404);
        throw new Error("Repas not found");
    }
}
);
// updateRepas
const updateRepas = asyncHandler(async (req, res) => {
    const {nom,date,aliments}=req.body;
    const repas = await Repas.findById(req.params.id);
    if (repas) {
        repas.nom = nom;
        repas.date = date;
        repas.aliments = aliments;
        const updatedRepas = await repas.save();
        res.json({
            _id: updatedRepas._id,
            nom: updatedRepas.nom,
            date: updatedRepas.date,
            aliments: updatedRepas.aliments,
        });
    } else {
        res.status(404);
        throw new Error("Repas not found");
    }
}
);





module.exports = {
 
    getRepas,
    addRepas,
    deleteRepas,
    updateRepas,

  
};