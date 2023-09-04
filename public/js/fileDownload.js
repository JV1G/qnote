import { textArea } from './common.js';

// Get the reference to the save (download text file) button
const saveNoteBtn = document.getElementById('save-note-button');

// Add event listener to button to download when clicked
saveNoteBtn.addEventListener('click', () => {
    downloadText();
});

// Download text file (the content of the note)
function downloadText() {
    let noteTitle = ''; // Name of the note/file
    const blob = new Blob([textArea.value], { type: 'text/plain' });
    const anchor = document.createElement('a');
    
    if(textArea.value.trim().length > 0) {
        // Set noteTitle to be = textarea's first line
        noteTitle = textArea.value.split('\n')[0];

        // Check the length to avoid overly long filenames
        if(noteTitle.length > 100) {
            noteTitle = noteTitle.substring(0, 100) + "...";
        }
    }

    if (noteTitle !== '') { 
        anchor.download = noteTitle + ' (qNote)';  // Set the title
    } else {
        // If the title couldn't be made, set the title to qNote
        anchor.download = 'qNote';
    }

    anchor.href = URL.createObjectURL(blob);
    anchor.click();
    URL.revokeObjectURL(anchor.href);

    // Set noteTitle to default after download
    noteTitle = 'qNote';
}