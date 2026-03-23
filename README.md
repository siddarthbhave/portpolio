# Siddarth Bhave — Portfolio

Personal portfolio website built with **Next.js 16**, **React Three Fiber**, **GSAP**, and **Lenis**. Fully responsive across desktop and mobile.

**Live site:** [siddarthbhave.vercel.app](https://siddarthbhave.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + custom CSS |
| 3D / WebGL | React Three Fiber, Three.js, `@react-three/drei` |
| Post-processing | `@react-three/postprocessing` (Bloom, Vignette) |
| Animations | GSAP 3 + ScrollTrigger, SplitType |
| Smooth scroll | Lenis (`lenis/react`) |
| Deployment | Vercel |

---

## Project Structure

```
portfolio/              ← Next.js 16 app (primary)
  src/
    app/
      globals.css       ← Design tokens, base styles, mobile responsive CSS
      layout.tsx        ← Root layout (fonts, Lenis, Cursor, Nav)
      page.tsx          ← Page composition (all sections in order)
    components/
      providers/
        SmoothScroll.tsx
      sections/
        Hero.tsx        ← Name animation, typewriter, 3D blob, CTAs
        About.tsx       ← Bio + key stats grid
        Experience.tsx  ← Work history timeline
        Projects.tsx    ← Project showcase cards
        Skills.tsx      ← Skills by category
        Education.tsx   ← Degrees
        Research.tsx    ← IEEE paper
        Achievements.tsx← Awards & leadership bento grid
        Contact.tsx     ← Contact form + photo
      three/
        HeroScene.tsx   ← MorphingSphere (MeshDistortMaterial) + particles
      ui/
        Cursor.tsx      ← Custom cursor (dot + ring, mix-blend-mode)
        Nav.tsx         ← Desktop dots nav + mobile hamburger overlay
        ResumeModal.tsx ← Inline PDF resume viewer
  public/
    resume.pdf          ← Resume (served by ResumeModal)
    *.jpeg / *.svg      ← Company logos, profile photo
```

---

## Local Development

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build locally
npm run lint    # ESLint
```

---

## Deployment

The app is auto-deployed to **Vercel** on every push to `main`. The `portfolio/vercel.json` configures the build:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

To deploy manually:

```bash
cd portfolio
npx vercel --prod
```

---

## Features

- **3D morphing blob** — `MeshDistortMaterial` sphere with Bloom post-processing, desktop only
- **Particle star field** — full-viewport canvas background on all screen sizes
- **GSAP scroll animations** — section reveals with ScrollTrigger
- **Character-by-character name animation** — SplitType + GSAP on load
- **Typewriter** — cycles through expertise domains
- **Custom cursor** — dot + ring with mix-blend-mode difference, disabled on touch
- **Mobile navigation** — hamburger button with slide-in overlay, body scroll lock, Escape key support
- **Resume modal** — inline PDF viewer without leaving the page
- **Fully responsive** — 1-column layout on mobile, blob hidden, all sections adapted

---

## Contact

- **LinkedIn:** [linkedin.com/in/siddarthbhave](https://www.linkedin.com/in/siddarthbhave/)
- **GitHub:** [github.com/siddarthbhave](https://github.com/siddarthbhave)
- **Email:** siddarthbhave@gmail.com
