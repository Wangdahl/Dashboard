document.addEventListener('DOMContentLoaded', () => {
    const savedNames = JSON.parse(localStorage.getItem('customLinkNames')) || {};

    // Make all existing links editable
    const links = document.querySelectorAll('.quick-link');
    const editBtns = document.querySelectorAll('.edit-link-btn');

    links.forEach((linkEl, index) => {
        const editBtn = editBtns[index];
        makeLinkEditable(linkEl, editBtn, savedNames);
    });

    // Listen for newly added links
    const linkBox = document.getElementById('linkBox');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.classList?.contains('item')) {
                    const newLink = node.querySelector('.quick-link');
                    const newEditBtn = node.querySelector('.edit-link-btn');
                    if (newLink && newEditBtn) {
                        makeLinkEditable(newLink, newEditBtn, savedNames);
                    }
                }
            });
        });
    });

    observer.observe(linkBox, { childList: true });
});

// Editable name logic
function makeLinkEditable(linkEl, editBtn, savedNames) {
    const originalNameNode = linkEl.childNodes[1];
    const currentName = originalNameNode?.textContent?.trim();

    // Load saved name if available
    if (savedNames[currentName]) {
        originalNameNode.textContent = savedNames[currentName];
    }

    editBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalNameNode.textContent.trim();
        input.classList.add('link-name-input');

        const preventNavigation = (e) => {
            if (e.target === input) e.preventDefault();
        };
        linkEl.addEventListener('click', preventNavigation);

        linkEl.replaceChild(input, originalNameNode);
        input.focus();

        const save = () => {
            const newName = input.value.trim() || 'New link';
            savedNames[currentName] = newName;
            localStorage.setItem('customLinkNames', JSON.stringify(savedNames));

            const newTextNode = document.createTextNode(newName);
            linkEl.replaceChild(newTextNode, input);
            linkEl.removeEventListener('click', preventNavigation);
        };

        input.addEventListener('blur', save);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
    });
}
