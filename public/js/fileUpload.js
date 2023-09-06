import { textArea } from './common.js';
import { resizeTextarea } from './utilities.js'
import { updateCounts } from './utilities.js';

const uploadFileBtn = document.getElementById('upload-note-button');
const fileInput = document.getElementById('file-input');

// Trigger the file input when the upload button is clicked
uploadFileBtn.addEventListener('click', () => {
    fileInput.click();
});


// Event listener for file input
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];  // Get the selected file

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            textArea.value = event.target.result; 
            resizeTextarea(textArea);
            updateCounts(textArea);
        });

        reader.readAsText(file);
    }
});