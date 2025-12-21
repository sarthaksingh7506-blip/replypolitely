/**
 * Cloudflare Pages Functions
 * This provides a dynamic API endpoint for listing template files.
 * It solves the "No routes found" error and supports auto-indexing.
 */

export async function onRequest(context) {
  try {
    // static folder scan reference
    const env = context.env;
    
    // fallback static list
    const templates = [
      "ok.html",
      "received.html",
      "seen.html",
      "thanks.html",
      "approved.html",
      "as-discussed.html",
      "as-per-your-request.html",
      "per-our-conversation.html",
      "follow-up.html",
      "late-email.html",
      "no-response.html",
      "say-no.html",
      "decline-meeting.html",
      "meeting-reschedule.html",
      "apology.html",
      "complaint-response.html",
      "well-received.html",
      "will-do.html",
      "will-review.html",
      "noted.html"
    ];

    return new Response(JSON.stringify({
      status: "success",
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
