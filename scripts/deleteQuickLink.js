document.addEventListener('DOMContentLoaded', () => {
    const linkBox = document.getElementById('linkBox');

    linkBox.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-link-btn');
        if (!btn) return;

        const item = btn.closest('.item');
        if (!item) return;

        // Try getting URL from data-url or <a>
        let url = item.getAttribute('data-url');
        if (!url) {
            const link = item.querySelector('a.quick-link');
            if (link) {
                url = link.getAttribute('href');
            }
        }

        if (!url) return;

        // Remove from DOM
        item.remove();

        // Update quickLinks
        const savedLinks = JSON.parse(localStorage.getItem('quickLinks')) || [];
        const updatedLinks = savedLinks.filter(link => link.url !== url);
        localStorage.setItem('quickLinks', JSON.stringify(updatedLinks));

        // Track deleted default links
        const deletedDefaults = JSON.parse(localStorage.getItem('deletedDefaults')) || [];
        if (!savedLinks.find(link => link.url === url) && !deletedDefaults.includes(url)) {
            deletedDefaults.push(url);
            localStorage.setItem('deletedDefaults', JSON.stringify(deletedDefaults));
        }
    });
});
