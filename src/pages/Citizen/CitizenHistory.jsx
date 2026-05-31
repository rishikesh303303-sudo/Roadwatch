import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintsAPI } from '../../utils/api';
import {
  FaRoad, FaHouseUser, FaChevronDown, FaArrowLeft, FaUserCircle,
  FaMapMarkerAlt, FaExclamationTriangle, FaCheckCircle, FaClock,
  FaFilter, FaSearch, FaImage, FaFlag, FaInfoCircle, FaSyncAlt
} from 'react-icons/fa';

const STATUS_CONFIG = {
  Pending:     { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  icon: <FaClock />,                   label: 'Pending' },
  Flagged:     { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   icon: <FaFlag />,                    label: 'Flagged' },
  Resolved:    { color: '#00ff88', bg: 'rgba(0,255,136,0.1)',   border: 'rgba(0,255,136,0.3)',   icon: <FaCheckCircle />,             label: 'Resolved' },
  Rejected:    { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   icon: <FaExclamationTriangle />,     label: 'Rejected' },
  Acknowledge: { color: '#00d2ff', bg: 'rgba(0,210,255,0.1)',   border: 'rgba(0,210,255,0.3)',   icon: <FaInfoCircle />,              label: 'Acknowledged' },
  default:     { color: '#00d2ff', bg: 'rgba(0,210,255,0.1)',   border: 'rgba(0,210,255,0.3)',   icon: <FaInfoCircle />,              label: 'Unknown' },
};

const ISSUE_LABELS = {
  pothole:  'Pothole / गड्ढे',
  damaged:  'Damaged Road / क्षतिग्रस्त सड़क',
  water:    'Water Logging / जलभराव',
  footpath: 'Broken Footpath / टूटी फुटपाथ',
  other:    'Other Issue / अन्य समस्याएं',
};

function getStatus(s) {
  return STATUS_CONFIG[s] || STATUS_CONFIG.default;
}

function formatDate(str) {
  if (!str) return '—';
  const d = new Date(str);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function ComplaintCard({ complaint, index }) {
  const [expanded, setExpanded] = useState(false);
  const st = getStatus(complaint.status);
  const desc = complaint.description || '';
  const issueRaw = desc.includes(':') ? desc.split(':')[0].trim() : '';
  const issueLabel = ISSUE_LABELS[issueRaw] || issueRaw || 'Road Issue';
  const descText = desc.includes(':') ? desc.split(':').slice(1).join(':').trim() : desc;

  return (
    <div
      style={{
        background: 'rgba(6,21,38,0.7)',
        border: `1px solid ${expanded ? st.border : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px',
        padding: '18px 20px',
        transition: 'border 0.3s, box-shadow 0.3s',
        boxShadow: expanded ? `0 0 20px ${st.bg}` : 'none',
        animationDelay: `${index * 60}ms`,
      }}
      className="complaint-card"
    >
      {/* TOP ROW */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
          {/* Index badge */}
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
            background: st.bg, border: `1px solid ${st.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: st.color, fontSize: '13px'
          }}>
            {st.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {issueLabel || 'Road Complaint'}
            </p>
            <p style={{ fontSize: '10px', color: '#90a0b2', margin: '2px 0 0' }}>
              ID: {complaint.id?.slice(0, 8).toUpperCase() || '—'} &nbsp;•&nbsp; {formatDate(complaint.created_at)}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Status badge */}
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em',
            color: st.color, background: st.bg, border: `1px solid ${st.border}`,
            padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: st.color, display: 'inline-block' }}></span>
            {complaint.status || 'Unknown'}
          </span>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#90a0b2', borderRadius: '8px', width: '28px', height: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '11px',
              transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s'
            }}
          >
            <FaChevronDown />
          </button>
        </div>
      </div>

      {/* EXPANDED DETAILS */}
     {expanded && (
  <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

    
    {complaint.image_url && (
      <div>
        <p style={{ fontSize: '10px', color: '#90a0b2', margin: '0 0 6px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>📸 Complaint Photo</p>
        <div style={{ width: '100%', maxWidth: '300px', height: '160px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#020b14' }}>
         {complaint.image_url ? (
  <img src={complaint.image_url.startsWith('http') 
    ? complaint.image_url 
    :`${import.meta.env.VITE_API_URL}/uploads/${complaint.image_url}`}
    alt="complaint" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
) : (
  <FaImage style={{ color: '#90a0b2', fontSize: '32px' }} />
)}
        </div>
      </div>
    )}

    {/* Description */}
    {descText && (
      <div>
        <p style={{ fontSize: '10px', color: '#90a0b2', margin: '0 0 4px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Description</p>
        <p style={{ fontSize: '12px', color: '#cdd5e0', margin: 0, lineHeight: 1.6 }}>{descText}</p>
      </div>
    )}

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

      {/* Road Name */}
      {complaint.road_name && (
        <div style={{ background: 'rgba(0,210,255,0.05)', border: '1px solid rgba(0,210,255,0.1)', borderRadius: '8px', padding: '10px 12px' }}>
          <p style={{ fontSize: '9px', color: '#90a0b2', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>🛣️ Road</p>
          <p style={{ fontSize: '11px', color: '#fff', margin: 0, fontWeight: 600 }}>{complaint.road_name}</p>
        </div>
      )}

      {/* Contractor */}
      {complaint.contractor_name && (
        <div style={{ background: 'rgba(0,210,255,0.05)', border: '1px solid rgba(0,210,255,0.1)', borderRadius: '8px', padding: '10px 12px' }}>
          <p style={{ fontSize: '9px', color: '#90a0b2', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>👷 Contractor</p>
          <p style={{ fontSize: '11px', color: '#fff', margin: 0, fontWeight: 600 }}>{complaint.contractor_name}</p>
        </div>
      )}

      {/* Date */}
      <div style={{ background: 'rgba(0,210,255,0.05)', border: '1px solid rgba(0,210,255,0.1)', borderRadius: '8px', padding: '10px 12px' }}>
        <p style={{ fontSize: '9px', color: '#90a0b2', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>📅 Filed On</p>
        <p style={{ fontSize: '11px', color: '#fff', margin: 0, fontWeight: 600 }}>{formatDate(complaint.created_at)}</p>
      </div>

      {/* Location */}
      {(complaint.latitude || complaint.longitude) && (
        <div style={{ background: 'rgba(0,210,255,0.05)', border: '1px solid rgba(0,210,255,0.1)', borderRadius: '8px', padding: '10px 12px' }}>
          <p style={{ fontSize: '9px', color: '#90a0b2', margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>📍 Location</p>
          <p style={{ fontSize: '11px', color: '#fff', margin: 0, fontWeight: 600 }}>{complaint.latitude?.toFixed(4)}, {complaint.longitude?.toFixed(4)}</p>
        </div>
      )}

    </div>

    {/* Road Type */}
    {complaint.road_type && (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '10px', background: 'rgba(0,210,255,0.1)', border: '1px solid rgba(0,210,255,0.2)', color: '#00d2ff', padding: '3px 10px', borderRadius: '20px', fontWeight: 700 }}>
          {complaint.road_type}
        </span>
      </div>
    )}
    {/* Resolved Notification */}
{complaint.status === 'Resolved' && (
  <div style={{
    background: 'rgba(63,185,80,0.1)',
    border: '1px solid rgba(63,185,80,0.3)',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#00ff88',
    fontSize: 12,
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 8
  }}>
    ✅ Your problem on <strong>{complaint.road_name || 'this road'}</strong> is Resolved!
  </div>
)}

{/* Before/After Photos */}
{complaint.fix_image_url && (
  <div>
    <p style={{ fontSize: '10px', color: '#90a0b2', margin: '0 0 6px', fontWeight: 600, textTransform: 'uppercase' }}>Before / After</p>
    <div style={{ display: 'flex', gap: 8 }}>
      <div style={{ width: 120, height: 80, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 2, left: 2, background: '#f97316', color: '#fff', fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3, zIndex: 1 }}>BEFORE</div>
        {complaint.image_url
          ? <img src={complaint.image_url} alt="before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', background: '#020b14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#90a0b2' }}>No Photo</div>
        }
      </div>
      <div style={{ width: 120, height: 80, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(63,185,80,0.3)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 2, left: 2, background: '#3fb950', color: '#fff', fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 3, zIndex: 1 }}>AFTER</div>
        <img src={complaint.fix_image_url} alt="after" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  </div>
)}
    {/* Fraud info */}
    {complaint.is_fraud && (
      <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
        <FaExclamationTriangle style={{ color: '#ef4444', fontSize: '12px', marginTop: '2px', flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', margin: '0 0 2px' }}>⚠️ Fraud Detected</p>
          <p style={{ fontSize: '10px', color: '#90a0b2', margin: 0 }}>{complaint.fraud_reason || 'Suspicious activity detected'}</p>
        </div>
      </div>
    )}

  </div>
)}


    </div>
  );
}

export default function CitizenHistory() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [lang, setLang] = useState('en');

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/complaints/authority/all`)
      const data = await res.json();
      if (data.data) {
        setComplaints(data.data);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      setError('Failed to load complaints. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchComplaints();
}, []);
  const filtered = complaints.filter(c => {
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchSearch = search === '' ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.id?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
  All: complaints.length,
  Pending: complaints.filter(c => c.status === 'Pending').length,
  Resolved: complaints.filter(c => c.status === 'Resolved').length,
  Flagged: complaints.filter(c => c.status === 'Flagged').length,
  Rejected: complaints.filter(c => c.status === 'Rejected').length,
};

  return (
    <div style={{ minHeight: '100vh', background: '#020b14', backgroundImage: 'radial-gradient(circle at 50% 0%, #07223d 0%, #020b14 70%)', color: '#fff', padding: '16px 20px', fontFamily: 'sans-serif' }}>

      <style>{`
        .complaint-card { animation: fadeUp 0.4s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .filter-btn:hover { background: rgba(0,210,255,0.1) !important; border-color: rgba(0,210,255,0.4) !important; }
      `}</style>

      {/* HEADER */}
      <header style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px', background: 'rgba(3,16,31,0.8)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '14px', marginBottom: '20px', backdropFilter: 'blur(12px)', gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #005f73, #00d2ff)', width: '42px', height: '42px',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', boxShadow: '0 0 15px rgba(0,210,255,0.3)'
          }}>
            <FaRoad />
          </div>
          <h1 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Road e-Complaint Portal</h1>
        </div>

        <span
          onClick={() => navigate('/citizen')}
          style={{ color: '#00d2ff', fontSize: '13px', fontWeight: 600, borderBottom: '2px solid #00d2ff', paddingBottom: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <FaHouseUser /> Home / शिकायत दर्ज करें
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['en', 'hi'].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              background: lang === l ? 'rgba(0,210,255,0.1)' : 'transparent',
              border: `1px solid ${lang === l ? '#00d2ff' : 'rgba(255,255,255,0.1)'}`,
              color: lang === l ? '#00d2ff' : '#90a0b2',
              padding: '5px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer', fontWeight: lang === l ? 700 : 400
            }}>{l === 'en' ? 'English' : 'हिंदी'}</button>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', marginLeft: '8px' }}>
            <FaUserCircle style={{ color: '#00d2ff', fontSize: '20px' }} />
            <span>Rishi</span>
            <FaChevronDown style={{ fontSize: '10px' }} />
          </div>
        </div>
      </header>

      {/* BACK + TITLE */}
      <div style={{ maxWidth: '1100px', margin: '0 auto 20px' }}>
        <button onClick={() => navigate('/citizen')} style={{
          background: 'none', border: 'none', color: '#00d2ff', fontSize: '12px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px'
        }}>
          <FaArrowLeft /> Back to Home
        </button>

        <div style={{
          background: 'linear-gradient(90deg, #031424, transparent)',
          border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px',
          padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'
        }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#00d2ff', margin: '0 0 4px' }}>My Reported Complaints</h2>
            <p style={{ fontSize: '12px', color: '#90a0b2', margin: 0 }}>Track all your submitted road complaints</p>
          </div>
          <button onClick={fetchComplaints} style={{
            background: 'rgba(0,210,255,0.08)', border: '1px solid rgba(0,210,255,0.3)',
            color: '#00d2ff', borderRadius: '10px', padding: '8px 16px', fontSize: '12px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600
          }}>
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>

      {/* MAIN */}
      <main style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* STATS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { label: 'Total', count: counts.All, color: '#00d2ff' },
            { label: 'Pending', count: counts.Pending, color: '#f59e0b' },
            { label: 'Resolved', count: counts.Resolved, color: '#00ff88' },
            { label: 'Flagged', count: counts.Flagged, color: '#ef4444' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(6,21,38,0.7)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '14px 18px'
            }}>
              <p style={{ fontSize: '22px', fontWeight: 800, color: s.color, margin: '0 0 2px' }}>{s.count}</p>
              <p style={{ fontSize: '11px', color: '#90a0b2', margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#90a0b2', fontSize: '12px' }} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', background: 'rgba(2,11,20,0.8)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', padding: '9px 12px 9px 34px', fontSize: '12px', color: '#fff',
                outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Status filters */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
           {['All', 'Pending', 'Resolved', 'Flagged', 'Rejected'].map(s => {
              const active = statusFilter === s;
              const cfg = getStatus(s);
              return (
                <button
                  key={s}
                  className="filter-btn"
                  onClick={() => setStatusFilter(s)}
                  style={{
                    background: active ? cfg.bg : 'rgba(6,21,38,0.7)',
                    border: `1px solid ${active ? cfg.border : 'rgba(255,255,255,0.1)'}`,
                    color: active ? cfg.color : '#90a0b2',
                    borderRadius: '8px', padding: '7px 14px', fontSize: '11px',
                    cursor: 'pointer', fontWeight: active ? 700 : 400, transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '5px'
                  }}
                >
                  <FaFilter style={{ fontSize: '9px' }} /> {s} ({counts[s] ?? complaints.length})
                </button>
              );
            })}
          </div>
        </div>

        {/* COMPLAINTS LIST */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#90a0b2' }}>
            <FaSyncAlt style={{ fontSize: '24px', marginBottom: '12px', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: '13px' }}>Loading complaints...</p>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div style={{
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '12px', padding: '20px', textAlign: 'center', color: '#ef4444', fontSize: '13px'
          }}>
            ⚠️ {error}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            background: 'rgba(6,21,38,0.7)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px', padding: '50px 20px', textAlign: 'center'
          }}>
            <FaInfoCircle style={{ fontSize: '32px', color: '#90a0b2', marginBottom: '12px' }} />
            <p style={{ fontSize: '14px', color: '#90a0b2', margin: 0 }}>No complaints found</p>
            <button onClick={() => navigate('/citizen/complaint')} style={{
              marginTop: '16px', background: '#00d2ff', border: 'none', color: '#000',
              padding: '10px 22px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer'
            }}>
              + File a Complaint
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((c, i) => (
              <ComplaintCard key={c.id || i} complaint={c} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ maxWidth: '1100px', margin: '30px auto 0', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#90a0b2', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <FaInfoCircle style={{ color: '#00d2ff' }} />
          Your complaint will be forwarded to the concerned department for action. / आपकी शिकायत संबंधित विभाग को कार्रवाई के लिए भेज दी जाएगी।
        </p>
      </footer>
    </div>
  );
}