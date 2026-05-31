import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { 
  Download, FileText, ChevronDown, Search, AlertTriangle, CheckCircle, Wallet, CreditCard, Activity 
} from 'lucide-react';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b] border border-slate-700 p-3 rounded-lg shadow-xl">
        <p className="text-white font-medium mb-2">{label}</p>
        <p className="text-slate-400 text-sm">Sanctioned: ₹{payload[0].payload.sanctioned.toFixed(2)} Cr</p>
        <p className="text-slate-400 text-sm">Spent: ₹{payload[0].payload.spent.toFixed(2)} Cr</p>
        <p className="text-slate-200 text-sm font-semibold mt-1">Utilization: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function ContractorBudget() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const contractorName = localStorage.getItem('contractorName') || 'Bhopal Infrastructure Group'
  const [myRoads, setMyRoads] = useState([])
  const [myStats, setMyStats] = useState({
    totalSanctioned: 0,
    totalSpent: 0,
    utilization: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
   fetch(`${import.meta.env.VITE_API_URL}/api/budget/summary/Madhya Pradesh`)
      .then(r => r.json())
      .then(data => {
        const filtered = (data.data || []).filter(
          road => road.contractor_name === contractorName
        )
        setMyRoads(filtered)
        const sanctioned = filtered.reduce((sum, r) => sum + (r.budget_sanctioned || 0), 0)
        const spent = filtered.reduce((sum, r) => sum + (r.budget_spent || 0), 0)
        setMyStats({
          totalSanctioned: sanctioned,
          totalSpent: spent,
          utilization: sanctioned > 0 ? ((spent / sanctioned) * 100).toFixed(1) : 0
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [contractorName])



 const filteredTable = myRoads.filter(row => {
  const matchesSearch = row.road_name?.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesTab = activeTab === 'All' || row.road_type === activeTab
    || (activeTab === 'NH' && row.road_type === 'National Highway')
    || (activeTab === 'SH' && row.road_type === 'State Highway');
  return matchesSearch && matchesTab;
});
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-300 p-6 font-sans selection:bg-blue-500/30">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#111827] p-5 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
              <Wallet size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Budget Details</h1>
              <p className="text-slate-400 text-sm">{contractorName} • Madhya Pradesh</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-slate-700 hover:bg-slate-800 text-white rounded-lg transition-all text-sm font-medium">
              <Download size={16} /> Download CSV
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] text-sm font-medium">
              <FileText size={16} /> Download PDF
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] border border-blue-900/50 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-500/10 rounded-full text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Wallet size={24} />
              </div>
              <div>
                <p className="text-blue-400 text-sm font-medium">Total Sanctioned</p>
                <h2 className="text-3xl font-bold text-white mt-1">
  ₹{(myStats.totalSanctioned / 10000000).toFixed(2)} Cr
</h2>

                <p className="text-slate-500 text-xs mt-1">Total budget sanctioned</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-green-900/50 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-green-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all"></div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-500/10 rounded-full text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CreditCard size={24} />
              </div>
              <div>
                <p className="text-green-400 text-sm font-medium">Total Spent</p>
                <h2 className="text-3xl font-bold text-white mt-1">
                    ₹{(myStats.totalSpent / 10000000).toFixed(2)} Cr
                </h2>
                <p className="text-slate-500 text-xs mt-1">Total amount spent</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111827] border border-orange-900/50 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-orange-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-all"></div>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-orange-500/10 rounded-full text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-orange-400 text-sm font-medium">Overall Utilization</p>
                <h2 className="text-3xl font-bold text-white mt-1">{myStats.utilization}%</h2>
                <p className="text-slate-500 text-xs mt-1">Average utilization across roads</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Utilization Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1 bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-lg">
            <label className="block text-sm font-medium text-slate-300 mb-3">Filter by State</label>
            <div className="relative">
              <select className="w-full bg-[#1e293b] border border-slate-700 text-white text-sm rounded-lg py-3 px-4 appearance-none focus:outline-none focus:border-blue-500 transition-colors cursor-pointer">
                <option>Madhya Pradesh</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="col-span-3 bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-lg flex flex-col justify-center">
            <div className="flex justify-between text-sm mb-3">
              <span className="font-medium text-white">Utilization Overview</span>
            </div>
            <div className="h-4 w-full bg-[#1e293b] rounded-full overflow-hidden border border-slate-800 relative">
              <div className="h-full bg-green-500 transition-all duration-1000 ease-out flex items-center justify-center text-[10px] font-bold text-black" style={{ width: `${myStats.utilization}%` }}>{myStats.utilization}%

                
              </div>
            </div>
            <div className="flex justify-start text-xs text-slate-400 mt-3 gap-2">
             <span className="text-slate-300">₹{(myStats.totalSpent/10000000).toFixed(2)} Cr Spent</span>
<span>₹{(myStats.totalSanctioned/10000000).toFixed(2)} Cr Sanctioned</span>
            </div>
          </div>
        </div>

        {/* Utilization Chart */}
        <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-semibold text-white">Utilization % per Road</h3>
            <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-500 rounded-sm"></div>0-70%</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-orange-500 rounded-sm"></div>70-90%</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-500 rounded-sm"></div>90%+</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
  <ResponsiveContainer width="100%" height="100%">
   <BarChart data={myRoads.map(road => ({
  name: road.road_name?.substring(0, 10),
  utilization: road.budget_sanctioned > 0 
    ? parseFloat(((road.budget_spent / road.budget_sanctioned) * 100).toFixed(1))
    : 0,
  sanctioned: parseFloat((road.budget_sanctioned / 10000000).toFixed(2)), 
  spent: parseFloat((road.budget_spent / 10000000).toFixed(2)),         
  fill: ((road.budget_spent / road.budget_sanctioned) * 100) < 70 ? '#10b981' :
        ((road.budget_spent / road.budget_sanctioned) * 100) < 90 ? '#f59e0b' : '#ef4444'
}))} margin={{ top: 20, right: 30, left: -20, bottom: 0 }} barSize={32}>
  
  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(val) => `${val}%`} />
  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.4 }} />
  <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'right', value: '90%', fill: '#ef4444', fontSize: 12 }} />
  <Bar dataKey="utilization" radius={[4, 4, 0, 0]}>
    {myRoads.map((road, index) => (
      <cell key={`cell-${index}`} fill={
        ((road.budget_spent / road.budget_sanctioned) * 100) < 70 ? '#10b981' :
        ((road.budget_spent / road.budget_sanctioned) * 100) < 90 ? '#f59e0b' : '#ef4444'
      } />
    ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>
</div>

        {/* Main Split Content: Table + Fraud Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Road-wise Table (Spans 2 columns) */}
          <div className="xl:col-span-2 bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col h-[700px]">
            <h3 className="text-lg font-semibold text-white mb-5">Road-wise Budget Details</h3>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2 bg-[#1e293b] p-1 rounded-lg">
                {['All', 'NH', 'SH', 'MDR', 'VR'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by road name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#1e293b] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 w-[250px] transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-auto rounded-xl border border-slate-800 custom-scrollbar">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#1e293b] text-slate-400 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-4 font-medium border-b border-slate-800">Road Name ↕</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800">Type ↕</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800">Sanctioned (₹) ↕</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800">Spent (₹) ↕</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800">Utilization (%) ↕</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800">Last Repair Date ↕</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800 text-center">Complaints ↕</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800 text-center">Fraud Flag</th>
                    <th className="px-4 py-4 font-medium border-b border-slate-800 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredTable.map((row, i) => {
  const util = row.budget_sanctioned > 0
    ? ((row.budget_spent / row.budget_sanctioned) * 100)
    : 0;
  const color = util < 70 ? 'bg-green-500' : util < 90 ? 'bg-orange-500' : 'bg-red-500';
  return (
    <tr key={i} className="hover:bg-[#1e293b]/50 transition-colors group">
      <td className="px-4 py-4 text-slate-200">{row.road_name}</td>
      <td className="px-4 py-4 text-slate-400">{row.road_type}</td>
      <td className="px-4 py-4 text-blue-400 font-medium">
        ₹ {(row.budget_sanctioned / 10000000).toFixed(2)} Cr
      </td>
      <td className="px-4 py-4 text-green-400 font-medium">
        ₹ {(row.budget_spent / 10000000).toFixed(2)} Cr
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <span className={util >= 90 ? 'text-red-400 font-medium' : 'text-slate-300'}>
            {util.toFixed(2)}%
          </span>
          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${Math.min(util, 100)}%` }}></div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-slate-400">-</td>
      <td className="px-4 py-4 text-center">
        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-bold border border-orange-500/50 text-orange-400 bg-orange-500/10">
          -
        </span>
      </td>
      <td className="px-4 py-4 text-center flex justify-center mt-3">
        <CheckCircle size={18} className="text-green-500" />
      </td>
      <td className="px-4 py-4 text-center">
        <button className="text-blue-500 hover:text-blue-400 font-medium text-sm transition-colors">View</button>
      </td>
    </tr>
  );
})}
</tbody>
</table>
</div>
</div>

          {/* Right Column: Fraud Alerts */}
          <div className="bg-[#111827] border border-red-900/30 p-6 rounded-2xl shadow-lg h-[700px] overflow-y-auto custom-scrollbar relative">
            <div className="flex items-center gap-2 mb-6 sticky top-0 bg-[#111827] py-2 z-10">
              <AlertTriangle className="text-red-500" size={20} />
              <h3 className="text-lg font-semibold text-red-500">Fraud Flagged Roads</h3>
            </div>
            
            <div className="space-y-4">
             {myRoads.filter(road => 
  (road.budget_spent / road.budget_sanctioned) * 100 > 90
).map((road, idx) => (
  <div key={idx} className="bg-[#1e293b]/50 border border-red-900/50 rounded-xl p-5 hover:border-red-500/50 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.05)]">
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-white font-bold">{road.road_name}</h4>
      <span className="bg-red-500/10 text-red-500 border border-red-500/30 text-[10px] uppercase font-bold px-2 py-1 rounded">
        Fraud Flagged
      </span>
    </div>
    
    <div className="grid grid-cols-2 gap-4 text-sm mb-5">
      <div>
        <p className="text-slate-500 mb-1 text-xs">Road Type:</p>
        <p className="text-slate-300">{road.road_type}</p>
      </div>
      <div>
        <p className="text-slate-500 mb-1 text-xs">Contractor:</p>
        <p className="text-slate-300 text-xs">{road.contractor_name}</p>
      </div>
      <div>
        <p className="text-slate-500 mb-1 text-xs">Total Spent:</p>
        <p className="text-slate-300">₹{(road.budget_spent/10000000).toFixed(2)} Cr</p>
      </div>
      <div>
        <p className="text-slate-500 mb-1 text-xs">Utilization:</p>
        <p className="text-red-400 font-semibold">
          {((road.budget_spent/road.budget_sanctioned)*100).toFixed(1)}%
        </p>
      </div>
    </div>
    
    <button className="w-full py-2 bg-transparent border border-red-900/80 hover:bg-red-900/20 text-red-400 rounded-lg text-sm font-medium transition-colors">
      View Road Details
    </button>
  </div>
))}
</div>
</div>
</div>

        {/* Bottom Section Split: Chart + Photos */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Complaint vs Budget Correlation */}
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-1">Complaint vs Budget Correlation</h3>
            <p className="text-xs text-slate-400 mb-6">Higher budget + Higher complaints = Red Flag</p>
            
            <div className="h-[300px] w-full bg-[#0b1120] rounded-xl p-4 border border-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" dataKey="x" name="Total Budget" unit=" Cr" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis type="number" dataKey="y" name="Complaints" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px'}} />
                 <Scatter name="Roads" data={myRoads.map(road => ({
  x: parseFloat((road.budget_sanctioned / 10000000).toFixed(2)),
  y: parseFloat((road.budget_spent / 10000000).toFixed(2)),
  fill: ((road.budget_spent / road.budget_sanctioned) * 100) < 70 ? '#10b981' :
        ((road.budget_spent / road.budget_sanctioned) * 100) < 90 ? '#f59e0b' : '#ef4444'
}))} fill="#8884d8">
  {myRoads.map((road, index) => (
    <cell key={`cell-${index}`} fill={
      ((road.budget_spent / road.budget_sanctioned) * 100) < 70 ? '#10b981' :
      ((road.budget_spent / road.budget_sanctioned) * 100) < 90 ? '#f59e0b' : '#ef4444'
    } />
  ))}
</Scatter>

                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex flex-wrap gap-4 text-xs font-medium mt-6 justify-center">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div><span className="text-slate-400">Low Budget - Low Complaints (Good)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div><span className="text-slate-400">High Budget - Low Complaints (Monitor)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span className="text-slate-400">High Budget - High Complaints (Red Flag)</span></div>
            </div>
          </div>

          {/* Fix Photo History */}
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Fix Photo History</h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-1">
                View All &rarr;
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
              {myRoads.slice(0, 6).map((road, idx) => (
  <div key={idx} className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden group hover:border-slate-500 transition-all flex flex-col">
    <div className="h-28 w-full bg-slate-800 relative overflow-hidden flex items-center justify-center">
      <span className="text-slate-500 text-xs">{road.road_name}</span>
    </div>
    <div className="p-3 flex-1 flex flex-col justify-between">
      <div>
        <h4 className="text-white text-sm font-bold truncate">{road.road_name}</h4>
        <p className="text-slate-500 text-[10px] mt-0.5">{road.road_type}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] font-medium text-green-500">
          <CheckCircle size={12} />
          <span className="truncate">Active</span>
        </div>
      </div>
    </div>
  </div>
))}
</div>
  </div>
    </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111827; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
      `}} />
    </div>
  );
}