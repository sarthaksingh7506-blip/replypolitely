// /js/search.js

async function performSearch(query) {
    const response = await fetch('/template-index.json');
    const templates = await response.json();

    query = query.trim().toLowerCase();

    // simple fuzzy/partial search
    const matches = templates.filter(t =>
        t.title.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
        alert("No matching templates found. Redirecting to library.");
        window.location.href = "/reply/index.html";
        return;
    }

    if (matches.length === 1) {
        window.location.href = matches[0].file;
        return;
    }

    // more than one match → show list
    const resultContainer = document.getElementById('search-results');
    resultContainer.innerHTML = `
        <h2>Matching Templates</h2>
        <ul>
            ${matches.map(m => `<li><a href="${m.file}">${m.title}</a></li>`).join('')}
        </ul>
    `;
}
