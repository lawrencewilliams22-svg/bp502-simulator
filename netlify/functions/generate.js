// Serverless proxy: keeps your Anthropic API key OFF the public page.
// Set ANTHROPIC_API_KEY in Netlify: Site settings -> Environment variables.
export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string" || prompt.length > 8000) {
      return new Response("Bad request", { status: 400 });
    }
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await r.json();
    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    return Response.json({ text });
  } catch (e) {
    console.error(e);
    return new Response("Generation failed", { status: 500 });
  }
};
