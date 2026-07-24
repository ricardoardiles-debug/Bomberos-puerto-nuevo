const MAX_PROMPT_LENGTH = 6000;
const MAX_SYSTEM_LENGTH = 2000;

export default async (request) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Método no permitido.' }, { status: 405 });
  }

  const apiKey = Netlify.env.get('GEMINI_API_KEY');
  const model = Netlify.env.get('GEMINI_MODEL') || 'gemini-2.5-flash';

  if (!apiKey) {
    return Response.json(
      { error: 'El asistente todavía no está configurado.' },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const systemInstruction =
      typeof body.systemInstruction === 'string' ? body.systemInstruction.trim() : '';
    const searchGrounded = body.searchGrounded === true;

    if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
      return Response.json({ error: 'Consulta inválida o demasiado extensa.' }, { status: 400 });
    }

    if (systemInstruction.length > MAX_SYSTEM_LENGTH) {
      return Response.json({ error: 'Instrucción inválida.' }, { status: 400 });
    }

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1000,
      },
    };

    if (systemInstruction) {
      payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    if (searchGrounded) {
      payload.tools = [{ google_search: {} }];
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      return Response.json({ error: 'No fue posible generar la respuesta.' }, { status: 502 });
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];
    const text = candidate?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join('\n');

    if (!text) {
      return Response.json({ error: 'La respuesta llegó vacía.' }, { status: 502 });
    }

    const sources = (candidate.groundingMetadata?.groundingChunks || [])
      .map((chunk) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source) => source.uri && source.title)
      .slice(0, 8);

    return Response.json({ text, sources });
  } catch {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }
};
