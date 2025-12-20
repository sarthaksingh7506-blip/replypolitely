// /functions/build-template-index.js

const fs = require('fs');
const path = require('path');

const replyDir = path.join(__dirname, '..', 'reply');
const outputFile = path.join(__dirname, '..', 'template-index.json');

function generateIndex() {
    const templates = [];

    const files = fs.readdirSync(replyDir);

    files.forEach(file => {
        if (file.endsWith('.html') && file !== 'index.html') {
            const name = file
                .replace('.html', '')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase());

            templates.push({
                title: name,
                file: `/reply/${file}`
            });
        }
    });

    fs.writeFileSync(outputFile, JSON.stringify(templates, null, 2));
    console.log('template-index.json generated successfully!');
}

generateIndex();
