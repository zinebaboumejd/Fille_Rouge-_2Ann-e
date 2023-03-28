const mongoose = require("mongoose");

const CorpsSchema = mongoose.Schema(
    {
        iduser:{
            // ref
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "S'il vous plaît entrez votre iduser"],
        },
        age: {
            type: String,
            required: [true, "S'il vous plaît entrez votre Age"],
        },
        sexe: {
            type: String,
            required: [true, "S'il vous plaît entrez votre Sexe"],
    },
    poits: {
        type: String,
        required: [true, "S'il vous plaît entrez votre Poits"],
    },
    taille: {
        type: String,
        required: [true, "S'il vous plaît entrez votre Taille"],
    },
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("Corps", CorpsSchema);