'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: 'Languages',
    icon: '</>',
    color: '#818cf8',
    skills: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    category: 'AI / ML',
    icon: '⬡',
    color: '#34d399',
    skills: ['LangChain', 'CrewAI', 'PyTorch', 'Hugging Face', 'RAG', 'LLMs', 'Prompt Engineering', 'Multi-Agent Systems'],
  },
  {
    category: 'Infrastructure',
    icon: '▦',
    color: '#FF9900',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Kafka', 'eBPF', 'Linux', 'Prometheus', 'Grafana'],
  },
  {
    category: 'Frameworks',
    icon: '◈',
    color: '#f472b6',
    skills: ['Spring Boot', 'FastAPI', 'Django', 'React JS', 'Next.js', 'Flask'],
  },
  {
    category: 'Databases',
    icon: '◉',
    color: '#60a5fa',
    skills: ['PostgreSQL', 'MongoDB', 'DynamoDB', 'Redis', 'MySQL', 'Cortex / OpenTSDB'],
  },
  {
    category: 'Concepts',
    icon: '◌',
    color: '#c084fc',
    skills: ['System Design', 'Distributed Systems', 'Platform Engineering', 'Observability', 'ETL Pipelines', 'Cross-functional Collaboration'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-group', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section"
      style={{ borderTop: '1px solid var(--border)' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label" style={{ marginBottom: '1rem' }}>// technical skills</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Tools of the Trade
          </h2>
        </div>

        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '1rem',
          }}
        >
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="skill-group glass"
              style={{ padding: '1.75rem' }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  color: group.color,
                  lineHeight: 1,
                }}>
                  {group.icon}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: group.color,
                  fontWeight: 700,
                }}>
                  {group.category}
                </h3>
              </div>

              {/* Skill pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.05em',
                      color: 'var(--muted)',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '4px',
                      padding: '0.25rem 0.6rem',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = group.color;
                      el.style.borderColor = `${group.color}44`;
                      el.style.background = `${group.color}0d`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = 'var(--muted)';
                      el.style.borderColor = 'rgba(255,255,255,0.07)';
                      el.style.background = 'rgba(255,255,255,0.03)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
