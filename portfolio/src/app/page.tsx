'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import Research from '@/components/sections/Research';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import Nav from '@/components/ui/Nav';

const ParticleCanvas = dynamic(
  () => import('@/components/three/HeroScene').then(m => m.ParticleCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Nav />
      <main id="hero">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Research />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
