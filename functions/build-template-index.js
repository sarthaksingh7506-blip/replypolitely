/**
 * Cloudflare Pages Function
 * Auto-index HTML templates inside /reply folder.
 * Output JSON for frontend consumption.
 */

import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function onRequest(context) {
  try {
    const root = context.env.PAGES_APP_DIR || process.cwd();
    const replyPath = join(root, 'reply');

    let files = await readdir(replyPath, { withFileTypes: true });

    // Filter only .html files
    files = files
      .filter(file => file.isFile() && file.name.endsWith('.html'))
      .map(file => file.name)
      .filter(name => name !== 'index.html'); // ignore hub index

    // Example filtering: remove non-template files
    const templates = files.map(name => ({
      filename: name,
      title: formatTitle(name),
      slug: `/reply/${name}`
    }));

    return new Response(JSON.stringify({
      status: "success",
      count: templates.length,
      templates
    }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      status: "error",
      message: err.toString()
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

/**
 * Converts `as-discussed.html` → `As Discussed`
 */
function formatTitle(filename) {
  const name = filename.replace('.html', '');
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
