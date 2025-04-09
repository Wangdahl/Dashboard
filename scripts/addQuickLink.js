import { getFavIcon } from './fetchFavicon.js';

document.addEventListener('DOMContentLoaded', () => {
    const addLinkBtn = document.getElementById('addLink');
    const linkBox = document.getElementById('linkBox');
    const urlInput = document.getElementById('linkInput');
    const savedLinks = JSON.parse(localStorage.getItem('quickLinks')) || [];
    const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults')) || [];

    // Hide any default items marked as deleted
    linkBox.querySelectorAll('.item').forEach(item => {
        const link = item.querySelector('a.quick-link');
        if (link && deletedDefaults.includes(link.getAttribute('href'))) {
            item.remove();
        }
    });

    // Render all links (including ones from localStorage)
    savedLinks.forEach(link => renderLinkItem(link.url, link.name));

    addLinkBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        if (!url) return;
        //Get the default name for the link
        const displayName = extractNameFromUrl(url);
        // Save to localStorage
        savedLinks.push({ url, name: displayName });
        localStorage.setItem('quickLinks', JSON.stringify(savedLinks));
        //Create the link
        renderLinkItem(url, displayName);
        //Clear input field
        urlInput.value = '';
    });

    urlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const url = urlInput.value.trim();
            if (!url) return;
            //Get the default name for the link
            const displayName = extractNameFromUrl(url);
            // Save to localStorage
            savedLinks.push({ url, name: displayName });
            localStorage.setItem('quickLinks', JSON.stringify(savedLinks));
            //Create the link
            renderLinkItem(url, displayName);
            //Clear input field
            urlInput.value = '';
        }
    });
    //Function that handles the actual creation of the link.
    function renderLinkItem(url, displayName) {
        const item = document.createElement('div');
        item.classList.add('item');

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.classList.add('quick-link');

        const span = document.createElement('span');
        const text = document.createTextNode(displayName);

        anchor.appendChild(span);
        anchor.appendChild(text);
        item.appendChild(anchor);

        //Add edit button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        editBtn.classList.add('edit-link-btn');
        item.appendChild(editBtn);
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteBtn.classList.add('delete-link-btn');
        item.appendChild(deleteBtn);
        // Tag data-url for delete script
        item.setAttribute('data-url', url);

        linkBox.appendChild(item);
        getFavIcon(item);
    }

    function extractNameFromUrl(rawUrl) {
        try {
            const urlObj = new URL(rawUrl);
            let hostname = urlObj.hostname.replace(/^www\./, '');
            const namePart = hostname.split('.')[0];
            return namePart.charAt(0).toUpperCase() + namePart.slice(1);
        } catch {
            let cleanUrl = rawUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
            const namePart = cleanUrl.split('.')[0];
            return namePart.charAt(0).toUpperCase() + namePart.slice(1);
        }
    }
});
