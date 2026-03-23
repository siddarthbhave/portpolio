'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'AskHusky: Multi-Agentic Student Support Assistant',
    institution: 'UW' as const,
    logo:  { src: '/w-logo-with-wordmark_0.jpg', width: 160, height: 80, alt: 'University of Washington' },
    logo2: null as { src: string; width: number; height: number; alt: string } | null,
    period: 'Nov 2024 — Mar 2025',
    link: null,
    description: 'Built a multi-agent LLM-based assistant using the CrewAI framework, integrating Canvas LMS, UW Calendar, iSchool Websites, and university web resources to unify student information access and automate workflows like event creation, grade retrieval, and resource or information lookup. Designed and iteratively refined agent coordination, context routing, and prompt logic for robust multi-step task handling.',
    highlight: 'Demoed to the iSchool Dean — recognized for its potential to enhance student experience and streamline academic support through GenAI',
    tags: ['CrewAI', 'LLM', 'Multi-Agent', 'Python', 'RAG', 'Canvas LMS'],
    featured: true,
  },
  {
    title: 'Classification of Human Poses Using Deep Learning',
    institution: 'RIT' as const,
    logo:  { src: '/images.png',    width: 160, height: 80, alt: 'Ramaiah Institute of Technology' },
    logo2: { src: '/logo-ieee.svg', width: 110, height: 36, alt: 'IEEE' },
    period: 'Mar 2022 — Aug 2022',
    link: 'https://ieeexplore.ieee.org/abstract/document/10334180',
    description: 'Rearchitected pose classification using BlazePose and several CNNs on redrawn pose skeletons, achieving 7% efficiency gain over state-of-the-art models. Published and awarded Best Paper at IEEE CSITSS-23.',
    highlight: '★ IEEE CSITSS-23 Best Paper Award — Intelligent Systems Track',
    tags: ['Deep Learning', 'BlazePose', 'CNN', 'Computer Vision', 'Python'],
    featured: false,
  },
];

/* ─── Component ────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem' }}>// projects</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Academic Research
          </h2>
        </div>

        <div className="projects-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="project-card glass"
              style={{
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              {/* Featured accent bar */}
              {p.featured && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, var(--accent), var(--glow), transparent)',
                }} />
              )}

              {/* Header row */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem',
                marginBottom: '0.75rem',
              }}>
                {/* Logos — same style as Education section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Image
                    src={p.logo.src}
                    alt={p.logo.alt}
                    width={p.logo.width}
                    height={p.logo.height}
                    style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
                  />
                  {p.logo2 && (
                    <Image
                      src={p.logo2.src}
                      alt={p.logo2.alt}
                      width={p.logo2.width}
                      height={p.logo2.height}
                      style={{ objectFit: 'contain', height: '32px', width: 'auto' }}
                    />
                  )}
                  {p.featured && (
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)',
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                    }}>
                      Featured
                    </span>
                  )}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--dim)',
                  letterSpacing: '0.04em', whiteSpace: 'nowrap',
                }}>
                  {p.period}
                </span>
              </div>

              {/* Title */}
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <h3 style={{
                    fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)',
                    marginBottom: '0.75rem', lineHeight: 1.4,
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--glow)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; }}
                  >
                    {p.title} ↗
                  </h3>
                </a>
              ) : (
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  {p.title}
                </h3>
              )}

              {/* Description */}
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: p.highlight ? '1rem' : '1.5rem' }}>
                {p.description}
              </p>

              {/* Highlight callout */}
              {p.highlight && (
                <div style={{
                  borderLeft: '2px solid var(--accent)',
                  paddingLeft: '0.75rem',
                  marginBottom: '1.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--glow)',
                  fontStyle: 'italic',
                }}>
                  {p.highlight}
                </div>
              )}

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {p.tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
