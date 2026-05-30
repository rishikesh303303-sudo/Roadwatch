import { useState, useEffect } from "react";
import { complaintsAPI } from '../../utils/api';


const ACTION_STYLES = {
  "Acknowledge": { color: "#58a6ff", border: "#1f6feb", bg: "transparent" },
  "In Progress": { color: "#d2a8ff", border: "#6e40c9", bg: "transparent" },
  "Resolve":     { color: "#3fb950", border: "#238636", bg: "#1a4726" },
  "Reject":      { color: "#f85149", border: "#c0392b", bg: "transparent" },
};

const STATUS_TABS = [
  { label: "Pending", icon: "🕐", activeColor: "#ffa657", activeBg: "rgba(255,166,87,0.15)", activeBorder: "#ffa657" },
  { label: "Acknowledged", icon: "🔔", activeColor: "#58a6ff", activeBg: "rgba(88,166,255,0.1)", activeBorder: "#1f6feb" },
  { label: "In Progress", icon: "👤", activeColor: "#d2a8ff", activeBg: "rgba(138,43,226,0.15)", activeBorder: "#6e40c9" },
  { label: "Resolved", icon: "✅", activeColor: "#3fb950", activeBg: "rgba(63,185,80,0.1)", activeBorder: "#238636" },
  { label: "Rejected", icon: "❌", activeColor: "#f85149", activeBg: "rgba(248,81,73,0.1)", activeBorder: "#c0392b" },
];

const TrustBar = ({ score }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "8px 0" }}>
    <span style={{ fontSize: 12, color: "#8b949e", minWidth: 72 }}>Trust Score</span>
    <div style={{
      flex: 1, height: 7, background: "#21262d", borderRadius: 4, overflow: "hidden",
    }}>
      <div style={{
        width: `${score}%`, height: "100%", borderRadius: 4,
        background: score >= 80 ? "#3fb950" : score >= 60 ? "#3fb950" : "#ffa657",
      }} />
    </div>
    <span style={{ fontSize: 13, color: "#e6edf3", minWidth: 36 }}>{score}%</span>
  </div>
);

const ImagePlaceholder = ({ beforeUrl, afterUrl }) => (
  <div style={{ display: 'flex', gap: 8, width: '100%', maxWidth: 200, height: 140, flexShrink: 0 }}>
    {/* BEFORE */}
    <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden', background: '#1c2128', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <span style={{ position: 'absolute', top: 4, left: 4, fontSize: 9, background: '#f97316', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>BEFORE</span>
      {beforeUrl
        ? <img src={beforeUrl} alt="before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ fontSize: 10, color: '#8b949e' }}>No Photo</span>
      }
    </div>

    {/* AFTER */}
    {afterUrl && (
      <div style={{ flex: 1, borderRadius: 8, overflow: 'hidden', background: '#142920', border: '1px solid rgba(63,185,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ position: 'absolute', top: 4, left: 4, fontSize: 9, background: '#3fb950', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>AFTER</span>
        <img src={afterUrl} alt="after" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    )}
  </div>
);

export default function AuthorityComplaints() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severity, setSeverity] = useState("All Severity");
  const [sort, setSort] = useState("Newest First");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

useEffect(() => {
  fetch('http://localhost:8000/api/complaints/authority/all')
    .then(res => res.json())
    .then(data => {
      setComplaints(data.data || []);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);
const updateStatus = async (id, action) => {
  if (action === 'approved') {
    await complaintsAPI.updateStatus(id, 'Resolved');
    setComplaints(prev => prev.map(c => c.id === id ? {...c, status: 'Resolved', fix_status: 'approved'} : c));
  } else if (action === 'rejected') {
    await complaintsAPI.updateStatus(id, 'rejected');
    setComplaints(prev => prev.map(c => c.id === id ? {...c, fix_status: 'rejected'} : c));
  } else if (action === 'Reject') {
    await complaintsAPI.updateStatus(id, 'Rejected');
    setComplaints(prev => prev.map(c => c.id === id ? {...c, status: 'Rejected'} : c));
  } else {
    await complaintsAPI.updateStatus(id, action);
    setComplaints(prev => prev.map(c => c.id === id ? {...c, status: action} : c));
  }
};

  return (
    <div style={{
      background: "#0d1117", color: "#e6edf3",
      fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", padding: "0 0 40px",
    }}>
      {/* HEADER */}
      <div style={{
      background: "#0d1117", padding: "14px 16px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: "1px solid #21262d",
      flexWrap: "wrap", gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#e6edf3" }}>Incoming Complaints</span>
          <span style={{
            background: "#21262d", border: "1px solid #30363d",
            borderRadius: 6, padding: "3px 12px", fontSize: 13, color: "#8b949e",
          }}>{complaints.length} complaints</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: 13, color: "#8b949e" }}>Madhya Pradesh &nbsp;|&nbsp; PWD</span>
          <button style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "transparent", border: "1px solid #30363d",
            borderRadius: 8, padding: "8px 16px", color: "#e6edf3",
            fontSize: 13, cursor: "pointer", fontWeight: 500,
          }}>
            ⬇ Export CSV
          </button>
        </div>
      </div>
      <div style={{ padding: "20px 28px", maxWidth: "100%", margin: "0 auto" }}>

        {/* STATUS TABS */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto", paddingBottom: 4 }}>
          {STATUS_TABS.map(tab => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                  cursor: "pointer", transition: "all 0.15s",
                  background: isActive ? tab.activeBg : "transparent",
                  border: isActive ? `1.5px solid ${tab.activeBorder}` : "1.5px solid #30363d",
                  color: isActive ? tab.activeColor : "#8b949e",
                }}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            );
          })}
        </div>

        {/* FILTERS ROW */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <select
            value={severity}
            onChange={e => setSeverity(e.target.value)}
            style={{
              background: "#161b22", border: "1px solid #30363d", borderRadius: 8,
              color: "#e6edf3", padding: "9px 14px", fontSize: 13, cursor: "pointer",
              minWidth: 150,
            }}
          >
            {["All Severity", "Critical", "High", "Medium", "Low"].map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              background: "#161b22", border: "1px solid #30363d", borderRadius: 8,
              color: "#e6edf3", padding: "9px 14px", fontSize: 13, cursor: "pointer",
              minWidth: 160,
            }}
          >
            {["Newest First", "Oldest First", "Most Supporters", "Highest Trust"].map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{
              position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
              color: "#8b949e", fontSize: 14,
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Complaint title ya location se dhundho..."
              style={{
                width: "100%", background: "#161b22", border: "1px solid #30363d",
                borderRadius: 8, color: "#e6edf3", padding: "9px 14px 9px 36px",
                fontSize: 13, outline: "none",
              }}
            />
          </div>
        </div>

        {/* COMPLAINT CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {loading ? (
  <div style={{ textAlign: 'center', color: '#8b949e', padding: 40 }}>
    Loading complaints...
  </div>
) : complaints.length === 0 ? (
  <div style={{ textAlign: 'center', color: '#8b949e', padding: 40 }}>
    No complaints found
  </div>
) : complaints
  .filter(c => {
  if (activeTab === 'Pending') return c.status === 'Pending'
  if (activeTab === 'Acknowledged') return c.status === 'Acknowledge'
  if (activeTab === 'In Progress') return c.status === 'In Progress'
  if (activeTab === 'Resolved') return c.status === 'Resolved'
  if (activeTab === 'Rejected') return c.status === 'Rejected'
  return true
})
  .filter(c => search === '' || c.description?.toLowerCase().includes(search.toLowerCase()))
  .map((c, idx) => (
            <div key={c.id}>
              {/* ESCALATED BANNER */}
              {c.escalated && (
                <div style={{
                  background: "linear-gradient(90deg, #2d0a0a, #1a0505)",
                  border: "1.5px solid #f85149", borderBottom: "none",
                  borderRadius: "10px 10px 0 0",
                  padding: "9px 16px",
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 13, fontWeight: 600, color: "#f85149",
                }}>
                  🔥 {c.escalatedLabel}
                </div>
              )}

              {/* MAIN CARD */}
              <div style={{
                background: "#161b22",
                border: c.escalatedBorder
                  ? `1.5px solid ${c.id === 3 ? "#d29922" : "#f85149"}`
                  : "1px solid #21262d",
                borderRadius: c.escalated ? "0 0 10px 10px" : 10,
               padding: "14px 16px",
display: "flex", gap: 18, alignItems: "flex-start",
flexWrap: "wrap",
              }}>
                <ImagePlaceholder beforeUrl={c.image_url} afterUrl={c.fix_image_url} />

                <div style={{ flex: 1 }}>
                  {/* Title row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 17, fontWeight: 700, color: "#e6edf3" }}>{c.description || 'Road Complaint'}</span>
                    <span style={{
                      padding: "4px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700,
                      background: c.severityBg, color: c.severityColor,
                      border: `1px solid ${c.severityColor}`,
                    }}>{c.is_fraud ? 'Flagged' : 'Pending'}</span>
                  </div>

                  {/* Location & Time */}
                  <div style={{ display: "flex", gap: 18, fontSize: 12, color: "#8b949e", marginBottom: 10 }}>
                   <span>📍 {c.road_name || 'Location N/A'}</span>
                   <span>🕐 {new Date(c.created_at).toLocaleDateString('en-IN')}</span>
                  </div>

                  {/* Badges */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 10 }}>
                    <span style={{ padding: "3px 11px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#d29922", background: "rgba(210,153,34,0.18)", border: "1px solid rgba(210,153,34,0.4)" }}>{c.status}</span>
{c.is_fraud && <span style={{ padding: "3px 11px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#ffa657", background: "rgba(255,166,87,0.15)", border: "1px solid rgba(255,166,87,0.4)" }}>⚠ Fraud Flag</span>}
{!c.is_fraud && <span style={{ padding: "3px 11px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: "#3fb950", background: "rgba(63,185,80,0.15)", border: "1px solid rgba(63,185,80,0.4)" }}>✅ AI Verified</span>}
                    
                  </div>

                  {/* Trust Score */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: "#8b949e", minWidth: 72 }}>Trust Score</span>
                    <div style={{ flex: 1, height: 7, background: "#21262d", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{
                        width: `${c.trustScore}%`, height: "100%", borderRadius: 4,
                        background: "#3fb950",
                      }} />
                    </div>
                    <span style={{ fontSize: 13, color: "#e6edf3", minWidth: 36 }}>{c.trustScore}%</span>
                    <span style={{ fontSize: 13, color: "#58a6ff", marginLeft: 8 }}>
                      👍 {c.supporters}
                    </span>
                  </div>

                 {/* Action Buttons */}
<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  {/* Agar contractor ne photo upload ki hai toh Approve/Reject dikhao */}
  {c.fix_image_url && c.fix_status !== 'approved' ? (
    <>
      <button onClick={() => updateStatus(c.id, 'approved')} style={{
        padding: "7px 18px", borderRadius: 7, fontSize: 13, fontWeight: 500,
        cursor: "pointer", background: "#1a4726", border: "1.5px solid #238636", color: "#3fb950"
      }}>✅ Approve Fix</button>
      <button onClick={() => updateStatus(c.id, 'rejected')} style={{
        padding: "7px 18px", borderRadius: 7, fontSize: 13, fontWeight: 500,
        cursor: "pointer", background: "transparent", border: "1.5px solid #c0392b", color: "#f85149"
      }}>❌ Reject Fix</button>
    </>
  ) : (
    ['Acknowledge', 'Resolve', 'Reject'].map(action => {
      const s = ACTION_STYLES[action];
      return (
        <button key={action} 
          onClick={() => updateStatus(c.id, action)}
          style={{
            padding: "7px 18px", borderRadius: 7, fontSize: 13, fontWeight: 500,
            cursor: "pointer", transition: "opacity 0.15s",
            background: s.bg, border: `1.5px solid ${s.border}`, color: s.color,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >{action}</button>
      );
    })
  )}
 </div>
  </div>
    </div>
      </div>
        ))}
        </div>

        
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, marginTop: 28,
        }}>
          {["«", "‹", 1, 2, 3, "...", 13, "›", "»"].map((p, i) => {
            const isActive = p === page;
            const isDisabled = p === "«" || p === "‹";
            return (
              <button key={i}
                onClick={() => typeof p === "number" && setPage(p)}
                style={{
                  width: 34, height: 34, borderRadius: 7, fontSize: 13,
                  cursor: typeof p === "number" ? "pointer" : "default",
                  background: isActive ? "#1f6feb" : "transparent",
                  border: isActive ? "1.5px solid #1f6feb" : "1.5px solid #30363d",
                  color: isActive ? "#fff" : "#8b949e",
                  fontWeight: isActive ? 700 : 400,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >{p}</button>
            );
          })}
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: "#8b949e", marginTop: 8 }}>
          Showing 1 to 5 of {complaints.length} complaints
        </div>
      </div>
    </div>
  );
}