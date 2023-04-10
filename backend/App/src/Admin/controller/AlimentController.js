const express = require("express"); 
const Aliment=require ("../Models/AlimentModel")
const asyncHandler = require("express-async-handler");

// get  Aliment
const getAliment = asyncHandler(async (req, res) => {
    const aliment = await Aliment.find();
    res.json(aliment);
}
);
// addAliment
const addAliment = asyncHandler(async (req, res) => {
    const {nom,Calorie,Proteine,Glucide,Lipide}=req.body;
    const aliment = await Aliment.create({
        nom,
        Calorie,
        Proteine,
        Glucide,
        Lipide,
    });
    if (aliment) {
        res.status(201).json({
            _id: aliment._id,
            nom: aliment.nom,
            Calorie: aliment.Calorie,
            Proteine: aliment.Proteine,
            Glucide: aliment.Glucide,
            Lipide: aliment.Lipide,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}
);
// deleteAliment
const deleteAliment = asyncHandler(async (req, res) => {
    const aliment = await Aliment.findById(req.params.id);
    if (aliment) {
        await aliment.remove();
        res.json({ message: "Aliment removed" });
    } else {
        res.status(404);
        throw new Error("Aliment not found");
    }
}
);
// updateAliment
const updateAliment = asyncHandler(async (req, res) => {
    const {nom,Calorie,Proteine,Glucide}=req.body;
    const aliment = await Aliment.findById(req.params.id);
    if (aliment) {
        aliment.nom = nom;
        aliment.Calorie = Calorie;
        aliment.Proteine = Proteine;
        aliment.Glucide = Glucide;
        const updatedAliment = await aliment.save();
        res.json({
            _id: updatedAliment._id,
            nom: updatedAliment.nom,
            Calorie: updatedAliment.Calorie,
            Proteine: updatedAliment.Proteine,
            Glucide: updatedAliment.Glucide,
        });
    } else {
        res.status(404);
        throw new Error("Aliment not found");
    }
}
);

module.exports = {
    getAliment,
    addAliment,
    deleteAliment,
    updateAliment,
};
