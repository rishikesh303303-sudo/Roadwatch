import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

const SparklineOrange = () => (
  <svg width="100%" height="32" viewBox="0 0 120 32">
    <polyline points="0,28 20,22 40,25 60,18 80,20 100,14 120,16" fill="none" stroke="#ffa657" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const SparklinePurple = () => (
  <svg width="100%" height="32" viewBox="0 0 120 32">
    <polyline points="0,26 20,20 40,23 60,16 80,19 100,12 120,14" fill="none" stroke="#d2a8ff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const SparklineGreen = () => (
  <svg width="100%" height="32" viewBox="0 0 120 32">
    <polyline points="0,28 20,24 40,20 60,15 80,10 100,7 120,5" fill="none" stroke="#3fb950" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const SparklineRed = () => (
  <svg width="100%" height="32" viewBox="0 0 120 32">
    <polyline points="0,10 20,14 40,12 60,18 80,15 100,22 120,20" fill="none" stroke="#f85149" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ImagePlaceholder = () => (
  <div style={{
    width: 70, height: 56, borderRadius: 8,
    background: "linear-gradient(135deg, #1c2128, #2d333b)",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  }}>
    <svg width="24" height="24" fill="none" stroke="#8b949e" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  </div>
);

const styles = {
  body: {
    background: "#0d1117", color: "#fff",
    fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh",
  },
 header: {
  background: "#161b22", padding: "14px 16px",
  display: "flex", alignItems: "center", justifyContent: "space-between",
  borderBottom: "1px solid #21262d",
  flexWrap: "wrap", gap: "10px",
},
 main: { padding: "20px 24px", maxWidth: 1400, margin: "0 auto" },
  alertRed: {
    borderRadius: 10, padding: "14px 18px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 12,
    background: "linear-gradient(135deg, #2d1515, #1a0a0a)",
    border: "1px solid #f85149",
  },
  alertYellow: {
    borderRadius: 10, padding: "14px 18px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: 12,
    background: "linear-gradient(135deg, #2d2208, #1a1500)",
    border: "1px solid #d29922",
  },
  statsGrid: {
  display: "grid", 
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
  gap: 14, 
  margin: "20px 0",
},
  statCard: {
    background: "#161b22", border: "1px solid #21262d",
    borderRadius: 12, padding: "18px 16px",
  },
  section: {
    background: "#161b22", border: "1px solid #21262d",
    borderRadius: 12, padding: "18px 20px", marginBottom: 20,
  },
  complaintItem: {
    display: "flex", alignItems: "center", gap: 14,
    padding: "14px 0", borderBottom: "1px solid #21262d",
  },
 quickGrid: {
  display: "grid", 
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", 
  gap: 12,
},
};

const StatCard = ({ icon, iconBg, labelColor, label, valueColor, value, sub, Sparkline }) => (
  <div style={styles.statCard}>
    <div style={{
      width: 44, height: 44, borderRadius: "50%",
      background: iconBg, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: 20, marginBottom: 10,
    }}>{icon}</div>
    <div style={{ fontSize: 12, color: labelColor, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 32, fontWeight: 700, color: valueColor, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 11, color: "#8b949e", marginTop: 4 }}>{sub}</div>
    <div style={{ marginTop: 10 }}><Sparkline /></div>
  </div>
);

const Badge = ({ type, children }) => {
  const map = {
    critical: { bg: "rgba(248,81,73,0.2)", color: "#f85149", border: "1px solid rgba(248,81,73,0.4)" },
    pending:  { bg: "rgba(210,153,34,0.2)", color: "#d29922", border: "1px solid rgba(210,153,34,0.4)" },
    high:     { bg: "rgba(255,140,0,0.2)", color: "#ffa657", border: "1px solid rgba(255,140,0,0.4)" },
    inprogress: { bg: "rgba(138,43,226,0.2)", color: "#d2a8ff", border: "1px solid rgba(138,43,226,0.4)" },
  };
  const s = map[type];
  return (
    <span style={{
      padding: "3px 10px", borderRadius: 5, fontSize: 11, fontWeight: 600,
      background: s.bg, color: s.color, border: s.border,
    }}>{children}</span>
  );
};

const ComplaintItem = ({ title, location, supporters, time, badge1, badge2, badge1Type, badge2Type, isLast }) => (
  <div style={{ ...styles.complaintItem, borderBottom: isLast ? "none" : "1px solid #21262d" }}>
    <ImagePlaceholder />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 11, color: "#8b949e", display: "flex", gap: 12, flexWrap: "wrap", marginTop: 3 }}>
        <span>📍 {location}</span>
      </div>
      <div style={{ fontSize: 11, color: "#8b949e", display: "flex", gap: 12, marginTop: 4 }}>
        <span>👥 {supporters} supporters</span>
        <span>🕐 {time}</span>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
      <div style={{ display: "flex", gap: 6 }}>
        <Badge type={badge1Type}>{badge1}</Badge>
        <Badge type={badge2Type}>{badge2}</Badge>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <button style={{
          padding: "6px 12px", borderRadius: 6, fontSize: 12,
          background: "transparent", border: "1.5px solid #1f6feb",
          color: "#58a6ff", cursor: "pointer",
        }}>Acknowledge</button>
        <button style={{
          padding: "6px 12px", borderRadius: 6, fontSize: 12,
          background: "transparent", border: "1.5px solid #238636",
          color: "#3fb950", cursor: "pointer",
        }}>Resolve</button>
      </div>
    </div>
  </div>
);

const QuickCard = ({ icon, title, desc, bg, border, titleColor, onClick}) => (
  <div  onClick={onClick}
   style={{
    borderRadius: 12, padding: "18px 14px", textAlign: "center",
    cursor: "pointer", background: bg, border: `1px solid ${border}`,
    transition: "transform 0.15s",
  }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
  >
    <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: titleColor, marginBottom: 4 }}>{title}</div>
    <div style={{ fontSize: 11, color: "#8b949e" }}>{desc}</div>
  </div>
);

 export default function AuthorityHomePage() {
  const navigate = useNavigate()
  const [showRedAlert, setShowRedAlert] = useState(true);
  const [showYellowAlert, setShowYellowAlert] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const loginTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', hour12: true
  });
  const loginDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
   const [complaints, setComplaints] = useState([])
  const [stats, setStats] = useState({ pending: 0, inProgress: 0, resolved: 0, escalated: 0 })

  useEffect(() => {
    fetch('http://localhost:8000/api/complaints/authority/all')
      .then(r => r.json())
      .then(data => {
        const all = data.data || []
        setComplaints(all)
        setStats({
          pending: all.filter(c => c.status === 'Pending').length,
          inProgress: all.filter(c => c.status === 'In Progress').length,
          resolved: all.filter(c => c.status === 'Resolved').length,
          escalated: all.filter(c => c.is_fraud).length
        })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={styles.body}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "linear-gradient(135deg, #00b4d8, #1a1a2e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: "bold",
          }}>🏛</div>
          <div>
           <div style={{ fontSize: 16, fontWeight: 600, color: "#e6edf3" }}>{getGreeting()}, Officer Singh 🏛</div>
           <div style={{ fontSize: 12, color: "#8b949e" }}>Executive Engineer</div>
           <div style={{ fontSize: 11, color: "#8b949e" }}>Login: {loginDate} {loginTime}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 13, color: "#8b949e" }}>
          <span style={{ fontWeight: 500 }}>Madhya Pradesh</span>
          <span style={{ color: "#21262d" }}>|</span>
          <span style={{ fontWeight: 500 }}>PWD</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 13 }}>
          <div>
            <div><span style={{
              display: "inline-block", width: 8, height: 8,
              background: "#3fb950", borderRadius: "50%", marginRight: 5,
            }} /><span style={{ color: "#3fb950" }}>Online</span></div>
            <div style={{ fontSize: 11, color: "#8b949e" }}>🕐 Updated 2 mins ago</div>
          </div>
          <div style={{ position: "relative", cursor: "pointer", fontSize: 20 }}>
            🔔
            <div style={{
              position: "absolute", top: -5, right: -7,
              background: "#f85149", color: "#fff", borderRadius: "50%",
              fontSize: 10, width: 18, height: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>12</div>
          </div>
        </div>
      </div>

      <div style={styles.main}>
        {/* ALERTS */}
        {showRedAlert && (
          <div style={styles.alertRed}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 24 }}>🔥</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{stats.escalated} complaints flagged — Immediate Attention</div>
                <div style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>These complaints require immediate attention.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button  onClick={() => navigate('/authority/complaints')}  
               style={{
                padding: "7px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600,
                cursor: "pointer", border: "1.5px solid #f85149",
                background: "transparent", color: "#f85149",
              }}>View Escalated →</button>
             <button
  onClick={() => {
    setShowRedAlert(false)
  }}
  style={{
    background: "none", border: "none", color: "#8b949e", fontSize: 18, cursor: "pointer",
  }}
>✕</button>
            </div>
          </div>
        )}

        {showYellowAlert && (
          <div style={styles.alertYellow}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 24 }}>⚠️</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{stats.pending} complaints pending — Awaiting Action</div>
                <div style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>These critical complaints are pending for more than 48 hours.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => navigate('/authority/complaints')} 
              style={{
                padding: "7px 14px", borderRadius: 7, fontSize: 12, fontWeight: 600,
                cursor: "pointer", border: "1.5px solid #d29922",
                background: "transparent", color: "#d29922",
              }}>View Critical →</button>
              <button onClick={() => setShowYellowAlert(false)} style={{
                background: "none", border: "none", color: "#8b949e", fontSize: 18, cursor: "pointer",
              }}>✕</button>
            </div>
          </div>
        )}

        {/* STAT CARDS */}
        <div style={styles.statsGrid}>
          <StatCard
            icon="📋" iconBg="rgba(255,140,0,0.18)"
            labelColor="#ffa657" label="Pending"
            valueColor="#ffa657" value={stats.pending.toString()}
            sub="Awaiting acknowledgement" Sparkline={SparklineOrange}
          />
          <StatCard
            icon="⚙️" iconBg="rgba(138,43,226,0.18)"
            labelColor="#d2a8ff" label="In Progress"
            valueColor="#d2a8ff" value={stats.inProgress.toString()}
            sub="Currently being resolved" Sparkline={SparklinePurple}
          />
         <StatCard
            icon="✅" iconBg="rgba(63,185,80,0.18)"
            labelColor="#3fb950" label="Resolved"
            valueColor="#3fb950" value={stats.resolved.toString()}
            sub="Complaints resolved" Sparkline={SparklineGreen}
          />
          <StatCard
            icon="👥" iconBg="rgba(248,81,73,0.18)"
            labelColor="#f85149" label="Escalated (20+ Supporters)"
            valueColor="#f85149" value={stats.escalated.toString()}
            sub="Require immediate action" Sparkline={SparklineRed}
          />
        </div>

        {/* PRIORITY INBOX */}
        <div style={styles.section}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ color: "#f85149", fontSize: 18 }}>⚠</span>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Priority Inbox</span>
          </div>
          <div style={{ fontSize: 12, color: "#8b949e", marginBottom: 16 }}>Top priority complaints that need your attention</div>

         {complaints.length === 0 ? (
  <div style={{ textAlign: 'center', color: '#8b949e', padding: '20px 0' }}>
    No complaints yet
  </div>
) : (
  complaints.slice(0, 3).map((comp, idx) => (
    <div
      key={comp.id}
      style={{
        ...styles.complaintItem,
        borderBottom: idx === 2 ? 'none' : '1px solid #21262d'
      }}
    >
      {/* Photo */}
      {comp.image_url && comp.image_url.startsWith('http') ? (
        <img
          src={comp.image_url}
          alt="complaint"
          style={{ width: 70, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <ImagePlaceholder />
      )}

      {/* Details */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
          {comp.road_name || comp.description?.substring(0, 40) || 'Road Complaint'}
        </div>
        <div style={{ fontSize: 11, color: '#8b949e', marginTop: 3 }}>
          📍 {comp.latitude?.toFixed(4)}, {comp.longitude?.toFixed(4)}
        </div>
        <div style={{ fontSize: 11, color: '#8b949e', marginTop: 4, display: 'flex', gap: 12 }}>
          <span>🕐 {new Date(comp.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          {comp.is_fraud && <span style={{ color: '#f85149' }}>🚩 Fraud</span>}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <Badge type={comp.is_fraud ? 'critical' : 'pending'}>
            {comp.is_fraud ? '⊘ Fraud' : '⚠ Pending'}
          </Badge>
          <Badge type={comp.status === 'Resolved' ? 'inprogress' : 'pending'}>
            {comp.status}
          </Badge>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => navigate('/authority/complaints')}
            style={{
              padding: '6px 12px', borderRadius: 6, fontSize: 12,
              background: 'transparent', border: '1.5px solid #1f6feb',
              color: '#58a6ff', cursor: 'pointer',
            }}
          >Acknowledge</button>
          <button
            onClick={() => navigate('/authority/complaints')}
            style={{
              padding: '6px 12px', borderRadius: 6, fontSize: 12,
              background: 'transparent', border: '1.5px solid #238636',
              color: '#3fb950', cursor: 'pointer',
            }}
          >Resolve</button>
        </div>
      </div>
    </div>
  ))
)}


          <div onClick={() => navigate('/authority/complaints')} 
           style={{ textAlign: "center", paddingTop: 12, color: "#58a6ff", fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
            View All Complaints →
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div  style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Quick Actions</div>
        <div 
         style={styles.quickGrid}>
          <QuickCard onClick={() => navigate('/authority/complaints')}
           icon="📋" title="All Complaints" desc="View and manage all complaints"
            bg="linear-gradient(135deg, #1a2744, #0d1b33)" border="#1f6feb" titleColor="#58a6ff" />
          <QuickCard onClick={() => navigate('/authority/map')}
           icon="📍" title="Live Map" desc="View complaints on map"
            bg="linear-gradient(135deg, #0d2730, #071a20)" border="#00b4d8" titleColor="#00b4d8" />
          <QuickCard onClick={() => navigate('/authority/budget')}
           icon="💰" title="Budget & Fraud" desc="Budget overview and fraud detection"
            bg="linear-gradient(135deg, #0d2d14, #071a0c)" border="#3fb950" titleColor="#3fb950" />
          <QuickCard onClick={() => navigate('/authority/complaints')}
           icon="📊" title="Export Report" desc="Download reports and analytics"
            bg="linear-gradient(135deg, #1e1033, #100820)" border="#8957e5" titleColor="#a78bfa" />
        </div>
      </div>
    </div>
  );
}