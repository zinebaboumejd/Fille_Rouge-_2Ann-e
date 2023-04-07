const mongoose = require('mongoose');


const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "S'il vous plaît entrez votre nom"],
    },
 
    description:{
        type: String,
        required: [true, "S'il vous plaît entrez votre description"],
    } 
}, {
    timestamp: true,
});

module.exports = mongoose.model('Category', CategorySchema);
