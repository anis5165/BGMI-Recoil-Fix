// pages/api/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  const body = await req.json();
  const { device, fps } = body;

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `
You are a professional BGMI (Battlegrounds Mobile India) coach and sensitivity optimization expert.

Your task is to generate a personalized and accurate sensitivity configuration for a player based on their mobile **device model** and **FPS capability**. Match the sensitivity settings with the device’s touch responsiveness, FPS tier, screen size, and use-case.

---

**IMPORTANT:**
- Format your entire response in markdown.
- Use bullet points ("- ") for all lists and settings, as shown in the structure below.
- Do not use HTML or numbered lists.
- Do not skip any section.
- Do not add extra commentary or explanation outside the structure.

---

First, analyze and provide these 📱 **Device Details**:
- Display: [provide display refresh rate, e.g., 60Hz, 90Hz, 120Hz]
- FPS Support in BGMI: [Explain based on "medium", "high", "ultra", "extreme", "90", or "120"]
- Ideal Graphics: [smooth ]

Device Name: ${device}
FPS Tier: ${fps} (Can be: "medium", "high", "ultra", "extreme", "90", or "120")

---

Then generate 🎮 **Sensitivity Settings** in this structure:

🎥 **Camera Sensitivity (Free Look)**  
- 3rd Person Camera (Free Look): [value]  
- 1st Person Camera (Free Look): [value]  
- Camera (Free Look): [value]  

📷 **Camera Sensitivity (Scope Movement)**  
- No Scope: [value]  
- Red Dot, Holo: [value]  
- 2x Scope: [value]  
- 3x Scope: [value]  
- 4x Scope: [value]  
- 6x Scope: [value]  
- 8x Scope: [value]  

🎯 **ADS Sensitivity (Touch Recoil)**  
- No Scope: [value]  
- Red Dot, Holo: [value]  
- 2x Scope: [value]  
- 3x Scope: [value]  
- 4x Scope: [value]  
- 6x Scope: [value]  
- 8x Scope: [value]  

🌀 **Gyroscope Sensitivity (Zero Recoil)**  
- No Scope: [value]  
- Red Dot, Holo: [value]  
- 2x Scope: [value]  
- 3x Scope: [value]  
- 4x Scope: [value]  
- 6x Scope: [value]  
- 8x Scope: [value]  

---

The values should be:
- Tuned based on device hardware and FPS capability
- Competitive and realistic
- Easy to read in bullet format
`



  try {
    const result = await model.generateContent(prompt, {
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });
    const response = await result.response;
    const text = await response.text();
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(JSON.stringify({ error: "Failed to get response from Gemini API" }), { status: 500 });
  }
}
