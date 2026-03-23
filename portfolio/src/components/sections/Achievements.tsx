'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    icon: '★',
    title: 'IEEE CSITSS-23 Best Paper Award',
    subtitle: 'Intelligent Systems Track · RVCE, Bangalore',
    date: 'Nov 2023',
    size: 'large',
    color: '#fbbf24',
  },
  {
    icon: '⚡',
    title: 'Technology Analyst Program (TAP) Graduate',
    subtitle: 'EE Track · Morgan Stanley, Bangalore',
    date: 'Dec 2022',
    size: 'normal',
    color: 'var(--glow)',
  },
  {
    icon: '🏆',
    title: 'Winner — Smart India Hackathon 2019',
    subtitle: 'Software Edition · NIT Patna, India',
    date: 'Dec 2019',
    size: 'normal',
    color: '#34d399',
  },
  {
    icon: '🎓',
    title: 'Best Capstone Award',
    subtitle: 'Dept. of CSE · Ramaiah Institute of Technology',
    date: 'May 2022',
    size: 'normal',
    color: 'var(--accent)',
  },
  {
    icon: '🧑‍💻',
    title: 'Core Member — Google Developer Student Club',
    subtitle: 'Ramaiah Institute of Technology',
    date: '2019 — 2021',
    size: 'normal',
    color: '#60a5fa',
  },
  {
    icon: '📡',
    title: 'ExeCom Web Team — IEEE Student Branch',
    subtitle: 'MS Ramaiah Institute of Technology',
    date: '2019 — 2021',
    size: 'normal',
    color: 'var(--muted)',
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.achievement-card', {
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.achievements-bento',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem' }}>// achievements &amp; leadership</p>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Recognition &amp; Leadership
          </h2>
        </div>

        {/* Bento grid */}
        <div
          className="achievements-bento"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gridAutoRows: 'auto',
            gap: '1rem',
          }}
        >
          {/* All cards — uniform size */}
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.title}
              className="achievement-card glass"
              style={{
                padding: '1.75rem',
                transition: 'transform 0.25s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{a.icon}</div>
              <h3
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: a.color,
                  marginBottom: '0.4rem',
                  lineHeight: 1.4,
                }}
              >
                {a.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                {a.subtitle}
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--dim)',
                }}
              >
                {a.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
