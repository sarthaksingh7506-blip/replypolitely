import manifestJSON from "__STATIC_CONTENT_MANIFEST";

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.startsWith("/reply/templateList")) {
    return indexReplyTemplates();
  }

  return ASSETS.fetch(request);
}

async function indexReplyTemplates() {
  const files = JSON.parse(manifestJSON);

  const list = Object.keys(files)
    .filter(p => p.startsWith("reply/") && p.endsWith(".html"))
    .map(p => p.replace("reply/", "").replace(".html", ""));

  return new Response(
    JSON.stringify(list, null, 2),
    { headers: { "Content-Type": "application/json" } }
  );
}
