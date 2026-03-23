'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import ResumeModal from '@/components/ui/ResumeModal';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%' }} />,
});

/* Typewriter cycles through expertise domains */
const ROLES = [
  'Software Engineering & Architecture',
  'DevOps & System Architecture',
  'Data Science & Data Engineering',
  'Machine Learning & Generative AI',
];

/* Static personality traits */
const TRAITS = [
  'Full-Send Coder',
  'Algorithmist',
  'Systems Engineer',
  'Competitive Programmer',
  'Wanna-be F1 Strategist',
];

/* ─── Typewriter ───────────────────────────────────────── */
function TypewriterRole() {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<'type' | 'pause' | 'erase'>('type');

  useEffect(() => {
    const target = ROLES[idx];
    if (phase === 'type') {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 52);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('pause'), 1800);
      return () => clearTimeout(t);
    }
    if (phase === 'pause') {
      const t = setTimeout(() => setPhase('erase'), 400);
      return () => clearTimeout(t);
    }
    if (phase === 'erase') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 24);
        return () => clearTimeout(t);
      }
      setIdx(i => (i + 1) % ROLES.length);
      setPhase('type');
    }
  }, [displayed, phase, idx]);

  return (
    <span style={{
      color: 'var(--glow)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
      textShadow: '0 0 20px rgba(129,140,248,0.4)',
    }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: '2px', height: '1em',
        background: 'var(--accent)', verticalAlign: 'middle', marginLeft: '2px',
        animation: 'cursor-blink 1s step-end infinite',
      }} />
    </span>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
export default function Hero() {
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const openResume  = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);
  const lenis = useLenis();

  /* Detect mobile to skip 3D canvas (avoids blob overflow on small viewports) */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!nameRef.current) return;
    const split = new SplitType(nameRef.current, { types: 'chars' });
    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        y: '110%',
        opacity: 0,
        duration: 0.85,
        stagger: 0.028,
        ease: 'power4.out',
        delay: 0.1,
      });
    });
    return () => { ctx.revert(); split.revert(); };
  }, []);

  return (
    <section className="hero-section" style={{
      position: 'relative',
      minHeight: '100dvh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      overflow: 'hidden',
    }}>

      {/* ── Left: Text ─────────────────────────────────── */}
      <div className="hero-left" style={{
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(2rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.4rem',
      }}>

        {/* Name */}
        <div style={{ overflow: 'hidden' }}>
          <h1
            ref={nameRef}
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: 'var(--text)',
              textShadow: '0 2px 24px rgba(0,0,0,0.9)',
            }}
          >
            SIDDARTH<br />BHAVE
          </h1>
        </div>

        {/* Typewriter — expertise domains */}
        <div className="hero-animate" style={{ animationDelay: '0.5s', minHeight: '1.5rem' }}>
          <TypewriterRole />
        </div>

        {/* Static personality traits — flex-wrap for natural mobile wrapping */}
        <div className="hero-animate" style={{ animationDelay: '0.7s' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.82rem, 1.6vw, 0.98rem)',
            fontWeight: 500,
            color: 'var(--muted)',
            lineHeight: 1.7,
            textShadow: '0 1px 12px rgba(0,0,0,0.8)',
            rowGap: '0',
          }}>
            {TRAITS.map((t, i) => (
              <span key={t} style={{ whiteSpace: 'nowrap' }}>
                {t}
                {i < TRAITS.length - 1 && (
                  <span style={{ color: 'var(--dim)', padding: '0 0.45rem' }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="hero-animate" style={{
          animationDelay: '0.9s',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}>
          <a
            href="#experience"
            className="btn-glow"
            style={{ textDecoration: 'none' }}
            onClick={(e) => {
              e.preventDefault();
              lenis?.scrollTo('#experience', { duration: 1.4 });
            }}
          >
            View Work
          </a>
          <button
            onClick={openResume}
            className="btn-glow"
            style={{ fontFamily: 'var(--font-mono)', background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.4)' }}
          >
            Resume ↗
          </button>
          <a
            href="https://github.com/siddarthbhave"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow"
          >
            GitHub ↗
          </a>
        </div>

        {/* Divider */}
        <div className="hero-animate" style={{
          animationDelay: '1.05s',
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        }} />

        {/* Social links */}
        <div className="hero-animate" style={{
          animationDelay: '1.1s',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/siddarthbhave/' },
            { label: 'X',        href: 'https://www.x.com/siddarthbhave/' },
            { label: 'Medium',   href: 'https://siddarthbhave.medium.com/' },
            { label: 'Email',    href: 'mailto:siddarthbhave@gmail.com' },
          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                color: 'var(--dim)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--glow)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--dim)'; }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Right: 3D Canvas (desktop only — skipped on mobile to avoid overflow) */}
      {!isMobile && (
        <div className="hero-canvas-wrap" style={{
          position: 'relative', height: '100dvh', zIndex: 1,
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%)',
        }}>
          <HeroScene />
        </div>
      )}

      {/* Aurora accent behind text */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 60%, rgba(99,102,241,0.12) 0%, transparent 55%)',
      }} />

      {/* Scroll cue */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        animation: 'scroll-bounce 2.2s ease-in-out infinite',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
          letterSpacing: '0.2em', color: 'var(--dim)', textTransform: 'uppercase',
        }}>
          scroll
        </span>
        <div style={{
          width: '1px', height: '32px',
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
        }} />
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <ResumeModal open={resumeOpen} onClose={closeResume} />
    </section>
  );
}
