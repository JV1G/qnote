const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');

// Create an instance of the Express application
const app = express(); 

// Connect to the database
const mongoURI = `${config.dbURL}/${config.dbName}`;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { 
    console.log('MongoDB connected');
    deleteDocuments(models.Note); // Delete all documents for now
}).catch((error) => console.error('Error connecting to database:', error));


// Helper function to delete everything from the collection
function deleteDocuments(model) {
    model.deleteMany({})
        .then((result) => console.log(`${result.deletedCount} documents deleted`))
        .catch((error) => console.error('Error deleting documents:', error));
}


app.get('/', async (req, res) => {
    try {
        // Create and save a note for testing purposes
        const newNote = new models.Note({
            text: 'This is some text'
        });

        await newNote.save(); 
        res.send("Note created and saved");
    } catch (error) {
        console.log(error);
        res.status(500).send(`An error occured: ${error.message}`);
    }
});



// Start the server
app.listen(config.serverPort, () => {
    console.log(`Server is running on port ${config.serverPort}`);
});

