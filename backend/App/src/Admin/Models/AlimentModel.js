const mongoose = require("mongoose");

const AlimentSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            required: [true, "S'il vous plaît entrez votre nom"],
        },
        Calorie:{
            type: Number,
            required: [true, "S'il vous plaît entrez votre Calorie"],
        },
        Proteine:{
            type: Number,
            required: [true, "S'il vous plaît entrez votre Proteine"],
        },
        Glucide:{
            type: Number,
            required: [true, "S'il vous plaît entrez votre Glucide"],
        },

        },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("Aliment", AlimentSchema);