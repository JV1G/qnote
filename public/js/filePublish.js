import { textArea } from './common.js';

// Get the reference to the publish (note) button
const publishNoteBtn = document.getElementById('publish-note-button');

// Add event listener to button to publish when clicked
publishNoteBtn.addEventListener('click', () => {
    publishText();
});

async function publishText() {
    const noteText = textArea.value;

    try {
        const response = await fetch('/publishNote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ noteText })
        });

        const data = await response.json();

        if(data.status === 'success') {
            console.log('Note published succesfully');
        } else {
            console.log('Failed to publish note');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }

    console.log(textArea.value);
}