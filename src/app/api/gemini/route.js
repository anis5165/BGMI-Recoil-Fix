// pages/api/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const body = await req.json();
  const { device, fps } = body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a professional mobile gaming coach and BGMI (Battlegrounds Mobile India) optimization expert. Your task is to generate the best possible sensitivity settings for BGMI based on a user's mobile device and its FPS capability.

Take into account the device's screen size, touch sensitivity, frame rate support (e.g. 60fps or 90fps), and known hardware limits if applicable.

Provide a complete and optimized sensitivity setup, including:
- Camera Sensitivity (free look)
- Camera Sensitivity (3rd Person, 1st Person, etc.)
- ADS Sensitivity (3rd Person, 1st Person, scopes)
- Gyroscope Sensitivity

Format your response cleanly using section headers and make it easy to read. Avoid generic settings — tailor them based on the device and FPS support.

Device: ${device}
FPS Support: ${fps}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(JSON.stringify({ error: "Failed to get response from Gemini API" }), { status: 500 });
  }
}
