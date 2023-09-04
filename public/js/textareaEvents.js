import { textArea } from './common.js';

textArea.addEventListener('focus', function() {
    console.log('User is focusing on the textarea of the note.');
});

// Listen for the 'Tab' key and add the space in the textArea that a tab adds
textArea.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default 'tab' behavior.

        // Get the current cursor position:
        const start = textArea.selectionStart;
        const end = textArea.selectionEnd;
        const selectedText = textArea.value.substring(start, end);

        if(start === end) {
            // Insert the tab character at the current cursor position when text isn't highlighted
            textArea.value = textArea.value.substring(0, start) + '\t' + textArea.value.substring(end);
        } else {
            // Insert the tab character at the current cursor position when text is highlighted
            textArea.value = textArea.value.substring(0, start) + '\t' + selectedText + textArea.value.substring(end);
        }
        
        // Move the cursor after the inserted tab character:
        textArea.selectionStart = textArea.selectionEnd = start + 1;
    }
});
