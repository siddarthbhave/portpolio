'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PAPER = {
  title: 'Classification of Human Poses Using Deep Learning Techniques',
  venue: 'IEEE CSITSS-23 · Best Paper Award',
  period: 'Mar 2022 — Aug 2022',
  published: 'Dec 2023',
  link: 'https://ieeexplore.ieee.org/abstract/document/10334180',
  description:
    'Rearchitected pose classification using BlazePose and several CNNs on redrawn pose skeletons, achieving 7% efficiency gain over state-of-the-art models.',
  citation:
    'S. Bhave, P. Sunagar, S. Rajarajeswari, S. Bhave, S. Kamate, and S. S. Seru, "Classification of Human Poses Using Deep Learning Techniques," 2023 7th International Conference on Computation System and Information Technology for Sustainable Solutions (CSITSS), Bangalore, India, 2023, pp. 1-7.',
  tags: ['Deep Learning', 'BlazePose', 'CNN', 'Computer Vision'],
};

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.research-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.research-card', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="research"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem' }}>// research &amp; publications</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Papers
          </h2>
        </div>

        {/* Single unified paper + publication card */}
        <article className="research-card glass" style={{ padding: '2rem' }}>
          {/* Badge row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {/* Best Paper badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)',
              borderRadius: '4px', padding: '0.25rem 0.75rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.1em', color: '#fbbf24',
            }}>
              ★ BEST PAPER AWARD
            </div>
            {/* IEEE Xplore badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '4px', padding: '0.25rem 0.65rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.08em', color: 'var(--glow)',
            }}>
              IEEE Xplore
            </div>
          </div>

          {/* Period */}
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--dim)', marginBottom: '0.75rem', letterSpacing: '0.05em',
          }}>
            {PAPER.period} · Published {PAPER.published}
          </div>

          {/* Title */}
          <a href={PAPER.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <h3
              style={{
                fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)',
                marginBottom: '0.75rem', lineHeight: 1.4, transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--glow)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
            >
              {PAPER.title} ↗
            </h3>
          </a>

          {/* Venue */}
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
            color: 'var(--accent)', opacity: 0.8, marginBottom: '1rem',
          }}>
            {PAPER.venue}
          </p>

          {/* Description */}
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            {PAPER.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
            {PAPER.tags.map((t) => (
              <span key={t} className="skill-tag">{t}</span>
            ))}
          </div>

          {/* Citation */}
          <div style={{
            borderTop: '1px solid var(--border)', paddingTop: '1.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--dim)', lineHeight: 1.8, letterSpacing: '0.02em',
            }}>
              {PAPER.citation}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
