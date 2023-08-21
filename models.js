const mongoose = require('mongoose');
const noteSchema = require('./schemas/Note');

const Note = mongoose.model('Note', noteSchema);

module.exports = { Note }