export const onRequest = async ({ request, env }) => {
  const url = new URL(request.url);

  if (url.pathname === "/reply/templates.json") {
    return indexReplyTemplates();
  }

  return env.ASSETS.fetch(request);
};

async function indexReplyTemplates() {
  const manifest = __STATIC_CONTENT_MANIFEST;
  const files = JSON.parse(manifest);

  const templateList = Object.keys(files)
    .filter(path => path.startsWith("reply/") && path.endsWith(".html"))
    .map(path => path.replace("reply/", ""));

  return new Response(
    JSON.stringify(templateList, null, 2),
    { headers: { "Content-Type": "application/json" } }
  );
}
