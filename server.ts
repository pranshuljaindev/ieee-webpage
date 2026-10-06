import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK on server side with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Multi-turn Gemini AI Chat API Route
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, role = 'concierge' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required' });
    }

    let systemInstruction = `You are INNOVA-AI, the official Technical Intelligence Oracle and Concierge for IEEE InnovateX 2026 ("Where Ideas Meet Engineering"), organized by the IEEE Student Society in technical collaboration with the IEEE Industry Applications Society (IAS) and IEEE Robotics and Automation Society (RAS).

Symposium Core Knowledge Base:
- Name: IEEE InnovateX 2026
- Tagline: Where Ideas Meet Engineering
- Registration Fee: 100% Free of Cost (₹0 / Free Admission) for all verified student delegates, faculty, and IEEE chapter members.
- Official Credentials & Accreditation: Includes verified digital accreditation token (#INX-2026-XXXX) and an official IEEE Student Branch Certificate of Participation upon event check-in.
- Associated Chapters:
  1. IEEE: Global Institute of Electrical and Electronics Engineers (Computing, Ethics, Global Standards).
  2. IEEE IAS: Industry Applications Society (Power Systems, Smart Grids, Industrial Automation).
  3. IEEE RAS: Robotics and Automation Society (Autonomous Vehicles, SLAM, Embodied AI, Kinematics).
- Keynote Speakers & Plenary Sessions:
  1. Keynote 01 (#SPK-01): Autonomous Robotic Systems & Embodied AI (Dr. [Speaker Name] - SLAM, Sensor Fusion, Edge Neural Accelerators).
  2. Keynote 02 (#SPK-02): Next-Gen Industrial Power & Smart Grids (Dr. [Speaker Name] - High-efficiency topologies, renewable grid integration).
- 4 Core Engineering Paradigms:
  1. Systematic Innovation: First-principles theory translated to deployable hardware.
  2. Applied Engineering & Power: High-density power electronics and motor drives (IAS).
  3. Robotics & Autonomous Flux: Multi-sensor fusion and real-time robotic controls (RAS).
  4. Student Research Vanguard: Peer-reviewed student papers and open-source demonstration tracks.
- 4-Phase Symposium Itinerary:
  1. 09:00 AM - Keynote 01: Autonomous Robotic Systems
  2. 11:30 AM - Technical Paper Track & Student Demonstrations
  3. 02:00 PM - Keynote 02: Next-Gen Industrial Power & Smart Grids
  4. 04:30 PM - Tri-Society Innovation Showcase & Awards
- Date & Venue: Official schedule ratification announcements coming soon; campus auditorium and research laboratory facilities.

Customer Support & Escalation Protocol:
- If a query is unclear, confused, outside the symposium scope, or if the user asks for human customer support / helpdesk / manual registration assistance / accommodations:
  1. Answer whatever part of the query is understandable politely and concisely.
  2. Explicitly provide the official Helpdesk contact info:
     "For direct personalized assistance, our **Delegate Support Team** is available at **support@ieee-innovatex2026.org** or you can click the **🎧 Support Desk** tab above to reach the secretariat directly."

Role persona: ${
      role === 'research'
        ? 'Act as a Senior IEEE Research Mentor and STEM Fellow. Discuss technical depth, algorithmic formulations, robotics kinematics, power electronics topologies, and advice for writing student research papers.'
        : role === 'standards'
        ? 'Act as an IEEE Standards & Society Historian. Explain IEEE, IAS, and RAS history, peer review rigor, and engineering ethics.'
        : 'Act as the enthusiastic, futuristic, highly articulate Symposium Concierge. Answer questions about sessions, speakers, schedule, registration passes, and technical tracks with clarity, brevity, and high-energy engineering polish.'
    }

Format answers cleanly with markdown, bold highlights, bullet points, and high technical polish.`;

    // Map conversation history into Gemini format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Apologies, no response received from the neural matrix.';
    return res.json({ reply });
  } catch (err: unknown) {
    console.error('Gemini API Error:', err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return res.status(500).json({ error: message });
  }
});

// Vite middleware in development vs Static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`IEEE InnovateX Server running on http://localhost:${PORT}`);
  });
}

startServer();
