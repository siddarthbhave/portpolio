'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/siddarthbhave',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/siddarthbhave/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:siddarthbhave@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://www.x.com/siddarthbhave/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/siddarthbhave/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Medium',
    href: 'https://siddarthbhave.medium.com/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section"
      style={{ borderTop: '1px solid var(--border)', paddingBottom: '6rem' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Two-column layout */}
        <div className="contact-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* Left: Text + links */}
          <div>
            <p className="contact-content section-label" style={{ marginBottom: '1.5rem' }}>
              // let&apos;s connect
            </p>
            <h2
              className="contact-content"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                marginBottom: '1.5rem',
              }}
            >
              Let&apos;s Build
              <br />
              <span className="text-gradient">Abundance.</span>
            </h2>

            <p
              className="contact-content"
              style={{
                color: 'var(--muted)',
                fontSize: '1rem',
                maxWidth: '400px',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
              }}
            >
              Open to full-time roles, collaborations, and conversations.
              Whether it&apos;s a system that needs to scale or an idea that needs
              to ship — reach out.
            </p>

            {/* Email CTA */}
            <a
              className="contact-content"
              href="mailto:siddarthbhave@gmail.com"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
                color: 'var(--glow)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(129,140,248,0.4)',
                paddingBottom: '2px',
                marginBottom: '3rem',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = '#fff'; el.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--glow)'; el.style.borderColor = 'rgba(129,140,248,0.4)';
              }}
            >
              siddarthbhave@gmail.com ↗
            </a>

            {/* Social links */}
            <div
              className="contact-content"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    padding: '0.6rem 1rem',
                    border: '1px solid var(--border)', borderRadius: '8px',
                    color: 'var(--muted)', textDecoration: 'none',
                    fontSize: '0.85rem', fontFamily: 'var(--font-mono)',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'var(--text)';
                    el.style.borderColor = 'rgba(99,102,241,0.4)';
                    el.style.background = 'rgba(99,102,241,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'var(--muted)';
                    el.style.borderColor = 'var(--border)';
                    el.style.background = 'transparent';
                  }}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Profile photo */}
          <div
            className="contact-content contact-photo"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                transform: 'rotate(1.5deg)',
                transition: 'transform 0.3s ease',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(99,102,241,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.08)',
                maxWidth: '400px',
                width: '100%',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg) scale(1.02)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(1.5deg)'; }}
            >
              <Image
                src="/profile-casual.jpeg"
                alt="Siddarth Bhave"
                width={400}
                height={520}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: '1200px', margin: '5rem auto 0',
        padding: '2rem 2rem 0', borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--dim)' }}>
          © 2025 Siddarth Bhave
        </span>
      </div>

    </section>
  );
}
