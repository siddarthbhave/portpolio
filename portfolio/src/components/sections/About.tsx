'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '$1M',   label: 'Saved annually — AWS cloud monitoring redesign' },
  { value: '75M/s', label: 'Records/sec — pipeline capacity built at Morgan Stanley' },
  { value: '15',    label: 'Engineers led — from Wall Street firms to bootstrapped startups' },
  { value: '8',     label: 'Products shipped to production' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-text', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text-wrap',
          start: 'top 80%',
        },
      });

      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 82%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left: Text */}
        <div className="about-text-wrap">
          <p className="about-text section-label" style={{ marginBottom: '1.5rem' }}>
            // about
          </p>
          <h2
            className="about-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}
          >
            Full-Send Dev.
            <br />
            <span className="text-gradient">No Half Measures.</span>
          </h2>
          <p
            className="about-text"
            style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '1.5rem', fontSize: '1.05rem' }}
          >
            Graduate student at the{' '}
            <span style={{ color: 'var(--text)' }}>
              University of Washington, Seattle
            </span>{' '}
            (Information Management). I&apos;ve spent years building distributed
            systems and data pipelines at{' '}
            <span style={{ color: 'var(--text)' }}>Morgan Stanley and AWS</span>{' '}
            that process tens of millions of events per minute and saved millions
            in operational costs.
          </p>
          <p
            className="about-text"
            style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '1.05rem' }}
          >
            Outside of engineering, I co-founded{' '}
            <span style={{ color: 'var(--text)' }}>Aamara Technologies</span> —
            bootstrapped, profitable from day one, shipped 8 products to
            production in 26 months with a team of 15. I live at the intersection of systems
            thinking, data, and code.
          </p>
        </div>

        {/* Right: Stats */}
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="stat-card glass"
              style={{ padding: '1.75rem', transition: 'transform 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '0.4rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--muted)',
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
