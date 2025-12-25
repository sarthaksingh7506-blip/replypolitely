import fs from "fs";
import path from "path";

const REPLY_DIR = path.join(process.cwd(), "reply");
const OUTPUT_DIR = path.join(process.cwd(), "dist", "reply");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = fs
  .readdirSync(REPLY_DIR)
  .filter(f => f.endsWith(".html") && f !== "index.html");

function titleFromFile(file) {
  return file
    .replace(".html", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

const cards = files.map(file => {
  const title = titleFromFile(file);
  return `
    <a href="/reply/${file}">
      <div style="padding:16px;border:1px solid #ddd;margin-bottom:10px;">
        <strong>${title}</strong><br>
        Professional email template
      </div>
    </a>
  `;
}).join("");

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>ReplyPolitely Templates</title>
<meta name="description" content="Professional workplace email templates">
<link rel="canonical" href="https://replypolitely.site/reply/">
</head>
<body>
<h1>Template Library</h1>
${cards}
</body>
</html>
`;

fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), html);

console.log("Reply index generated");
