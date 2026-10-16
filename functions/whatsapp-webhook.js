export async function onRequestGet(context) {
  const VERIFY_TOKEN = "my-secret-token";

  const url = new URL(context.request.url);

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, {
      status: 200,
    });
  }

  return new Response("Verification failed", {
    status: 403,
  });
}

export async function onRequestPost(context) {
  const body = await context.request.json();

  console.log("WhatsApp Event:", body);

  return new Response("EVENT_RECEIVED", {
    status: 200,
  });
}
