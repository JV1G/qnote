import { textArea } from './common.js';
import { makeTitle } from './utilities.js';

// Get the reference to the save (download text file) button
const saveNoteBtn = document.getElementById('save-note-button');

// Add event listener to button to download when clicked
saveNoteBtn.addEventListener('click', () => {
    downloadText();
});

// Download text file (the content of the note)
function downloadText() {
    const blob = new Blob([textArea.value], { type: 'text/plain' });
    const anchor = document.createElement('a');

    let noteTitle = makeTitle(textArea); // Name of the note/file
    noteTitle = noteTitle.replace(/\./g, ' dot ');


    if (noteTitle !== '') { 
        anchor.download = noteTitle + ' (qNote)';  // Set the downloaded file title 
    } else {
        // If the title couldn't be made, set the title to qNote
        anchor.download = 'qNote';
    }

    anchor.href = URL.createObjectURL(blob);
    anchor.click();
    URL.revokeObjectURL(anchor.href);
}