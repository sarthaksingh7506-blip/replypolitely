import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.endsWith("/reply/templateList")) {
    return indexReplyTemplates(env);
  }

  try {
    return await getAssetFromKV(
      { request },
      { ASSET_NAMESPACE: env.ASSETS }
    );
  } catch (e) {
    return new Response("Not found", { status: 404 });
  }
}

async function indexReplyTemplates(env) {
  const manifest = env.__STATIC_CONTENT_MANIFEST;

  const files = JSON.parse(manifest);

  const list = Object.keys(files)
    .filter(p => p.startsWith("reply/") && p.endsWith(".html"))
    .map(p => p.replace("reply/", "").replace(".html", ""));

  return new Response(JSON.stringify(list, null, 2), {
    headers: { "Content-Type": "application/json" }
  });
}
