'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ── Section registry ── */
const SECTIONS = [
  { id: 'home',       label: 'Home' },
  { id: 'timeline',   label: 'Timeline' },
  { id: 'schedule',   label: 'Schedule' },
  { id: 'about-team', label: 'About Team' },
] as const;

type SectionId = (typeof SECTIONS)[number]['id'];

/* ── Inline styles as constants to keep JSX readable ── */
const FONT = 'var(--font-corpta), sans-serif';

const pillBase: React.CSSProperties = {
  position: 'fixed',
  top: '18px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 9999,
  fontFamily: FONT,
  cursor: 'default',

  /* ── Liquid Water / Refraction visual ── */
  backdropFilter: 'blur(16px) brightness(1.1) contrast(1.1) saturate(120%)',
  WebkitBackdropFilter: 'blur(16px) brightness(1.1) contrast(1.1) saturate(120%)',

  background: 'transparent',

  /* Mimicking the thick 3D glass bevel from the reference image */
  boxShadow: [
    // Strong top/left specular highlight (the bright rim)
    'inset 2px 3px 6px rgba(255, 255, 255, 0.7)',
    'inset 1px 1px 2px rgba(255, 255, 255, 0.9)',
    // Strong bottom/right inner shadow (the thick glass volume)
    'inset -2px -4px 8px rgba(0, 0, 0, 0.5)',
    'inset -1px -1px 3px rgba(0, 0, 0, 0.7)',
    // Drop shadow for depth
    '0 15px 35px rgba(0, 0, 0, 0.5)',
    // Fake caustic reflection below the glass
    '0 15px 20px rgba(255, 255, 255, 0.08)'
  ].join(', '),

  // Pronounced directional borders to enhance the 3D bevel edge
  borderTop: '1.5px solid rgba(255, 255, 255, 0.7)',
  borderLeft: '1.5px solid rgba(255, 255, 255, 0.4)',
  borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
  borderRight: '1px solid rgba(0, 0, 0, 0.2)',
  
  borderRadius: '999px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  width: 'max-content',
  contain: 'layout paint', // Isolates layout recalculations from the rest of the DOM
  willChange: 'width, transform',

  /* ── Motion: all transitions via CSS only (no new dep) ── */
  transition: [
    'padding 320ms cubic-bezier(0.4,0,0.2,1)',
    'box-shadow 200ms ease',
    'border-radius 320ms ease',
  ].join(', '),

  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
};

const compactInner: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 48px',
  minWidth: '160px',
};

const activeLabelStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'rgba(220,235,255,0.9)',
  lineHeight: 1,
};

const expandedInner: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0',
  padding: '0',
  height: '72px',
};

const logoBlock: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 36px',
  height: '100%',
  cursor: 'pointer',
  borderRight: '1px solid rgba(255,255,255,0.08)',
  flexShrink: 0,
};

const logoText: React.CSSProperties = {
  fontSize: '1.25rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.95)',
  fontWeight: 600,
};

const navLinksWrapper: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  gap: '12px',
  flexShrink: 0,
};

const navLinkBase: React.CSSProperties = {
  padding: '14px 20px',
  fontSize: '0.9rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: 'rgba(200,220,255,0.75)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontFamily: FONT,
  borderRadius: '999px',
  transition: 'color 150ms ease, background 150ms ease',
  lineHeight: 1,
  flexShrink: 0,
};

const navLinkHover: React.CSSProperties = {
  color: 'rgba(255,255,255,1)',
  background: 'rgba(255,255,255,0.08)',
};

/* ── Component ── */
export default function LiquidGlassNav() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [inAbout, setInAbout] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  /* ── Detect pointer type and mobile view client-side only ── */
  const [isPointerFine, setIsPointerFine] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqPointer = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mqPointer.matches);
    const onPointerChange = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mqPointer.addEventListener('change', onPointerChange);

    const mqMobile = window.matchMedia('(max-width: 768px)');
    setIsMobile(mqMobile.matches);
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mqMobile.addEventListener('change', onMobileChange);

    return () => {
      mqPointer.removeEventListener('change', onPointerChange);
      mqMobile.removeEventListener('change', onMobileChange);
    };
  }, []);

  /* ── IntersectionObserver: track which section is active ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id as SectionId);
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Also observe the 'about' section specifically for the logo text change
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      const aboutObs = new IntersectionObserver(([entry]) => {
        setInAbout(entry.isIntersecting);
      }, { threshold: 0.3 });
      aboutObs.observe(aboutEl);
      observers.push(aboutObs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Collapse on outside click / tap ── */
  const handleOutsideClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    },
    []
  );

  useEffect(() => {
    if (expanded) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [expanded, handleOutsideClick]);

  const handleMouseEnter = () => {
    if (isPointerFine) setExpanded(true);
  };
  const handleMouseLeave = () => {
    if (isPointerFine) setExpanded(false);
  };
  const handleTap = (e: React.MouseEvent) => {
    if (!isPointerFine) {
      e.stopPropagation();
      setExpanded((v) => !v);
    }
  };

  /* ── Navigate and collapse ── */
  const navigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setExpanded(false);
  };

  const activeLabelText = SECTIONS.find((s) => s.id === activeSection)?.label ?? 'Home';

  // Dynamic overrides for mobile vertical expansion
  const isEffectivelyExpanded = !isMobile || expanded;

  const dynamicExpandedInner: React.CSSProperties = {
    ...expandedInner,
    display: isEffectivelyExpanded ? 'flex' : 'none',
    flexDirection: isMobile ? 'column' : 'row',
    height: isMobile ? 'auto' : '72px',
    padding: isMobile ? '32px 24px' : '0',
    minWidth: isMobile ? '260px' : 'auto',
  };

  const dynamicCompactInner: React.CSSProperties = {
    ...compactInner,
    display: isEffectivelyExpanded ? 'none' : 'flex',
    padding: isMobile ? '12px 32px' : compactInner.padding,
    minWidth: isMobile ? '120px' : compactInner.minWidth,
  };

  const dynamicActiveLabelStyle: React.CSSProperties = {
    ...activeLabelStyle,
    fontSize: isMobile ? '0.85rem' : activeLabelStyle.fontSize,
  };

  const dynamicLogoBlock: React.CSSProperties = {
    ...logoBlock,
    borderRight: isMobile ? 'none' : logoBlock.borderRight,
    borderBottom: isMobile ? '1px solid rgba(255,255,255,0.06)' : 'none',
    padding: isMobile ? '0 0 24px 0' : logoBlock.padding,
    width: isMobile ? '100%' : 'auto',
  };

  const dynamicLogoText: React.CSSProperties = {
    ...logoText,
    fontSize: isMobile ? '1.1rem' : logoText.fontSize,
  };

  const dynamicNavLinksWrapper: React.CSSProperties = {
    ...navLinksWrapper,
    flexDirection: isMobile ? 'column' : 'row',
    padding: isMobile ? '24px 0 0 0' : navLinksWrapper.padding,
    gap: isMobile ? '12px' : navLinksWrapper.gap,
    width: isMobile ? '100%' : 'auto',
  };

  const dynamicPillBase: React.CSSProperties = {
    ...pillBase,
    borderRadius: isMobile && expanded ? '32px' : '999px',
  };

  return (
    <div
      ref={pillRef}
      style={dynamicPillBase}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      aria-label="Site navigation"
      role="navigation"
    >
      {/* ── Compact State ── */}
      <div style={dynamicCompactInner}>
        {activeSection === 'home' || inAbout ? (
          <span style={{ ...dynamicActiveLabelStyle, display: 'flex', alignItems: 'center', willChange: 'width' }}>
            <span
              style={{
                display: 'inline-flex',
                maxWidth: inAbout ? '115px' : '0px',
                transition: 'max-width 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'max-width',
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  opacity: inAbout ? 1 : 0,
                  transition: 'opacity 400ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                ABOUT&nbsp;
              </span>
            </span>
            <span>SHUNYA</span>
          </span>
        ) : (
          <span style={dynamicActiveLabelStyle}>{activeLabelText}</span>
        )}
      </div>

      {/* ── Expanded State ── */}
      <div
        style={dynamicExpandedInner}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo / Home link */}
        <div
          style={dynamicLogoBlock}
          onClick={() => navigate('home')}
          role="link"
          aria-label="Home"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('home')}
        >
          <span style={{ ...dynamicLogoText, display: 'flex', alignItems: 'center', willChange: 'width' }}>
            <span
              style={{
                display: 'inline-flex',
                maxWidth: inAbout ? '115px' : '0px',
                transition: 'max-width 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'max-width',
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  opacity: inAbout ? 1 : 0,
                  transition: 'opacity 400ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                ABOUT&nbsp;
              </span>
            </span>
            <span>SHUNYA</span>
          </span>
        </div>

        {/* Nav links — all except Home */}
        <div style={dynamicNavLinksWrapper}>
          {SECTIONS.filter((s) => s.id !== 'home').map((s) => (
            <button
              key={s.id}
              style={{
                ...navLinkBase,
                ...(hoveredLink === s.id && !isMobile ? navLinkHover : {}),
                ...(activeSection === s.id && isMobile ? { color: '#ffffff', background: 'rgba(255,255,255,0.04)' } : {}),
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '16px 20px' : navLinkBase.padding,
                borderRadius: isMobile ? '16px' : navLinkBase.borderRadius,
                fontSize: isMobile ? '0.95rem' : navLinkBase.fontSize,
                letterSpacing: isMobile ? '0.2em' : navLinkBase.letterSpacing,
              }}
              onMouseEnter={() => !isMobile && setHoveredLink(s.id)}
              onMouseLeave={() => !isMobile && setHoveredLink(null)}
              onClick={() => navigate(s.id)}
              tabIndex={0}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
