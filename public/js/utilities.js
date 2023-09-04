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