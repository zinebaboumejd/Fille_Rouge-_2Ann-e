const mongoose = require('mongoose');

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
            required: [true, "S'il vous plaît entrez votre quantite"],
        },
    }],
    // categore
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
   

}, {
    timestamp: true,
});

module.exports = mongoose.model('Repas', RepasSchema);
