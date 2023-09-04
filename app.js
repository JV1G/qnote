const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');
const path = require('path');

// Create an instance of the Express application
const app = express(); 

// Connect to the database
const mongoURI = `${config.dbURL}/${config.dbName}`;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { 
    console.log('MongoDB connected');
    //deleteDocuments(models.Note); // Delete all documents
}).catch((error) => console.error('Error connecting to database:', error));


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Helper function to delete everything from the collection
function deleteDocuments(model) {
    model.deleteMany({})
        .then((result) => console.log(`${result.deletedCount} documents deleted`))
        .catch((error) => console.error('Error deleting documents:', error));
}

app.post('/publishNote', async (req, res) => {
    console.log(req.body.noteText); // for debugging

    // Store the req's noteText
    const noteText = req.body.noteText;
    // Create new note document
    const newNote = new models.Note({
        text: noteText
    });
    // Save the note inside the notes collection
    await newNote.save();

    // Send response
    res.json({ status: 'success' });
});

app.get('/', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'index.html'));
    } catch (error) {
        console.log(error);
        res.status(500).send(`An error occured: ${error.message}`);
    }
});



// Start the server
app.listen(config.serverPort, () => {
    console.log(`Server is running on port ${config.serverPort}`);
});

