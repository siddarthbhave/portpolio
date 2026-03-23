'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Aamara logo (custom company — inline SVG) ─────────── */
function AamaraLogo() {
  return (
    <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" width="36" height="36" aria-label="Aamara Technologies">
      <rect x="1" y="1" width="42" height="42" rx="9" fill="rgba(129,140,248,0.1)"
        stroke="rgba(129,140,248,0.35)" strokeWidth="1"/>
      <text x="22" y="30" textAnchor="middle" fontFamily="Arial, sans-serif"
        fontSize="20" fontWeight="800" fill="#818cf8">A</text>
    </svg>
  );
}

/* ─── Company Logo dispatcher ──────────────────────────── */
function CompanyLogo({ company }: { company: string }) {
  const wrapStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: '40px', flexShrink: 0,
  };
  if (company === 'AWS') return (
    <div style={wrapStyle}>
      <Image
        src="/logo-aws.svg"
        alt="Amazon Web Services"
        width={80}
        height={40}
        style={{ objectFit: 'contain', height: '32px', width: 'auto' }}
      />
    </div>
  );
  if (company === 'Morgan Stanley') return (
    <div style={wrapStyle}>
      <Image
        src="/logo-morgan-stanley.svg"
        alt="Morgan Stanley"
        width={120}
        height={40}
        style={{ objectFit: 'contain', height: '26px', width: 'auto', filter: 'brightness(0) invert(1)' }}
      />
    </div>
  );
  return <div style={wrapStyle}><AamaraLogo /></div>;
}

/* ─── Data ─────────────────────────────────────────────── */
const JOBS = [
  {
    company: 'AWS',
    companyFull: 'Amazon Web Services (AWS)',
    location: 'Seattle, WA, USA',
    url: 'https://aws.amazon.com/',
    role: 'Software Development Engineer Intern',
    team: 'DynamoDB Networking',
    period: 'Jun 2025 — Sep 2025',
    bullets: [
      'Engineered an eBPF-based metrics collection framework for DynamoDB\'s front-end EC2 instances, enhancing packet-level visibility from Load Balancers to DynamoDB entry service with <5 microseconds latency overhead in non-prod environments after large-scale performance simulation testing',
      'Designed a cost-efficient network monitoring solution by integrating existing AWS infrastructure and services, avoiding a CloudWatch-based alternative and saving an estimated $1M annually in monitoring expenses',
    ],
    skills: ['eBPF', 'DynamoDB', 'EC2', 'AWS', 'Networking', 'Python'],
  },
  {
    company: 'Morgan Stanley',
    companyFull: 'Morgan Stanley',
    location: 'Bangalore, India',
    url: 'https://morganstanley.com/',
    role: 'Software Development Engineer 2',
    team: 'Senior Technology Associate',
    period: 'Jan 2024 — Aug 2024',
    bullets: [
      'Led benchmarking and engineering efforts to integrate Mimir into the firm\'s observability stack on Kubernetes, resulting in seamless integration with Grafana, increasing metric retention by 50% (+15 days), and decreasing query time for very-long-range queries from 5 minutes to 45 seconds',
    ],
    skills: ['Python', 'Kubernetes', 'Ansible', 'Grafana', 'Mimir'],
  },
  {
    company: 'Morgan Stanley',
    companyFull: 'Morgan Stanley',
    location: 'Bangalore, India',
    url: 'https://morganstanley.com/',
    role: 'Software Development Engineer 1',
    team: 'Technology Associate',
    period: 'Dec 2022 — Jan 2024',
    bullets: [
      'Solely designed and developed a distributed, highly scalable ETL pipeline in Java Spring Boot that extracted 75 million Kafka records per minute, transformed them into OpenTSDB format, and loaded them onto a HA metrics aggregator, Cortex',
      'Increased real-time metric retrieval up to 60 days (+200%), reducing query time by 50% — resulting in an early promotion and a tech-excellence award',
    ],
    skills: ['Java', 'SpringBoot', 'Kafka', 'Python', 'Cortex'],
  },
  {
    company: 'Morgan Stanley',
    companyFull: 'Morgan Stanley',
    location: 'Bangalore, India',
    url: 'https://morganstanley.com/',
    role: 'Software Development Engineer Intern',
    team: 'Technology Intern',
    period: 'Jan 2022 — Dec 2022',
    bullets: [
      'Revamped Windows server monitoring across the firm by seamlessly automating the integration of Prometheus exporter, reducing system usage for monitoring by 50% and tripling the metric export rate for acute monitoring',
      'Engineered automated target discovery using Python and Linux Bash, reducing server outage alert time by 75% (<30s) and cutting turnaround time by 20%',
    ],
    skills: ['Python', 'FastAPI', 'Prometheus', 'Linux', 'Windows Servers'],
  },
  {
    company: 'Aamara',
    companyFull: 'Aamara Technologies',
    location: 'Bangalore, India',
    url: '#',
    role: 'Co-founder & Chief Technology Officer',
    team: '',
    period: 'Jul 2022 — Sep 2024',
    bullets: [
      'Led a team of 15 junior developers and delivered 8 products to production in just 26 months, while being completely self-funded and profitable since day 0',
      'Architected the digitization of an ERP system in React JS, Django, PostgreSQL for a 1,200-employee factory, resulting in a 25% increase in employee efficiency and reducing bookkeeping time by 75%',
    ],
    skills: ['React JS', 'Django', 'PostgreSQL', 'Python', 'AWS'],
  },
];

/* ─── Component ────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.job-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.jobs-list', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem' }}>// experience</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Where I&apos;ve Built Things
          </h2>
        </div>

        {/* Cards */}
        <div className="jobs-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {JOBS.map((job) => (
            <article key={job.companyFull + job.period} className="job-card glass" style={{ padding: '2rem' }}>
              {/* Card header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
              }}>
                <CompanyLogo company={job.company} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                  }}>
                    <div>
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--glow)',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {job.companyFull} ↗
                      </a>
                      <div style={{ fontSize: '0.75rem', color: 'var(--dim)', marginTop: '0.1rem', fontFamily: 'var(--font-mono)' }}>
                        {job.location}
                      </div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--dim)',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}>
                      {job.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>
                  {job.role}
                </h3>
                {job.team && (
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    opacity: 0.8,
                  }}>
                    {job.team}
                  </span>
                )}
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.5rem' }}>
                {job.bullets.map((b) => (
                  <li key={b} style={{
                    fontSize: '0.95rem',
                    color: 'var(--muted)',
                    lineHeight: 1.75,
                    paddingLeft: '1.25rem',
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: '0.55rem',
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: 'var(--accent)', opacity: 0.7,
                    }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {job.skills.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
