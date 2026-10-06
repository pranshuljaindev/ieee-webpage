# IEEE InnovateX 2026

Where Ideas Meet Engineering — Official Immersive 3D Event Experience for the IEEE Student Society Technical Symposium.

---

## Overview

**IEEE InnovateX 2026** is a modern, responsive single-page event website featuring an immersive 3D WebGL hero, procedural audio synthesis, and interactive micro-interactions. Hosted by the IEEE Student Society in technical association with the **IEEE Industry Applications Society (IAS)** and the **IEEE Robotics and Automation Society (RAS)**.

The experience blends Apple-style product presentation with modern WebGL depth, futuristic engineering aesthetics, and restrained IEEE professional identity.

---

## Key Features & Experience

* **Cinematic 3D Opening Sequence**: A 2.5-second technical boot sequence revealing IEEE, IAS, and RAS identities alongside procedural Web Audio sound design, with an instant "Skip Intro" option.
* **3D Innovation Core (WebGL / Three.js)**:
  - Custom rotating geodesic icosahedron core with pulsating energy sphere.
  - Concentric gimbal technical rings with differential counter-rotations.
  - Orbiting sensor satellites and a 380+ quantum particle constellation.
  - Interactive mouse tracking (desktop cursor influence with smooth lerp damping).
  - Graceful CSS/SVG animated fallback for devices without WebGL.
* **Procedural Audio Engine (Web Audio API)**:
  - 100% royalty-free, client-side synthesized futuristic audio sweep (sub-bass surge + harmonic crystalline chord).
  - Floating and navbar audio visualizer with animated equalizer bars.
  - Persistent session mute memory (`sessionStorage`) and non-intrusive sound policy.
* **Interactive Interconnected Society Topology**:
  - IEEE, IAS, and RAS presented as three interconnected technical nodes with animated energy bus lines connecting to the central InnovateX symposium hub.
* **3D Tilt Keynote Speaker Cards**:
  - CSS 3D perspective transforms responding dynamically to cursor position with real-time specular glare simulation.
  - Interactive plenary lecture abstract inspection modal.
* **Illuminated Schedule Timeline**:
  - 4-item chronological symposium agenda (Registration, Opening Ceremony, Keynote Session, Innovation Showcase) with interactive node illumination and session spotlight.
* **3D Magnetic Register CTA**:
  - Magnetic hover resistance, ripple effect, direct portal link, and integrated email pre-registration dispatch.
* **Responsive Performance**:
  - Viewport-aware rendering: High-fidelity desktop 3D, streamlined particle count on tablets, and hardware-efficient rendering on mobile devices.
  - Respects `prefers-reduced-motion`.

---

## Tech Stack

* **React 19** & **TypeScript** — Core framework & type safety
* **Three.js** (`three`) — WebGL 3D scene, materials, lighting, and particle geometry
* **Web Audio API** — Real-time procedural audio synthesis
* **Vite 8** — Build system and development server
* **Tailwind CSS v4** — Utility-first styling with modern CSS variables
* **Lucide React** — Minimalist, accessible SVG icon system

---

## Project Structure

```
├── public/
│   └── assets/
│       ├── ieee-logo.jpg           # Official IEEE logo
│       ├── ias-logo.png            # Official IEEE IAS logo
│       ├── ras-logo.jpg            # Official IEEE RAS logo
│       ├── footer-banner.jpg       # Provided footer banner asset (1080×167)
│       └── images/                 # Speaker portraits & symposium visual assets
├── src/
│   ├── assets/                     # Local asset mirrors
│   ├── components/
│   │   ├── 3d/
│   │   │   └── InnovationCore.tsx  # Three.js 3D Innovation Core component
│   │   ├── About.tsx               # About section & 6 technical pillars
│   │   ├── AudioController.tsx     # Animated audio equalizer & mute toggle
│   │   ├── EventInfo.tsx           # Compact event credentials & .ics generator
│   │   ├── Footer.tsx              # Visually integrated footer banner & links
│   │   ├── Hero.tsx                # Full-screen 3D hero with mouse parallax
│   │   ├── LoadingScreen.tsx       # 2.5s cinematic intro sequence
│   │   ├── Navbar.tsx              # Sticky navbar with audio controller
│   │   ├── RegisterCTA.tsx         # 3D magnetic call-to-action
│   │   ├── RegistrationModal.tsx   # Interactive registration dialog
│   │   ├── SafeImage.tsx           # Resilient image loader with fallback
│   │   ├── Schedule.tsx            # 4-item schedule timeline & session detail
│   │   ├── Societies.tsx           # Interconnected IEEE / IAS / RAS topology
│   │   └── Speakers.tsx            # 3D tilt speaker cards & abstract modal
│   ├── data/
│   │   └── eventData.ts            # Centralized event configuration & data
│   ├── utils/
│   │   └── audioEngine.ts          # Procedural Web Audio API sound generator
│   ├── App.tsx                     # Main single-page application entry
│   ├── index.css                   # Global styles, fonts, and blueprint grid
│   └── main.tsx                    # React DOM entry point
├── index.html                      # SEO metadata, Open Graph, & font imports
├── metadata.json                   # Project metadata
├── package.json                    # Project dependencies & scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite build setup
```

---

## How to Customize Event Data

All content is decoupled from components in **`src/data/eventData.ts`**:

1. **Registration Link**:
   ```typescript
   event: {
     registrationUrl: "https://forms.gle/YOUR_FORM_LINK",
   }
   ```

2. **Date & Venue**:
   ```typescript
   event: {
     date: "Coming Soon", // Replace when finalized
     venue: "To Be Announced", // Replace when finalized
   }
   ```

3. **Speakers**:
   Modify `speakers` array in `src/data/eventData.ts` with updated names, titles, topics, and abstracts.

4. **Schedule**:
   Modify `schedule` array in `src/data/eventData.ts` with updated timings and room assignments.

---

## Run Locally

```bash
# 1. Clone repository
git clone https://github.com/your-username/ieee-innovatex-2026.git
cd ieee-innovatex-2026

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000`.

---

## Deployment

### Vercel Deployment

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and select **"Add New..." > "Project"**.
3. Import `ieee-innovatex-2026`.
4. Vercel automatically detects the Vite configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**.

### GitHub Pages Deployment

1. Add your repository base path to `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/ieee-innovatex-2026/',
   });
   ```
2. Build the project (`npm run build`) and deploy the `dist/` directory via GitHub Actions or the `gh-pages` branch.

---

## Credits

Created for the IEEE InnovateX 2026 event website recruitment task.
All visual marks and trademarks for IEEE, IEEE IAS (Industry Applications Society), and IEEE RAS (Robotics & Automation Society) belong to the Institute of Electrical and Electronics Engineers.
