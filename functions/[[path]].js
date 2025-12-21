export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // match /reply/templateList AND /reply/templateList/ AND with params
  if (pathname.startsWith("/reply/templateList")) {
    return indexReplyTemplates(env);
  }

  return env.ASSETS.fetch(request);
}
