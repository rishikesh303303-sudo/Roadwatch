import React, { useState, useEffect } from "react";
import { User, X, MapPin, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

const SEV = {
  critical: { color: "#ef4444", label: "Critical", icon: "⊗" },
  high:     { color: "#f97316", label: "High",     icon: "⚠" },
  medium:   { color: "#eab308", label: "Medium",   icon: "△" },
  low:      { color: "#22c55e", label: "Low",      icon: "○" },
};

const STATUS_COLORS = {
  Pending:    { color: "#eab308", bg: "#422006" },
  InProgress: { color: "#3b82f6", bg: "#1e3a5f" },
  Resolved:   { color: "#22c55e", bg: "#14532d" },
  Escalated:  { color: "#ef4444", bg: "#450a0a" },
};

const getCustomIcon = (severity, isSelected) => {
  const cfg = SEV[severity] || SEV.low;
  const size = isSelected ? 32 : 24;
  const html = `
    <div style="
      background-color: ${cfg.color}; 
      width: ${size}px; 
      height: ${size}px; 
      border-radius: 50%; 
      border: ${isSelected ? '3px solid white' : '2px solid rgba(255,255,255,0.8)'}; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      color: white; 
      font-weight: bold; 
      font-size: ${isSelected ? '16px' : '12px'}; 
      box-shadow: 0 0 ${isSelected ? '20px' : '8px'} ${cfg.color};
      transition: all 0.3s ease;
    ">
      ${cfg.icon}
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function CitizenMyComplaints() {
  const [complaints, setComplaints]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [selected, setSelected]             = useState(null);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter]     = useState("All");
  const [dateFilter, setDateFilter]         = useState("All Time");
  const [showEscalated, setShowEscalated]   = useState(false);
  const [showCritical, setShowCritical]     = useState(false);
  const [autoRefresh, setAutoRefresh]       = useState(true);
  const [activeBottom, setActiveBottom]     = useState(null);

  const [mapCenter, setMapCenter] = useState([23.2350, 77.4100]);
  const [mapZoom, setMapZoom] = useState(12);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
    const response = await fetch("http://localhost:8000/api/complaints/all");
        const result = await response.json();

        if (result.status === "success" && result.data) {
          const formattedData = result.data
            .filter(item => item.latitude && item.longitude)
            .map(item => ({
              id: item.id,
              lat: item.latitude,
              lng: item.longitude,
              severity: item.is_fraud ? "low" : "high", 
              title: item.description ? item.description.substring(0, 35) + "..." : "Road Infrastructure Issue",
              location: item.road_name || "Bhopal, Madhya Pradesh",
              supporters: Math.floor(Math.random() * 20) + 1,
              status: item.status || "Pending",
              escalated: false,
              roadType: item.road_type || "Unknown",
              road: item.road_name || "Unknown Road",
              contractor: item.contractor_name || "Pending Assignment",
              filed: new Date(item.created_at).toLocaleDateString() || "Recently",
              trust: item.fraud_score ? Math.round((1 - item.fraud_score) * 100) : 95,
              aiVerified: true, 
              fraudFlag: item.is_fraud || false,
              imageUrl: item.image_url
            }));
          
          setComplaints(formattedData);
        }
      } catch (error) {
        console.error("❌ Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
  }, []);

  //  3. FILTER LOGIC UPDATED TO USE 'complaints' STATE 
  const filtered = complaints.filter(c => {
    if (severityFilter !== "All" && c.severity !== severityFilter.toLowerCase()) return false;
    if (statusFilter   !== "All" && c.status    !== statusFilter)                return false;
    if (showEscalated  && !c.escalated)                return false;
    if (showCritical   && c.severity !== "critical")   return false;
    return true;
  });

  const counts = {
    critical:  complaints.filter(c => c.severity === "critical").length,
    high:      complaints.filter(c => c.severity === "high").length,
    medium:    complaints.filter(c => c.severity === "medium").length,
    low:       complaints.filter(c => c.severity === "low").length,
    escalated: complaints.filter(c => c.escalated).length,
    total:     complaints.length,
  };

  useEffect(() => {
    if (selected) {
      setMapCenter([selected.lat, selected.lng]);
      setMapZoom(17);
    }
  }, [selected]);

  const handleStat = (key) => {
    if (activeBottom === key) {
      setActiveBottom(null);
      if (key === "critical")  { setShowCritical(false);  setSeverityFilter("All"); }
      if (key === "high")      { setSeverityFilter("All"); }
      if (key === "medium")    { setSeverityFilter("All"); }
      if (key === "low")       { setSeverityFilter("All"); }
      if (key === "escalated") { setShowEscalated(false); }
      if (key === "total")     { setSeverityFilter("All"); setStatusFilter("All"); setShowCritical(false); setShowEscalated(false); }
    } else {
      setActiveBottom(key);
      setSeverityFilter("All"); setStatusFilter("All"); setShowCritical(false); setShowEscalated(false);
      if (key === "critical")  setSeverityFilter("Critical");
      if (key === "high")      setSeverityFilter("High");
      if (key === "medium")    setSeverityFilter("Medium");
      if (key === "low")       setSeverityFilter("Low");
      if (key === "escalated") setShowEscalated(true);
    }
  };

  const S = {
    wrap:  { background:"#0d1117", color:"#e6edf3", fontFamily:"'Segoe UI',sans-serif", minHeight:"100vh", display:"flex", flexDirection:"column", fontSize:13 },
    bar:   { background:"#161b22", borderBottom:"1px solid #30363d", padding:"8px 16px", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" },
  };

  // ── 4. LOADING STATE HANDLER ──
  if (loading) {
    return (
      <div style={S.wrap} className="justify-center items-center">
        <div className="text-[#00d2ff] font-bold text-xl animate-pulse">Initializing Live Radar Data...</div>
      </div>
    );
  }

  return (
    <div style={S.wrap}>
      {/* ── TOPBAR ── */}
      <div style={S.bar}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:"#2563eb", display:"flex", alignItems:"center", justifyContent:"center", color:"white" }}>
            <User size={16} />
          </div>
          <span style={{ fontWeight:700, fontSize:15 }}>My Personal Complaints Radar</span>
        </div>
        <div style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:6, padding:"4px 12px", fontSize:13, color:"#00d2ff", fontWeight:"bold" }}>
          Citizen: Rishi
        </div>
        <span style={{ color:"#6b7280" }}>Tracking {filtered.length} of your reported issues</span>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ color:"#9ca3af" }}>Auto Refresh: <span style={{ color: autoRefresh ? "#22c55e":"#ef4444" }}>{autoRefresh?"ON":"OFF"}</span></span>
          <div onClick={() => setAutoRefresh(p=>!p)} style={{ width:44, height:24, borderRadius:12, background: autoRefresh?"#22c55e":"#374151", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
            <div style={{ position:"absolute", top:2, left: autoRefresh?22:2, width:20, height:20, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }} />
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div style={{ background:"#161b22", borderBottom:"1px solid #30363d", padding:"8px 16px", display:"flex", gap:12, alignItems:"center", flexWrap:"wrap", zIndex: 10 }}>
        {/* Severity */}
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ color:"#9ca3af", fontSize:12 }}>🔥 Severity</span>
          <select value={severityFilter} onChange={e => {setSeverityFilter(e.target.value); setActiveBottom(null); setShowCritical(false);}}
            style={{ background:"#1f2937", border:"1px solid #374151", color: severityFilter!=="All" ? SEV[severityFilter.toLowerCase()]?.color||"#e6edf3" : "#e6edf3", borderRadius:6, padding:"4px 8px", fontSize:12, cursor:"pointer", outline: "none" }}>
            {["All","Critical","High","Medium","Low"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        {/* Status */}
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ color:"#9ca3af", fontSize:12 }}>☰ Status</span>
          <select value={statusFilter} onChange={e => {setStatusFilter(e.target.value); setActiveBottom(null); setShowEscalated(false);}}
            style={{ background:"#1f2937", border:"1px solid #374151", color: statusFilter!=="All" ? STATUS_COLORS[statusFilter]?.color||"#e6edf3" : "#e6edf3", borderRadius:6, padding:"4px 8px", fontSize:12, cursor:"pointer", outline: "none" }}>
            {["All","Pending","InProgress","Resolved","Escalated"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        {/* Date Range */}
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ color:"#9ca3af", fontSize:12 }}>📅 Timeline</span>
          <select value={dateFilter} onChange={e => setDateFilter(e.target.value)}
            style={{ background:"#1f2937", border:"1px solid #374151", color:"#e6edf3", borderRadius:6, padding:"4px 8px", fontSize:12, cursor:"pointer", outline: "none" }}>
            {["Today","This Week","This Month","All Time"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <button onClick={() => { setSeverityFilter("All"); setStatusFilter("All"); setShowEscalated(false); setShowCritical(false); setActiveBottom(null); setMapCenter([23.2350, 77.4100]); setMapZoom(12); setSelected(null); }}
          style={{ marginLeft:"auto", background:"transparent", border:"none", color:"#ef4444", cursor:"pointer", fontSize:12 }}>🔄 Reset Map</button>
      </div>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        <div style={{ flex:1, position:"relative", background:"#0d1117", overflow:"hidden" }}>
          
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            style={{ width: "100%", height: "100%", zIndex: 1 }}
            zoomControl={false}
          >
          
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              attribution='&copy; Google Maps'
            />
            
            <MapController center={mapCenter} zoom={mapZoom} />

            {filtered.map(c => {
              const isSel = selected?.id === c.id;
              return (
                <Marker 
                  key={c.id} 
                  position={[c.lat, c.lng]} 
                  icon={getCustomIcon(c.severity, isSel)}
                  eventHandlers={{
                    click: () => { setSelected(c); }
                  }}
                />
              );
            })}
          </MapContainer>

          {/* ── FLOATING OVERLAYS ── */}
          <div style={{ position:"absolute", top:16, left:16, background:"rgba(22,27,34,0.93)", border:"1px solid #30363d", borderRadius:8, padding:"12px 14px", fontSize:11, zIndex: 10 }}>
            <div style={{ fontWeight:600, marginBottom:10, color:"#e6edf3", display: "flex", alignItems: "center", gap: 6 }}>
              <Info size={14} className="text-[#00d2ff]" /> Severity Guide
            </div>
            {Object.entries(SEV).map(([k,v]) => (
              <div key={k} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:16, height:16, borderRadius:"50%", background:v.color, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ color:"#fff", fontSize:9, fontWeight: "bold" }}>{v.icon}</span>
                </div>
                <span style={{ color:"#e6edf3" }}>{v.label}</span>
              </div>
            ))}
          </div>

          <div style={{ position:"absolute", top:16, right:16, background:"rgba(0, 210, 255, 0.1)", border:"1px solid #00d2ff", borderRadius:6, padding:"6px 12px", fontSize:10, zIndex: 10, color: "#00d2ff", fontWeight: "bold", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", gap: 6 }}>
            <MapPin size={12} /> REAL-TIME SATELLITE UPLINK
          </div>
        </div>

        {/* RIGHT DETAIL PANEL */}
        {selected && (
          <div style={{ width:340, background:"#161b22", borderLeft:"1px solid #30363d", display:"flex", flexDirection:"column", overflowY:"auto", zIndex: 10, boxShadow: "-5px 0 20px rgba(0,0,0,0.5)" }}>
            
            <div style={{ position:"relative", background:"#111827", height:180, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", borderBottom: "1px solid #30363d" }}>
              <div style={{ width:"100%", height:"100%", background:`linear-gradient(135deg,${SEV[selected.severity].color}33,#111827)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:50 }}>
                
                 {selected.imageUrl ? (
                   <img src={`http://localhost:8000/static/${selected.imageUrl}`} alt="Evidence" style={{width: '100%', height: '100%', objectFit: 'cover'}} 
                   onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                 ) : null}
                 <span style={{display: selected.imageUrl ? 'none' : 'block'}}>📸</span>
              </div>
              <div onClick={() => {setSelected(null); setMapZoom(12);}} style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#e6edf3", border: "1px solid rgba(255,255,255,0.2)" }}>
                <X size={14} />
              </div>
              <div style={{ position:"absolute", bottom:8, left:8, background:"rgba(0,0,0,0.7)", padding:"4px 8px", borderRadius:"4px", fontSize:10, border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af" }}>
                My Uploaded Evidence
              </div>
            </div>

            <div style={{ padding:16, flex:1 }}>
              <div style={{ fontWeight:700, fontSize:16, color:"#e6edf3", marginBottom:6 }}>{selected.title}</div>
              <div style={{ display:"flex", alignItems:"flex-start", gap:6, marginBottom:12, color:"#9ca3af", fontSize:12, lineHeight: 1.4 }}>
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#00d2ff]" /> {selected.location}
              </div>

              {/* Tags */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                <span style={{ background: SEV[selected.severity].color+"22", color: SEV[selected.severity].color, border:`1px solid ${SEV[selected.severity].color}55`, borderRadius:4, padding:"3px 8px", fontSize:11, fontWeight:600 }}>
                  {SEV[selected.severity].label} Priority
                </span>
                <span style={{ background: STATUS_COLORS[selected.status]?.bg||"#1f2937", color: STATUS_COLORS[selected.status]?.color||"#9ca3af", borderRadius:4, padding:"3px 8px", fontSize:11, border:`1px solid ${STATUS_COLORS[selected.status]?.color||"#374151"}55` }}>
                  Status: {selected.status}
                </span>
                {selected.escalated && (
                  <span style={{ background:"#7c1d1d", color:"#f97316", borderRadius:4, padding:"3px 8px", fontSize:11, display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertTriangle size={12} /> Escalated
                  </span>
                )}
              </div>

              {/* Meta */}
              <div style={{ background: "#0d1117", borderRadius: 8, padding: 12, border: "1px solid #30363d", marginBottom: 16 }}>
                {[["🕐 Track ID", `#CMPL-${selected.id}829`],["📅 Filed", selected.filed],["🏢 Forwarded To", selected.contractor]].map(([l,v]) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:8, fontSize:12, borderBottom:"1px solid #30363d", paddingBottom: "6px", lastChild: { borderBottom: "none", paddingBottom: 0, marginBottom: 0 } }}>
                    <span style={{ color:"#9ca3af" }}>{l}</span>
                    <span style={{ color:"#00d2ff", fontWeight:500, textAlign:"right", maxWidth:160 }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{ background:"#1f2937", padding:"12px", borderRadius:"8px", border:"1px solid #374151" }}>
                <div style={{ fontSize: "11px", color:"#9ca3af", marginBottom:"6px", display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle size={12} className="text-[#22c55e]" /> Authority Response:
                </div>
                <p style={{ fontSize: "12px", color:"#e6edf3", margin:0, fontStyle:"italic", lineHeight: 1.5 }}>
                  {selected.status === "Resolved" 
                    ? `"The issue at ${selected.road} has been successfully repaired. Thank you for reporting."`
                    : `"Your complaint is acknowledged and assigned to the field team. We will update the status soon."`
                  }
                </p>
              </div>

              <button style={{ width:"100%", background:"transparent", border:"1px solid #3b82f6", color:"#3b82f6", borderRadius:6, padding:"10px 0", cursor:"pointer", fontSize:12, fontWeight:600, marginTop:16, transition: "background 0.2s" }} onMouseOver={e => e.target.style.background = 'rgba(59, 130, 246, 0.1)'} onMouseOut={e => e.target.style.background = 'transparent'}>
                Follow Up / Update Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM STATS ── */}
      <div style={{ background:"#161b22", borderTop:"1px solid #30363d", padding:"8px 16px", display:"flex", alignItems:"center", flexWrap:"wrap", zIndex: 10 }}>
        {[
          { key:"total",     icon:"👤", count: filtered.length,                                      total: counts.total,     label:"My Total Complaints", color:"#00d2ff" },
          { key:"critical",  icon:"⊗", count: filtered.filter(c=>c.severity==="critical").length,  total: counts.critical,  label:"Critical Cases",      color:"#ef4444" },
          { key:"high",      icon:"⚠", count: filtered.filter(c=>c.severity==="high").length,      total: counts.high,      label:"High Priority",       color:"#f97316" },
          { key:"medium",    icon:"△", count: filtered.filter(c=>c.severity==="medium").length,    total: counts.medium,    label:"Medium Priority",     color:"#eab308" },
          { key:"low",       icon:"○", count: filtered.filter(c=>c.severity==="low").length,       total: counts.low,       label:"Low / Resolved",      color:"#22c55e" },
        ].map(stat => (
          <div key={stat.key} onClick={() => handleStat(stat.key)}
            style={{ flex:1, minWidth:90, padding:"8px 10px", background: activeBottom===stat.key ? stat.color+"22" : "transparent", border: activeBottom===stat.key ? `1px solid ${stat.color}` : "1px solid transparent", borderRadius:8, cursor:"pointer", textAlign:"center", margin:"0 4px", transition:"all 0.2s" }}
            onMouseOver={e => { if (activeBottom !== stat.key) e.currentTarget.style.background = stat.color + "11"; }}
            onMouseOut={e => { if (activeBottom !== stat.key) e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <span style={{ color:stat.color, fontSize:16 }}>{stat.icon}</span>
              <span style={{ color:stat.color, fontSize:20, fontWeight:700 }}>{stat.count}</span>
              {stat.count !== stat.total && <span style={{ color:"#6b7280", fontSize:12 }}>/{stat.total}</span>}
            </div>
            <div style={{ color:"#9ca3af", fontSize:12, marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container { background-color: #0d1117; font-family: 'Segoe UI', sans-serif; }
        .custom-leaflet-icon { background: transparent; border: none; }
      `}} />
    </div>
  );
}