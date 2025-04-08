//Asigning the textarea to a variable
const notes = document.getElementById('notes');
//Getting saved notes if they exist
notes.value = localStorage.getItem('savedNotes') || '';
//Saving notes input upon every input
notes.addEventListener('input', () => {
    localStorage.setItem('savedNotes', notes.value);
})