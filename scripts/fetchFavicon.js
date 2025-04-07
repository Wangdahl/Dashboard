
export const getFavIcon = (root = document) => {
    root.querySelectorAll('.quick-link').forEach(link => {
        const url = link.getAttribute('href');
        if (url) {
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${url}`;
            const favicon = document.createElement('img');
            favicon.src = faviconUrl;
            favicon.alt = 'Favicon';
            favicon.classList.add('favicon');

            const span = link.querySelector('span');
            if (span) {
                span.appendChild(favicon);
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    getFavIcon();
});



