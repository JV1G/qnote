import { textArea } from './common.js';
import { popUp } from './common.js';

let popUpTimer; // variable to hold timer ID

// Get the reference to the new note (clear note content) button
const newNoteBtn = document.getElementById('new-note-button');

// Add event listener button to clear text when clicked
newNoteBtn.addEventListener('click', () => {
    clearText();
});

// Clear the content of the note
function clearText() {
    textArea.value = '';
    closePopUp(popUp);
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

// Return a truncated version of the title
export function truncateTitle(title, maxLength) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength).trim() + "...";
    }
    return title;
}

// Show pop up with the text
export function showPopUp(text, status) {
    // Clear any existing timer
    clearTimeout(popUpTimer);

    //Close previous pop up
    closePopUp(popUp);

    popUp.style.display = "flex"; // Display pop up
    // Select pop up's child responsible for holding the content
    const popUpContent = popUp.querySelector(".popUpContent"); 

    // Measure the height of the popup
    const popUpHeight = popUp.offsetHeight;

    // Add padding to the body equivalent to the height of the popup to prevent overlap
    document.body.style.paddingTop = `${popUpHeight}px`;

    // Give styling to pop up content based on status
    if(status === 'success') {
        popUpContent.classList.add('status-success');
    } else if (status === 'error') {
        popUpContent.classList.add('status-error');
    }

    // Set the content of the pop up
    popUpContent.textContent = String(text);

    // Set a timer to hide the pop up after the time passes
    popUpTimer = setTimeout(function() {
        closePopUp(popUp); // Close the pop up
    }, 5000);
}

export function closePopUp(popUp) {
    clearTimeout(popUpTimer); // Clear any existing timer
    popUp.style.display = "none";
    const popUpContent = popUp.querySelector(".popUpContent");
    popUpContent.classList.remove('status-success', 'status-error');
    removeSpaceForPopUp();
}

function addSpaceForPopUp() {
    // Measure the height of the popup
    const popUpHeight = popUp.offsetHeight;

    // Add padding to the body equivalent to the height of the popup to prevent overlap
    document.body.style.paddingTop = `${popUpHeight}px`;
}

function removeSpaceForPopUp() {
    document.body.style.paddingTop = "0px";
}