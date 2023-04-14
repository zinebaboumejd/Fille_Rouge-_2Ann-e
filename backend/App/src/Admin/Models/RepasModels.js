const mongoose = require('mongoose');
const Joi = require('joi');
const RepasSchema = mongoose.Schema({
    nom: {
        type: String,
        required: [true, "S'il vous plaît entrez votre nom"],
    },
    aliments:
    [{
        aliment:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Aliment',
        },
        quantite:{
            type: Number,
            default:100
            // required: [true, "S'il vous plaît entrez votre quantite"],
        },
    }],
    // categore
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    preparation: {
        type: String,
        required: [true, "S'il vous plaît entrez votre preparation"],
    },
    calorie: {
        type: Number,
        default:400,
        required: [true, "S'il vous plaît entrez votre calories"],
     },
   

}, {
    timestamp: true,
});

module.exports = mongoose.model('Repas', RepasSchema);