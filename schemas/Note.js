const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: {
        type: String
    },
    createdAt: {
        type: Date, 
        default: Date.now 
    }
});

module.exports = noteSchema;