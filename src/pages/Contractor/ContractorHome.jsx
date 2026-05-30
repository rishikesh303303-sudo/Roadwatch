import { useNavigate, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, UploadCloud, Bell, CheckCircle2,
  AlertTriangle, X, DollarSign, Flag, ArrowRight,
  TrendingUp, Route, User, ArrowUpRight, Check, ListChecks
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';

// --- THEME & COLORS ---
const COLORS = {
  bg: '#060F1A',
  panelBg: '#0D192B',
  panelBorder: '#1C2B41',
  textMain: '#F8FAFC',
  textSub: '#9BA6B5',
  cardBlue: '#144C8F',
  cardTeal: '#105A7D',
  cardGreen: '#247E45',
  cardOrange: '#B45E16',
  cardRed: '#A31F2A',
  alertBg: '#B01D21',
  barBlue: '#1D4ED8',
  barGreen: '#15803D',
  barRed: '#B91C1C'
};


// --- COMPONENTS ---

const Panel = ({ children, className = '' }) => (
  <div className={`bg-[#0D192B] border border-[#1C2B41] rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon: Icon, label, value, bgClass, iconSize = 28 }) => (
  <div className={`flex items-center gap-4 p-5 rounded-xl shadow-md ${bgClass} border border-white/5`}>
    <div className="bg-white/10 p-3 rounded-full shrink-0">
      <Icon size={iconSize} className="text-white" />
    </div>
    <div>
      <p className="text-xs text-white/80 font-medium mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-white leading-none">{value}</h3>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-[#1e293b] p-3 rounded-lg shadow-xl text-xs min-w-[150px]">
        <p className="font-semibold text-white mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-[#3B82F6] flex justify-between gap-4"><span className="text-[#94A3B8]">Sanctioned:</span> ₹{payload[0].value} Cr</p>
          <p className="text-[#22C55E] flex justify-between gap-4"><span className="text-[#94A3B8]">Spent:</span> ₹{payload[1].value} Cr</p>
          {payload[2] && payload[2].value > 0 && (
            <p className="text-[#EF4444] flex justify-between gap-4"><span className="text-[#94A3B8]">Fraud Flag:</span> Yes</p>
          )}
        </div>
      </div>
    );
  }
  return null;
};


export default function ContractorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);


  
  const contractorName = localStorage.getItem('contractorName') || "Guest Contractor";
  const getInitialTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${date}, ${time}`;
  };
  const [loginTime] = useState(getInitialTime());
  const [realComplaints, setRealComplaints] = useState([])
  const [complaintsLoading, setComplaintsLoading] = useState(true)
  const [realRoads, setRealRoads] = useState([]);
  const [roadsLoading, setRoadsLoading] = useState(true);

useEffect(() => {
  fetch(`http://localhost:8000/api/roads/contractor/${encodeURIComponent(contractorName)}`)
    .then(r => r.json())
    .then(data => {
      setRealRoads(data.data || []);
      setRoadsLoading(false);
    })
    .catch(() => setRoadsLoading(false));
}, [contractorName]);

useEffect(() => {
  fetch(`http://localhost:8000/api/complaints/contractor/${encodeURIComponent(contractorName)}`)
    .then(r => r.json())
    .then(data => {
      setRealComplaints(data.data || [])
      setComplaintsLoading(false)
    })
    .catch(() => setComplaintsLoading(false))
}, [contractorName])

const chartData = realRoads.map(road => ({
    name: road.road_name?.split(' ')[0] || 'Road',
    sanctioned: parseFloat(road.budget_sanctioned || 0),
    spent: parseFloat(road.budget_spent || 0),
    fraud: realComplaints.filter(c => 
      c.road_name === road.road_name && c.is_fraud
    ).length > 0 ? parseFloat(road.budget_sanctioned || 0) : 0
  }));


  return (
    <div className="bg-[#060F1A] text-[#F8FAFC] min-h-screen font-sans overflow-x-hidden selection:bg-[#1D4ED8]/30">
      
      {/* HEADER */}
      <header className="border-b border-[#1C2B41] bg-[#0A1322] px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded border border-white/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
              <path d="M4 22h16"/><path d="m10 2 4 20"/><path d="m14 2-4 20"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Contractor Dashboard</h1>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{contractorName}</h3>
            <p className="text-[11px] text-[#9BA6B5]">Last login: {loginTime}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
            Online
          </div>
        </div>
      </header>

      <div className="max-w-[1500px] mx-auto p-4 md:p-6 space-y-6">
        
        {/* STATS ROW */}
       <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  <StatCard icon={Route} label="Total Roads" value={realRoads.length} bgClass="bg-[#144C8F]" />
  <StatCard icon={DollarSign} label="Total Sanctioned" value={`₹ ${realRoads.reduce((sum, r) => sum + parseFloat(r.budget_sanctioned || 0), 0).toFixed(2)} Cr`} bgClass="bg-[#105A7D]" />
  <StatCard icon={CheckCircle2} label="Total Spent" value={`₹ ${realRoads.reduce((sum, r) => sum + parseFloat(r.budget_spent || 0), 0).toFixed(2)} Cr`} bgClass="bg-[#247E45]" />
  <StatCard icon={AlertTriangle} label="Pending Complaints" value={realComplaints.filter(c => c.status === 'Acknowledge').length} bgClass="bg-[#B45E16]" />
  <StatCard icon={Flag} label="Fraud Flags" value={realComplaints.filter(c => c.is_fraud).length} bgClass="bg-[#A31F2A]" />
</div>

       {/* ALERT BANNER */}
{realComplaints.filter(c => c.is_fraud).slice(0, 1).map(c => (
  <motion.div
    key={c.id}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-[#B01D21] rounded-xl p-3 flex justify-between items-center shadow-lg border border-red-500/50"
  >
    <div className="flex items-center gap-3">
      <AlertTriangle size={20} className="text-white" />
      <span className="font-semibold text-sm md:text-base">
        🚩 {c.road_name || 'Road'} — {c.fraud_reason || 'Fraud detected'} — Immediate Attention
      </span>
    </div>
  </motion.div>
))}

{/* New Complaints Alert */}
{realComplaints.filter(c => c.status === 'Acknowledge').slice(0, 1).map(c => (
  <motion.div
    key={c.id}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#B45E16] rounded-xl p-3 flex justify-between items-center shadow-lg border border-orange-500/50"
  >
    <div className="flex items-center gap-3">
      <Bell size={20} className="text-white" />
      <span className="font-semibold text-sm md:text-base">
        🔔 New complaint on {c.road_name || 'your road'} — {c.description?.slice(0, 50)}
      </span>
    </div>
    <button 
      onClick={() => navigate('/contractor/complaints')}
      className="text-white/80 hover:text-white text-xs border border-white/30 px-3 py-1 rounded transition-colors"
    >
      View →
    </button>
  </motion.div>
))}

        <div className="space-y-6">
          
          {/* UTILIZATION */}
          <Panel className="p-6">
            <h3 className="text-lg font-semibold mb-6">Overall Budget Utilization</h3>
            <div className="flex flex-col items-center">
              <h2 className="text-5xl font-bold text-orange-500 mb-4">
  {realRoads.length > 0 
    ? Math.round((realRoads.reduce((s, r) => s + parseFloat(r.budget_spent || 0), 0) / realRoads.reduce((s, r) => s + parseFloat(r.budget_sanctioned || 0), 0)) * 100) 
    : 0}%
</h2>
              
              <div className="w-full max-w-4xl h-4 bg-[#1C2B41] rounded-full overflow-hidden mb-4 relative shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${realRoads.length > 0 ? Math.round((realRoads.reduce((s, r) => s + parseFloat(r.budget_spent || 0), 0) / realRoads.reduce((s, r) => s + parseFloat(r.budget_sanctioned || 0), 0)) * 100) : 0}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-orange-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 w-full h-full rounded-full animate-pulse"></div>
                </motion.div>
              </div>
              
              <p className="text-sm text-[#9BA6B5] mb-6">
  ₹ {realRoads.reduce((s, r) => s + parseFloat(r.budget_spent || 0), 0).toFixed(2)} Cr / ₹ {realRoads.reduce((s, r) => s + parseFloat(r.budget_sanctioned || 0), 0).toFixed(2)} Cr
</p>
              
              <div className="flex items-center gap-6 text-xs text-[#9BA6B5]">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>0% – 70%</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>70% – 90%</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>90%+</div>
              </div>
            </div>
          </Panel>

          {/* BAR CHART */}
          <Panel className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold">Top 8 Roads – Sanctioned vs Spent</h3>
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#1D4ED8]"></div>Sanctioned (₹)</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#15803D]"></div>Spent (₹)</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#B91C1C]"></div>Fraud Flag</div>
              </div>
            </div>
            
            <div className="h-[280px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }} barGap={0}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1C2B41" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={{ stroke: '#2e415c' }} 
                    tickLine={false} 
                    tick={{ fill: '#9BA6B5', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9BA6B5', fontSize: 11 }}
                    domain={[0, 3]}
                    ticks={[0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]}
                    label={{ value: '₹ Amount (in Cr)', angle: 0, position: 'top', fill: '#9BA6B5', fontSize: 10, dy: -15, dx: 30 }}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.3 }} />
                  <Bar dataKey="sanctioned" fill="#1D4ED8" radius={[2, 2, 0, 0]} maxBarSize={16} />
                  <Bar dataKey="spent" fill="#15803D" radius={[2, 2, 0, 0]} maxBarSize={16} />
                  <Bar dataKey="fraud" fill="#B91C1C" radius={[2, 2, 0, 0]} maxBarSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-[#9BA6B5] mt-2 flex items-center gap-1">
              <span className="text-red-500">*</span> Red bars indicate roads flagged for fraud / irregularities.
            </p>
          </Panel>

        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        <div className={`col-span-12 space-y-6 ${isDrawerOpen ? 'lg:pr-[400px]' : ''} transition-all duration-300`}>
            
            {/* COMPLAINTS SECTION */}
            <Panel className="p-5">
              <div className="flex items-center gap-3 mb-5">
                <h3 className="text-lg font-semibold text-white">Complaints on My Roads</h3>
                <span className="px-2.5 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full shadow-[0_0_8px_#f97316]">{realComplaints.length}</span>
              </div>

              <div className="space-y-4">
  {complaintsLoading ? (
    <div className="text-center text-[#9BA6B5] py-8">Loading complaints...</div>
  ) : realComplaints.length === 0 ? (
    <div className="text-center text-[#9BA6B5] py-8">No complaints on your roads yet</div>
  ) : (
    realComplaints.slice(0, 3).map((comp) => (
      <div key={comp.id} className="bg-[#13233A] border border-[#1e324f] rounded-xl p-3 flex flex-col md:flex-row gap-4 hover:border-[#2b466e] transition-colors">
        
        {/* Image */}
        <div className="w-full md:w-40 h-28 shrink-0 rounded-lg overflow-hidden relative border border-white/10">
          {comp.image_url && comp.image_url.startsWith('http') ? (
            <img src={comp.image_url} alt="Complaint" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#1C2B41] flex items-center justify-center text-[#9BA6B5] text-xs">
              📸 No Photo
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Road + Status */}
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-white text-sm">{comp.road_name || 'Unknown Road'}</h4>
              <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${
                comp.status === 'Pending' ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                comp.status === 'Resolved' ? 'text-green-400 border-green-400/30 bg-green-400/10' :
                comp.status === 'Flagged' ? 'text-red-400 border-red-400/30 bg-red-400/10' :
                'text-blue-400 border-blue-400/30 bg-blue-400/10'
              }`}>
                {comp.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#9BA6B5] mb-2">{comp.description}</p>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-[#9BA6B5] mb-2">
              <MapPin size={12} />
              <span>{comp.latitude?.toFixed(4)}, {comp.longitude?.toFixed(4)}</span>
            </div>

            {/* Date + Fraud */}
            <div className="flex items-center gap-4 text-xs text-[#9BA6B5]">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                {new Date(comp.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'short', year: 'numeric'
                })}
              </div>
              {comp.is_fraud && (
                <span className="text-red-400 font-semibold">🚩 Fraud</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4 md:mt-0">
            <button className="px-4 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded transition-colors shadow-sm">
              Mark as Fixed
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-1.5 bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded transition-colors shadow-sm"
            >
              Upload Fix Photo
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
              
              <div className="mt-4 text-center">
                <button onClick={() => navigate('/contractor/complaints')} 
                 className="text-sm text-[#9BA6B5] hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto">
                  View All Complaints <ArrowRight size={14} />
                </button>
              </div>
            </Panel>

            {/* MY ROADS TABLE */}
            <Panel className="p-5 overflow-x-auto scrollbar-hide">
              <h3 className="text-lg font-semibold text-white mb-4">My Roads (Top 5)</h3>
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#1C2B41] text-[#9BA6B5]">
                    <th className="pb-3 font-medium px-2">Road Name</th>
                    <th className="pb-3 font-medium px-2">Type</th>
                    <th className="pb-3 font-medium px-2">Utilization</th>
                    <th className="pb-3 font-medium px-2">Complaints</th>
                    <th className="pb-3 font-medium px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {roadsLoading ? (
  <tr><td colSpan={5} className="text-center text-[#9BA6B5] py-6">Loading roads...</td></tr>
) : realRoads.length === 0 ? (
  <tr><td colSpan={5} className="text-center text-[#9BA6B5] py-6">No roads assigned</td></tr>
) : realRoads.slice(0, 5).map((road, idx) => (
  <tr key={idx} className="border-b border-[#1C2B41]/50 hover:bg-white/5 transition-colors">
    <td className="py-3.5 px-2 font-medium text-white/90">{road.road_name}</td>
    <td className="py-3.5 px-2">
      <span className="text-[9px] px-1.5 py-0.5 rounded text-white font-semibold bg-blue-600">
        {road.road_type || 'N/A'}
      </span>
    </td>
    <td className="py-3.5 px-2">
      <div className="flex items-center gap-2">
        <span className="w-8 text-white">
          {road.budget_sanctioned && road.budget_spent 
            ? Math.round((road.budget_spent / road.budget_sanctioned) * 100) + '%'
            : 'N/A'}
        </span>
        <div className="w-24 h-1.5 bg-[#1C2B41] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-orange-500" style={{ 
            width: road.budget_sanctioned && road.budget_spent 
              ? Math.round((road.budget_spent / road.budget_sanctioned) * 100) + '%'
              : '0%'
          }}></div>
        </div>
      </div>
    </td>
    <td className="py-3.5 px-2 font-medium text-orange-400">
      {realComplaints.filter(c => c.road_name === road.road_name).length} complaints
    </td>
    <td className="py-3.5 px-2 text-right">
      <button onClick={() => navigate('/contractor/complaints')}
        className="text-[10px] px-3 py-1 bg-[#1D4ED8] hover:bg-[#1e40af] text-white rounded transition-colors shadow-sm">
        View Details
      </button>
    </td>
  </tr>
))}
                </tbody>
              </table>
            </Panel>

            {/* QUICK ACTIONS */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 px-1">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => navigate('/contractor/roads')}
                className="bg-[#144C8F] hover:bg-[#1e58a2] transition-colors rounded-xl p-4 flex items-center gap-4 text-left border border-blue-400/20 shadow-md">
                  <div className="bg-white/10 p-3 rounded flex items-center justify-center">
                    <Route size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base leading-tight">My Roads</h4>
                    <p className="text-xs text-blue-200 mt-1">/contractor/roads</p>
                  </div>
                </button>
                <button  onClick={() => navigate('/contractor/budget')}
                 className="bg-[#247E45] hover:bg-[#2b9051] transition-colors rounded-xl p-4 flex items-center gap-4 text-left border border-green-400/20 shadow-md">
                  <div className="bg-white/10 p-3 rounded flex items-center justify-center">
                    <ListChecks size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base leading-tight">Budget Details</h4>
                    <p className="text-xs text-green-200 mt-1">/contractor/budget</p>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
    
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent cursor-pointer"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#0A1322]/95 backdrop-blur-xl border-l border-[#1C2B41] z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-[#1C2B41] flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Upload Fix Photo</h2>
                <button 
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-[#9BA6B5] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <p className="text-sm text-[#9BA6B5] mb-2">Upload Fix Photo</p>
                
                {/* Drag Drop Area */}
                <div className="border-2 border-dashed border-[#1C2B41] hover:border-[#3B82F6] transition-colors rounded-xl bg-[#0D192B] flex flex-col items-center justify-center py-12 px-4 cursor-pointer mb-6 group">
                  <div className="bg-[#1C2B41] p-4 rounded-full mb-4 group-hover:bg-[#1D4ED8]/20 transition-colors">
                    <UploadCloud size={32} className="text-[#9BA6B5] group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-sm text-white font-medium mb-1">Drag & drop image here</p>
                  <p className="text-xs text-[#9BA6B5]">or click to browse</p>
                </div>

                <p className="text-sm text-[#9BA6B5] mb-2">Note</p>
                <textarea 
                  className="w-full bg-[#0D192B] border border-[#1C2B41] rounded-lg p-3 text-sm text-white placeholder:text-[#9BA6B5] focus:outline-none focus:border-[#3B82F6] resize-none mb-6 h-24 transition-colors"
                  placeholder="Pothole filled"
                  defaultValue="Pothole filled"
                ></textarea>

                <button className="w-full py-3 bg-[#15803D] hover:bg-[#166534] text-white font-bold rounded-lg transition-colors shadow-[0_0_15px_rgba(21,128,61,0.4)] mb-8">
                  Submit Update
                </button>

                <div className="space-y-4 border-t border-[#1C2B41] pt-6">
                  <div>
                    <p className="text-xs text-[#9BA6B5] font-mono mb-1">PATCH /complaints/&#123;id&#125;/status</p>
                    <p className="text-xs text-white flex items-center gap-2">
                      <ArrowRight size={12} className="text-blue-400" /> resolved_by_contractor
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-yellow-400/90 bg-yellow-400/10 p-3 rounded-lg border border-yellow-400/20">
                    <Bell size={14} /> Authority will be notified
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
} 