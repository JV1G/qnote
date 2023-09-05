import { textArea } from './common.js';
import { makeTitle } from './utilities.js';
import { showPopUp } from './utilities.js';

// Get the reference to the publish (note) button
const publishNoteBtn = document.getElementById('publish-note-button');

// Add event listener to button to publish when clicked
publishNoteBtn.addEventListener('click', () => {
    const lines = textArea.value.split('\n');
    const firstLine = lines[0].trim();
    
    // Check if textArea and first line are not empty
    if(textArea.value.trim() !== '' && firstLine !== '') { 
        publishText();
    } else {
        showPopUp('First line is the title of the note and must not be empty!', "error");
    }
});

async function publishText() {
    let noteTitle = makeTitle(textArea); // Name of the note/file
    const noteText = textArea.value;

    try {
        const response = await fetch('/publishNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ noteTitle, noteText })
        });

        const data = await response.json();

        if(data.status === 'success') {
            console.log('Note published succesfully');
            showPopUp("Note published successfully!", data.status);
        } else {
            console.log('Failed to publish note');
            showPopUp("Failed to publish note!", data.status);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    console.log(textArea.value);
}