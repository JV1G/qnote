import { publishedNotesContainer } from "./common.js";
import { truncateTitle } from "./utilities.js";

let currentPage = 1; // Current pagination page
let totalPages = 0; // Default number of pages
let limit = 5; // How many notes per pagination page
let notes = []; // Notes are stored here
let titleMaxLength = 24; // Max note title length 

async function fetchNotes(page = 1, limit = 10) {
    const response = await fetch(`/getPaginationNotes?page=${page}&limit=${limit}`);

    let data = await response.json();
    notes = data.notes;
    totalPages = data.totalPages;
    currentPage = data.currentPage;

    // For debugging
    console.log(notes);
    console.log('current page: ' + currentPage);
    console.log('total pages: ' + totalPages);
}

async function displayNotes() {
    // Fetch notes from the server
    await fetchNotes(currentPage, limit);

    // Populate the published notes container with notes
    notes.forEach((note) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'published-note';
        noteElement.setAttribute('data-note-id', note._id);

        const topDiv = document.createElement('div');
        topDiv.className = 'top';
        const noteName = document.createElement('p');
        noteName.className = 'note-name';
        noteName.innerText = truncateTitle(note.title, titleMaxLength);
        topDiv.appendChild(noteName);

        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'bottom';
        const noteDate = document.createElement('p');
        noteDate.className = 'note-date';
        noteDate.innerText = new Date(note.createdAt).toLocaleDateString();
        bottomDiv.appendChild(noteDate);

        noteElement.appendChild(topDiv);
        noteElement.appendChild(bottomDiv);

        publishedNotesContainer.appendChild(noteElement);
    });
}

displayNotes();



