import { textArea } from './common.js';

// Get the reference to the new note (clear note content) button
const newNoteBtn = document.getElementById('new-note-button');

// Add event listener button to clear text when clicked
newNoteBtn.addEventListener('click', () => {
    clearText();
});

// Clear the content of the note
function clearText() {
    textArea.value = '';
}

// Make a title out of the textArea content
export function makeTitle(textArea) {
    let noteTitle = ''; // Name of the note/file

    if(textArea.value.trim().length > 0) {
        // Set noteTitle to be = textarea's first line
        noteTitle = textArea.value.split('\n')[0];

        // Check the length to avoid overly long filenames
        if(noteTitle.length > 100) {
            noteTitle = noteTitle.substring(0, 100) + "...";
        }
    }
    return noteTitle;
}


