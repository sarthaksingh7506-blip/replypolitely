export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/reply/templateList") {
    const res = await env.ASSETS.fetch("/templates.json");
    return new Response(res.body, {
      headers: { "Content-Type": "application/json" }
    });
  }

  return env.ASSETS.fetch(request);
}
