import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  // ─── DYNAMIC REVIEWS DATA ───
  const reviews = [
    { text: "Excellent geo-fencing features. Reporting potholes in my street has never been this transparent. The real-time mapping nodes and immediate authority routing makes civic action effortless and highly effective.", author: "Karthik Raja, Chennai", stars: "★★★★★" },
    { text: "A game changer for smart city infrastructure. Proud to see Bhopal adopting AI for better roads. The fiscal budget audit ledger provides unprecedented community transparency and contractor tracking.", author: "Amit Sharma, Bhopal", stars: "★★★★★" },
    { text: "Seamless interface and global scalability. The accountability factor is exactly what modern urban planning needs. An industrial grade project designed to work flawlessly across distinct administrative setups.", author: "Sarah Jenkins, London", stars: "★★★★★" }
  ];

  const [currentReview, setCurrentReview] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // Out animation start
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
        setFade(true); 
      }, 300); 
    }, 3000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <div style={{ background: '#060d18', color: '#ffffff', minHeight: '100vh', fontFamily: "'Sora', sans-serif", width: '100vw', margin: 0, padding: 0, overflowX: 'hidden' }}>
      
  
<nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between bg-transparent px-5 py-4 md:px-12 md:py-6">
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '16px', color: '#ffffff', textDecoration: 'none', letterSpacing: '0.5px' }}>
          <span style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #00e5c8, #0088cc)', borderRadius: '6px', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '14px' }}>🛡️</span>
          ROADWATCH
        </a>
        <Link to="/login" style={{ background: '#00e5c8', color: '#060d18', padding: '10px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', textDecoration: 'none', marginLeft: 'auto', boxShadow: '0 0 20px rgba(0,229,200,0.2)' }}>
          Get Started
        </Link>
      </nav>
      
      {/* HERO WINDOW */}
      <section className="hero" style={{ padding: 0, minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', width: '100vw' }}>
        <div className="hero-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, #070f1e 0%, #0a1628 40%, #060d18 100%)', display: 'flex', alignItems: 'center', justify: 'center' }}>
          <img 
            src="/Road.jpg" 
            alt="Road Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} 
          />
        </div>
        
        <div className="relative z-10 w-full max-w-[800px] px-5 pt-32 pb-10 md:px-12 md:pt-40 md:pb-16 text-center md:text-left mx-auto md:mx-0">
          <h1 style={{ fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px' }}>
            Building Smarter Roads<br />With <span style={{ color: '#00e5c8' }}>AI Transparency</span>
          </h1>
          <p style={{ color: '#8a9bb5', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '460px' }}>
            AI-powered road monitoring that empowers citizens, ensures accountability, and builds better infrastructure.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn-primary" style={{ background: '#00e5c8', color: '#060d18', padding: '10px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
              Explore RoadWatch
            </Link>
            <a href="#how" className="btn-outline" style={{ background: 'transparent', color: '#ffffff', padding: '10px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              ▶ See How It Works
            </a>
          </div>
        </div>

        {/* ─── STATS ROW ─── */}
        <div className="relative z-10 mt-auto bg-[#081120]/75 backdrop-blur-md border border-white/10 rounded-xl mx-4 mb-8 md:mx-12 md:mb-12 p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="stat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justify: 'center', gap: '6px', color: '#5a6e85', fontSize: '12px', marginBottom: '8px', fontWeight: 500 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00e5c8" strokeWidth="2.5"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
              Road Issues Reported
            </div>
            <div className="stat-value" style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>24,532+</div>
          </div>
          <div className="stat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justify: 'center', gap: '6px', color: '#5a6e85', fontSize: '12px', marginBottom: '8px', fontWeight: 500 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00e5c8" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
              Active Users
            </div>
            <div className="stat-value" style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>18,932+</div>
          </div>
          <div className="stat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justify: 'center', gap: '6px', color: '#5a6e85', fontSize: '12px', marginBottom: '8px', fontWeight: 500 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00e5c8" strokeWidth="2.5"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
              Issues Resolved
            </div>
            <div className="stat-value" style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>12,423+</div>
          </div>
          <div className="stat-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justify: 'center', gap: '6px', color: '#5a6e85', fontSize: '12px', marginBottom: '8px', fontWeight: 500 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00e5c8" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
              Cities Covered
            </div>
            <div className="stat-value" style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>230+</div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="how-section" id="how" style={{ padding: '90px 48px', background: '#081120', width: '100vw' }}>
        <div className="section-label" style={{ textAlign: 'center', color: '#00e5c8', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>HOW IT WORKS</div>
        <h2 className="section-title" style={{ textAlign: 'center', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px' }}>Simple Steps,<br /><span style={{ color: '#00e5c8' }}>Powerful Impact</span></h2>
        <p className="section-desc" style={{ textAlign: 'center', color: '#8a9bb5', fontSize: '14px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 56px' }}>From reporting an issue to ensuring action, RoadWatch makes the entire process transparent and efficient.</p>

        <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4 relative">
          <div className="step-pro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', position: 'relative' }}>
            <div className="step-pro-top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
              <div className="step-pro-badge" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '10px' }}>Step 01</div>
              <div className="step-pro-circle" style={{ width: '104px', height: '104px', borderRadius: '50%', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                <div className="step-pro-circle-outer" style={{ width: '104px', height: '104px', borderRadius: '50%', border: '1.5px solid rgba(0,229,200,0.3)', background: 'linear-gradient(135deg, #0d1e30 0%, #081525 100%)', display: 'flex', alignItems: 'center', justify: 'center', position: 'relative' }}>
                  <div className="step-pro-circle-inner" style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '26px' }}>📝</div>
                </div>
              </div>
            </div>
            <div className="step-pro-body" style={{ textAlign: 'center' }}>
              <div className="step-pro-num" style={{ display: 'inline-block', fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '8px', padding: '3px 10px', border: '1px solid rgba(0,229,200,0.25)', borderRadius: '20px', background: 'rgba(0,229,200,0.06)' }}>Report</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.3 }}>Submit Your Issue</h4>
              <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.65 }}>Citizen reports road issue with precise location, photos & details directly from the app.</p>
            </div>
          </div>
          <div className="step-pro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', position: 'relative' }}>
            <div className="step-pro-top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
              <div className="step-pro-badge" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '10px' }}>Step 02</div>
              <div className="step-pro-circle" style={{ width: '104px', height: '104px', borderRadius: '50%', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                <div className="step-pro-circle-outer" style={{ width: '104px', height: '104px', borderRadius: '50%', border: '1.5px solid rgba(0,229,200,0.3)', background: 'linear-gradient(135deg, #0d1e30 0%, #081525 100%)', display: 'flex', alignItems: 'center', justify: 'center', position: 'relative' }}>
                  <div className="step-pro-circle-inner" style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '26px' }}>🤖</div>
                </div>
              </div>
            </div>
            <div className="step-pro-body" style={{ textAlign: 'center' }}>
              <div className="step-pro-num" style={{ display: 'inline-block', fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '8px', padding: '3px 10px', border: '1px solid rgba(0,229,200,0.25)', borderRadius: '20px', background: 'rgba(0,229,200,0.06)' }}>Analyze</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.3 }}>AI Categorizes Fast</h4>
              <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.65 }}>AI analyses the data, classifies severity and routes to the right department.</p>
            </div>
          </div>
          <div className="step-pro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', position: 'relative' }}>
            <div className="step-pro-top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
              <div className="step-pro-badge" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '10px' }}>Step 03</div>
              <div className="step-pro-circle" style={{ width: '104px', height: '104px', borderRadius: '50%', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                <div className="step-pro-circle-outer" style={{ width: '104px', height: '104px', borderRadius: '50%', border: '1.5px solid rgba(0,229,200,0.3)', background: 'linear-gradient(135deg, #0d1e30 0%, #081525 100%)', display: 'flex', alignItems: 'center', justify: 'center', position: 'relative' }}>
                  <div className="step-pro-circle-inner" style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '26px' }}>🔔</div>
                </div>
              </div>
            </div>
            <div className="step-pro-body" style={{ textAlign: 'center' }}>
              <div className="step-pro-num" style={{ display: 'inline-block', fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '8px', padding: '3px 10px', border: '1px solid rgba(0,229,200,0.25)', borderRadius: '20px', background: 'rgba(0,229,200,0.06)' }}>Notify</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.3 }}>Authority Alerted</h4>
              <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.65 }}>Responsible authority receives an automated alert and must acknowledge.</p>
            </div>
          </div>
          <div className="step-pro" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', position: 'relative' }}>
            <div className="step-pro-top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
              <div className="step-pro-badge" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '10px' }}>Step 04</div>
              <div className="step-pro-circle" style={{ width: '104px', height: '104px', borderRadius: '50%', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justify: 'center', flexShrink: 0 }}>
                <div className="step-pro-circle-outer" style={{ width: '104px', height: '104px', borderRadius: '50%', border: '1.5px solid rgba(0,229,200,0.3)', background: 'linear-gradient(135deg, #0d1e30 0%, #081525 100%)', display: 'flex', alignItems: 'center', justify: 'center', position: 'relative' }}>
                  <div className="step-pro-circle-inner" style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.2)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '26px' }}>📊</div>
                </div>
              </div>
            </div>
            <div className="step-pro-body" style={{ textAlign: 'center' }}>
              <div className="step-pro-num" style={{ display: 'inline-block', fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: '#00e5c8', textTransform: 'uppercase', marginBottom: '8px', padding: '3px 10px', border: '1px solid rgba(0,229,200,0.25)', borderRadius: '20px', background: 'rgba(0,229,200,0.06)' }}>Track</div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', lineHeight: 1.3 }}>Live Updates</h4>
              <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.65 }}>Citizens track real-time resolution status until verification.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="key-features-section" style={{ padding: '90px 48px', background: '#081120', paddingTop: 0, width: '100vw' }}>
        <div className="section-label" style={{ textAlign: 'center', color: '#00e5c8', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>KEY FEATURES</div>
        <h2 className="section-title" style={{ textAlign: 'center', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '56px' }}>Everything You Need<br />For <span style={{ color: '#00e5c8' }}>Road Transparency</span></h2>
        
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 max-w-[960px] mx-auto px-5 md:px-0">
          <div style={{ background: '#0b1829', border: '1px solid rgba(0,229,200,0.25)', borderRadius: '12px', padding: '28px 24px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(0,229,200,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '16px', fontSize: '18px' }}>🛣️</div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>AI Road Monitoring</h3>
            <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.6 }}>AI analyses road conditions and detects issues fast.</p>
          </div>
          <div style={{ background: '#0b1829', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '28px 24px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(0,229,200,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '16px', fontSize: '18px' }}>💰</div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Budget Transparency</h3>
            <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.6 }}>Track allocated budgets and expenses for road projects.</p>
          </div>
          <div style={{ background: '#0b1829', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '28px 24px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(0,229,200,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '16px', fontSize: '18px' }}>📨</div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Complaint Routing</h3>
            <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.6 }}>Complaints are auto-routed to the correct authority.</p>
          </div>
          <div style={{ background: '#0b1829', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px 16px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(0,229,200,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '16px', fontSize: '18px' }}>🖥️</div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>User Interface</h3>
            <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.6 }}>Clean, accessible and fluid multi-language system.</p>
          </div>
          <div style={{ background: '#0b1829', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px 16px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(0,229,200,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '16px', fontSize: '18px' }}>✅</div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Data Accuracy</h3>
            <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.6 }}>High verification precision through specialized AI models.</p>
          </div>
          <div style={{ background: '#0b1829', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px 16px' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(0,229,200,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center', marginBottom: '16px', fontSize: '18px' }}>🌏</div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>Global Scalability</h3>
            <p style={{ color: '#8a9bb5', fontSize: '12px', lineHeight: 1.6 }}>Deploy instantly across borders and administrative setups.</p>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <div className="cta-banner" style={{ position: 'relative', overflow: 'hidden', padding: '100px 48px', textAlign: 'left', width: '100vw' }}>
        <div className="cta-banner-bg" style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, #0a1a30 0%, #060d18 100%)', display: 'flex', alignItems: 'center', justify: 'center' }}>
          <div className="img-placeholder" style={{ width: '100%', height: '100%', border: 'none', borderRadius: 0, background: 'linear-gradient(135deg, #0d1e30 0%, #081525 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justify: 'center', color: '#5a6e85', fontSize: '12px', gap: '8px', textAlign: 'center', padding: '20px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
            <span><img 
            src="/Road2.jpg" 
            alt="Road Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} 
          /></span>
          </div>
        </div>
        <div className="cta-banner-content" style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>Be the Change.<br />Build Better Roads.</h2>
          <p style={{ color: '#8a9bb5', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>Your reports can create real impact. Join thousands of citizens making their cities better every day.</p>
          <div className="cta-banner-btns" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn-primary" style={{ background: '#00e5c8', color: '#060d18', padding: '10px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>Report an Issue</Link>
            <Link to="/dashboard" className="btn-outline" style={{ background: 'transparent', color: '#ffffff', padding: '10px 22px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>View Dashboard</Link>
          </div>
        </div>
      </div>

      <section className="testimonials-section" style={{ padding: '100px 48px', background: '#060d18', width: '100vw' }}>
        <div className="section-label" style={{ textAlign: 'center', color: '#00e5c8', fontSize: '11px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>WHAT USERS SAY</div>
        <h2 className="section-title" style={{ textAlign: 'center', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '40px' }}>Trusted by Citizens<br />Across the Globe</h2>
        
        <div className="testimonial-card" style={{ 
          maxWidth: '900px', 
          margin: '0 auto', 
          background: '#0b1829', 
          border: '1px solid rgba(255,255,255,0.07)', 
          borderRadius: '16px', 
          padding: '50px 60px', 
          position: 'relative', 
          textAlign: 'center', 
          minHeight: '240px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateX(0px)' : 'translateX(20px)'
        }}>
          <div style={{ fontSize: '54px', color: '#00e5c8', lineHeight: 1, marginBottom: '8px', fontFamily: 'Georgia, serif' }}>"</div>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#ffffff', marginBottom: '24px', fontStyle: 'italic', fontWeight: 400, letterSpacing: '0.2px' }}>
            {reviews[currentReview].text}
          </p>
          <div style={{ color: '#00e5c8', fontSize: '18px', marginBottom: '12px' }}>{reviews[currentReview].stars}</div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#8a9bb5', letterSpacing: '0.5px' }}>— {reviews[currentReview].author}</div>
        </div>

        {/* Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
          {reviews.map((_, i) => (
            <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === currentReview ? '#00e5c8' : 'rgba(255,255,255,0.15)', transition: 'background 0.3s' }}></div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA (Centered Layout Configuration) ─── */}
      <div className="final-cta" style={{ position: 'relative', overflow: 'hidden', padding: '120px 48px', textAlign: 'center', width: '100vw', background: 'linear-gradient(180deg, #060d18 0%, #0a1628 100%)' }}>
        <div className="final-cta-content" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px' }}>Let's Build Smarter Roads,<br /><span style={{ color: '#00e5c8' }}>Together.</span></h2>
          <p style={{ color: '#8a9bb5', fontSize: '16px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>Join RoadWatch and be a part of the movement towards better infrastructure and accountability.</p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" style={{ background: '#00e5c8', color: '#060d18', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer', textDecoration: 'none', boxShadow: '0 0 20px rgba(0,229,200,0.3)' }}>Get Started</Link>
            <a href="#how" style={{ background: 'transparent', color: '#ffffff', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', textDecoration: 'none' }}>Learn More</a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;