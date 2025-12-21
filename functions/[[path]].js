export const onRequest = async ({ request, env, params }) => {
  const path = params.path || "";

  if (path === "reply/templateList") {
    return indexReplyTemplates(env);
  }

  return env.ASSETS.fetch(request);
};

async function indexReplyTemplates(env) {
  const manifest = __STATIC_CONTENT_MANIFEST;
  const files = JSON.parse(manifest);

  const templateList = Object.keys(files)
    .filter(p => p.startsWith("reply/") && p.endsWith(".html"))
    .map(p => p.replace("reply/", "").replace(".html", ""));

  return new Response(JSON.stringify(templateList), {
    headers: { "Content-Type": "application/json" }
  });
}
