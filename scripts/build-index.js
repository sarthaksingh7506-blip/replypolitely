import fs from "fs";
import path from "path";

const REPLY_DIR = path.join(process.cwd(), "reply");
const OUTPUT_FILE = path.join(REPLY_DIR, "templates.json");

const files = fs
  .readdirSync(REPLY_DIR)
  .filter(f => f.endsWith(".html") && f !== "index.html");

function titleFromFile(file) {
  return file
    .replace(".html", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

const templates = files.map(file => ({
  title: titleFromFile(file),
  slug: file,
  description: "Professional email template"
}));

fs.writeFileSync(
  OUTPUT_FILE,
  JSON.stringify(templates, null, 2)
);

console.log("templates.json generated");
