'use client';

import { useEffect, useState, useCallback } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'research', label: 'Research' },
  { id: 'achievements', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Active section tracker (scroll) ── */
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);

      const fromCenter = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return Infinity;
        return Math.abs(el.getBoundingClientRect().top - window.innerHeight * 0.3);
      };

      const closest = SECTIONS.reduce((acc, s) =>
        fromCenter(s.id) < fromCenter(acc.id) ? s : acc
      );
      setActive(closest.id);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Close menu on Escape ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <style>{`
        .nav-item { position: relative; }
        .nav-label {
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }
        .nav-item:hover .nav-label {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>

      {/* ── Desktop: right-side dots nav ────────────────── */}
      <nav
        className="page-nav"
        style={{
          position: 'fixed',
          right: '1.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: visible ? 'auto' : 'none',
        }}
        aria-label="Page sections"
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={s.label}
            className="nav-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.6rem',
              textDecoration: 'none',
            }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(s.id);
            }}
          >
            <span
              className="nav-label"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: active === s.id ? 'var(--glow)' : 'var(--text)',
                letterSpacing: '0.08em',
                whiteSpace: 'nowrap',
                background: 'rgba(5,5,8,0.75)',
                padding: '0.18rem 0.55rem',
                borderRadius: '4px',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: active === s.id
                  ? '1px solid rgba(99,102,241,0.35)'
                  : '1px solid rgba(255,255,255,0.08)',
                ...(active === s.id && { opacity: 1, transform: 'translateX(0)' }),
              }}
            >
              {s.label}
            </span>

            <div
              style={{
                width:  active === s.id ? '12px' : '7px',
                height: active === s.id ? '12px' : '7px',
                borderRadius: '50%',
                background: active === s.id ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
                border: active === s.id ? '0' : '1px solid rgba(255,255,255,0.2)',
                transition: 'width 0.25s, height 0.25s, background 0.25s',
                flexShrink: 0,
                boxShadow: active === s.id ? '0 0 10px rgba(99,102,241,0.8)' : 'none',
              }}
            />
          </a>
        ))}
      </nav>

      {/* ── Mobile: Hamburger button ─────────────────────── */}
      <button
        className="hamburger-btn"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span className={`hb-bar${menuOpen ? ' open' : ''}`} />
        <span className={`hb-bar${menuOpen ? ' open' : ''}`} />
        <span className={`hb-bar${menuOpen ? ' open' : ''}`} />
      </button>

      {/* ── Mobile: Slide-in overlay nav ─────────────────── */}
      <div
        className={`mobile-nav-overlay${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`mobile-nav-link${active === s.id ? ' mob-active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                // Slight delay to let menu close before scrolling
                setTimeout(() => scrollToSection(s.id), 350);
              }}
            >
              <span className="mobile-nav-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
