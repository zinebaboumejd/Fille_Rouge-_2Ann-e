const mongoose = require('mongoose');

const RepasSchema = mongoose.Schema({
    nom: {
        type: String,
        required: [true, "S'il vous plaît entrez votre nom"],
    },
    // date: {
    //     type: Date,
    //     required: [true, "S'il vous plaît entrez votre date"],
    // },
  
    aliments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aliment',
    }],

}, {
    timestamp: true,
});

module.exports = mongoose.model('Repas', RepasSchema);
