'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────── */
const EDUCATION = [
  {
    logo: { src: '/w-logo-with-wordmark_0.jpg', alt: 'University of Washington', width: 160, height: 80 },
    school: 'University of Washington, Seattle',
    degree: 'Master of Science — Information Management',
    period: 'Sep 2024 — Present',
    location: 'Seattle, WA, USA',
    gpa: 'CGPA 3.9 / 4.0',
    color: '#b7a57a',
    accent: 'rgba(183,165,122,0.12)',
    border: 'rgba(183,165,122,0.3)',
    highlights: [
      'Concentration in Data Science & AI',
      'Research: Multi-Agent LLM Systems',
    ],
    coursework: [
      'Machine Learning',
      'Building LLMs',
      'Generative AI and Applications',
    ],
  },
  {
    logo: { src: '/images.png', alt: 'Ramaiah Institute of Technology', width: 120, height: 60 },
    school: 'M.S. Ramaiah Institute of Technology',
    degree: 'Bachelor of Engineering — Computer Science & Engineering',
    period: 'Aug 2018 — Jun 2022',
    location: 'Bangalore, India',
    gpa: 'CGPA 9.22 / 10',
    color: '#F36E21',
    accent: 'rgba(243,110,33,0.1)',
    border: 'rgba(243,110,33,0.3)',
    highlights: [
      'IEEE Student Branch — ExeCom Web Team',
      'Google Developer Student Club — Core Member',
    ],
    coursework: [
      'Operating Systems',
      'Computer Networks',
      'Database Systems',
      'Distributed Systems',
      'Linear Algebra',
      'Data Structures and Algorithms',
      'Object-Oriented Programming and Design',
    ],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.edu-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.edu-list', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem' }}>// education</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Where I Learned Things
          </h2>
        </div>

        {/* Cards */}
        <div className="edu-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {EDUCATION.map((e) => (
            <article
              key={e.school}
              className="edu-card glass"
              style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
            >
              {/* Accent top bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, ${e.color}, transparent)`,
              }} />

              {/* Header row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {/* Institution logo */}
                  <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={e.logo.src}
                      alt={e.logo.alt}
                      width={e.logo.width}
                      height={e.logo.height}
                      style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>
                      {e.school}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                      color: 'var(--dim)', marginTop: '0.15rem',
                    }}>
                      {e.location}
                    </p>
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: 'var(--dim)', letterSpacing: '0.04em', whiteSpace: 'nowrap',
                }}>
                  {e.period}
                </span>
              </div>

              {/* Degree */}
              <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text)', marginBottom: '0.75rem' }}>
                {e.degree}
              </p>

              {/* GPA badge */}
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: e.color, marginBottom: '1.25rem',
                background: e.accent, border: `1px solid ${e.border}`,
                borderRadius: '4px', padding: '0.2rem 0.6rem',
              }}>
                {e.gpa}
              </div>

              {/* Highlights */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                {e.highlights.map((h) => (
                  <li key={h} style={{
                    fontSize: '0.82rem', color: 'var(--muted)',
                    paddingLeft: '1.1rem', position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: '0.5rem',
                      width: '4px', height: '4px', borderRadius: '50%',
                      background: e.color, opacity: 0.7,
                    }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Coursework */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  color: 'var(--dim)', letterSpacing: '0.12em',
                  textTransform: 'uppercase', marginBottom: '0.6rem',
                }}>
                  // relevant coursework
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {e.coursework.map((c) => (
                    <span key={c} className="skill-tag" style={{ fontSize: '0.72rem' }}>{c}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
