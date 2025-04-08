document.addEventListener('DOMContentLoaded', () => {
    const heading = document.getElementById('editable-heading');
    const editBtn = document.getElementById('edit-heading-btn');

    const savedTitle = localStorage.getItem('customHeading');
    if(savedTitle) {
        heading.textContent = savedTitle;
    }

    editBtn.addEventListener('click', () => {
        heading.setAttribute('contenteditable', 'true');
        heading.focus();
    });

    //Save on enter
    heading.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            heading.blur();
        }
    });

    heading.addEventListener('blur', () => {
        heading.removeAttribute('contentedible');
        const newTitle = heading.textContent.trim() || 'My Dashboard';
        heading.textContent = newTitle;
        localStorage.setItem('customHeading', newTitle);
    })
});