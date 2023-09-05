import { publishedNotesContainer } from "./common.js";
import { truncateTitle } from "./utilities.js";
import { textArea } from "./common.js"

let currentPage = 1; // Current pagination page
let totalPages = 0; // Default number of pages
let limit = 5; // How many notes per pagination page
let notes = []; // Notes are stored here
let titleMaxLength = 24; // Max note title length 

// Get data from server
async function fetchNotes(page, limit) {
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

// Display notes in published notes container
async function displayNotes(currentPage = 1, limit = 10) {
    // Fetch notes from the server
    await fetchNotes(currentPage, limit);

    // Clear existing notes
    publishedNotesContainer.innerHTML = '';

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
        noteDate.innerText = new Date(note.createdAt).toLocaleString();
        bottomDiv.appendChild(noteDate);

        noteElement.appendChild(topDiv);
        noteElement.appendChild(bottomDiv);

        // Listen for note clicks to load the note text to textarea
        noteElement.addEventListener('click', (event) => {
            const clickedNoteId = noteElement.getAttribute('data-note-id');
            if(note._id == clickedNoteId) {
                textArea.value = note.text;
            }
        });

        publishedNotesContainer.appendChild(noteElement);
    });

    // Display pagination
    displayPagination();
}

// Display and handle pagination
function displayPagination() {
    const paginationContainer = document.getElementById('pagination');

    // Clear existing pagination
    paginationContainer.innerHTML = '';

    let startPage, endPage;
    
    // Initial state: Display first 10 pages
    if (currentPage <= 6) {
        startPage = 1;
        endPage = Math.min(10, totalPages);
    } 
    // Middle state: Current page is somewhere in the middle
    else if (currentPage >= 7 && currentPage <= totalPages - 4) {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
    } 
    // End state: Last 10 pages
    else {
        startPage = Math.max(1, totalPages - 9);
        endPage = totalPages;
    }

    // Add previous button
    const prev = document.createElement('a');
    prev.href = '#';
    prev.innerHTML = '&lt;-';
    prev.addEventListener('click', (event) => { 
        event.preventDefault();
        if(currentPage > 1) {
            displayNotes(currentPage - 1, limit)
        }
    });
    if (currentPage === 1) {
        prev.classList.add('disabled');
    }
    paginationContainer.appendChild(prev);

    // Add pages numbers
    for(let i = startPage; i <= endPage; i++) {
        const page = document.createElement('a');
        page.href='#';
        page.innerText = i;

        if(i === currentPage) {
            page.classList = 'page-active';
        }

        page.addEventListener('click', (event) => { 
            event.preventDefault();
            displayNotes(i, limit)
        });
        paginationContainer.appendChild(page);
    }

    // Add next button
    const nex = document.createElement('a');
    nex.href = '#';
    nex.innerHTML = '-&gt;';
    nex.addEventListener('click', (event) => {
        event.preventDefault();
        if(currentPage < totalPages) {
            displayNotes(currentPage + 1, limit) }
        }
    );
    if (currentPage === totalPages) {
        nex.classList.add('disabled');
    }
    paginationContainer.appendChild(nex);
}

// Initially display the first page of notes
displayNotes(currentPage, limit);



