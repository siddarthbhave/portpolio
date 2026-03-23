'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    if (open) {
      backdrop.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      document.body.classList.add('resume-modal-active');
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(panel,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('resume-modal-active');
      gsap.to(panel, { opacity: 0, y: 20, duration: 0.2, ease: 'power2.in' });
      gsap.to(backdrop, {
        opacity: 0, duration: 0.25, delay: 0.1, ease: 'power2.in',
        onComplete: () => { backdrop.style.display = 'none'; },
      });
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      style={{
        display: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div
        ref={panelRef}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(13, 13, 22, 0.95)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.08)',
        }}
      >
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--accent)', boxShadow: '0 0 8px rgba(99,102,241,0.8)',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              color: 'var(--muted)', letterSpacing: '0.08em',
            }}>
              Siddarth_Bhave.pdf
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href="/resume.pdf"
              download="Siddarth_Bhave.pdf"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--glow)',
                textDecoration: 'none',
                border: '1px solid rgba(129,140,248,0.25)',
                borderRadius: '4px',
                padding: '0.3rem 0.75rem',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(99,102,241,0.12)';
                el.style.borderColor = 'rgba(99,102,241,0.5)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'rgba(129,140,248,0.25)';
              }}
            >
              ↓ Download
            </a>
            <button
              onClick={onClose}
              aria-label="Close resume"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                padding: '0.25rem 0.6rem',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = 'var(--text)';
                el.style.borderColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = 'var(--muted)';
                el.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
          style={{
            flex: 1,
            width: '100%',
            minHeight: '500px',
            border: 'none',
            background: '#fff',
          }}
          title="Siddarth Bhave Resume"
        />
      </div>
    </div>
  );
}
