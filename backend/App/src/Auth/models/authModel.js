const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "S'il vous plaît entrez votre nom"],
    },
    prenom: {
      type: String,
      required: [true, "S'il vous plaît entrez votre prenom"],
    },
    email: {
      type: String,
      required: [true, "S'il vous plaît entrez votre email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "S'il vous plaît entrez votre le mot de passe"],
    },
    status: {
      type: String,
      required: true,
      default: "inactive",
      enum:["active","inactive"]
    },
    datecreation: {
      type: Date,
      required: true,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
