import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Download, Building2, Wallet, PieChart,
  AlertTriangle, MapPin, CheckCircle2, ChevronsUpDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';



const Card = ({ children, className = '' }) => (
  <div className={`bg-[#071426] border border-[#1e293b] rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.05)] ${className}`}>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-[#1e293b] p-3 rounded-lg shadow-xl text-xs min-w-[150px]">
        <p className="font-semibold text-white mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-[#3B82F6] flex justify-between"><span className="text-[#94A3B8]">Sanctioned:</span> ₹{payload[0].value} Lakh</p>
          <p className="text-[#22C55E] flex justify-between"><span className="text-[#94A3B8]">Spent:</span> ₹{payload[1].value} Lakh</p>
          <p className="text-[#EF4444] flex justify-between"><span className="text-[#94A3B8]">Fraud Flagged:</span> {payload[2].value > 0 ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }
  return null;
};


export default function App() {
    const [budgetData, setBudgetData] = useState(null)
  const [roadBudgetTable, setRoadBudgetTable] = useState([])
  const [chartData, setChartData] = useState([])
  const [fraudAlerts, setFraudAlerts] = useState([])
  const [contractorTable, setContractorTable] = useState([])
  const [utilizationOverview, setUtilizationOverview] = useState([])
  const [stats, setStats] = useState({
    sanctioned: '0', spent: '0', utilization: '0'
  })

  useEffect(() => {
       fetch(`${import.meta.env.VITE_API_URL}/api/budget/summary/Madhya Pradesh`)
      .then(r => r.json())
      .then(data => {
        const roads = data.data || []
        const analytics = data.analytics || {}
        const contractorInsights = data.contractor_insights || []

        // Stats cards
        setStats({
          sanctioned: (analytics.total_sanctioned / 10000000).toFixed(0),
          spent: (analytics.total_spent / 10000000).toFixed(0),
          utilization: analytics.total_sanctioned > 0
            ? ((analytics.total_spent / analytics.total_sanctioned) * 100).toFixed(0)
            : '0'
        })

        // Chart data
        setChartData(roads.map(road => ({
          name: road.road_name?.substring(0, 12),
          sanctioned: parseFloat((road.budget_sanctioned / 100000).toFixed(0)),
          spent: parseFloat((road.budget_spent / 100000).toFixed(0)),
          fraud: ((road.budget_spent / road.budget_sanctioned) * 100) > 90 ? 
            parseFloat((road.budget_spent / 100000).toFixed(0)) : 0
        })))

        // Road budget table
        setRoadBudgetTable(roads.map(road => {
          const util = road.budget_sanctioned > 0
            ? ((road.budget_spent / road.budget_sanctioned) * 100)
            : 0
          return {
            road: road.road_name,
            type: road.road_type === 'National Highway' ? 'NH' :
                  road.road_type === 'State Highway' ? 'SH' : road.road_type,
            district: 'Bhopal',
            contractor: road.contractor_name,
            sanctioned: `₹${(road.budget_sanctioned / 100000).toFixed(0)} L`,
            spent: `₹${(road.budget_spent / 100000).toFixed(0)} L`,
            util: `${util.toFixed(2)}%`,
            utilColor: util > 90 ? '#EF4444' : util > 70 ? '#F59E0B' : '#22C55E',
            complaints: '-',
            fraud: util > 90
          }
        }))

        // Fraud alerts
        setFraudAlerts(roads
          .filter(road => (road.budget_spent / road.budget_sanctioned) * 100 > 90)
          .slice(0, 3)
          .map(road => ({
            road: road.road_name,
            type: road.road_type === 'National Highway' ? 'NH' :
                  road.road_type === 'State Highway' ? 'SH' : 'MDR',
            location: 'Bhopal, Madhya Pradesh',
            issue: 'High budget utilization — Fraud suspected',
            contractor: road.contractor_name,
            spent: `₹${(road.budget_spent / 100000).toFixed(0)} L`,
            date: '-',
            complaints: '-'
          }))
        )

        // Contractor table
        setContractorTable(contractorInsights.map(c => {
          const util = c.total_sanctioned > 0
            ? (c.total_spent / c.total_sanctioned) * 100
            : 0
          return {
            name: c.contractor,
            roads: c.projects_count,
            budget: `₹${(c.total_sanctioned / 10000000).toFixed(2)} Cr`,
            spent: `₹${(c.total_spent / 10000000).toFixed(2)} Cr`,
            complaints: '-',
            fraud: util > 90 ? 1 : 0,
            risk: util > 90 ? 'Critical' : util > 70 ? 'High' : util > 50 ? 'Medium' : 'Low',
            riskColor: util > 90 ? 'bg-red-500/20 text-red-500 border border-red-500/50' :
                       util > 70 ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' :
                       util > 50 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                       'bg-green-500/20 text-green-500 border border-green-500/50'
          }
        }))

        // Utilization overview
        setUtilizationOverview(roads.map(road => {
          const util = road.budget_sanctioned > 0
            ? ((road.budget_spent / road.budget_sanctioned) * 100)
            : 0
          return {
            name: road.road_name?.substring(0, 15),
            value: `${util.toFixed(2)}%`,
            width: `${Math.min(util, 100)}%`,
            color: util > 90 ? '#EF4444' : util > 70 ? '#F59E0B' : '#22C55E',
            alert: util > 90
          }
        }))
      })
      .catch(err => console.error(err))
  }, [])
  return (
    <div className="bg-[#020817] text-[#94A3B8] min-h-screen p-4 md:p-6 font-sans selection:bg-[#3B82F6]/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1400px] mx-auto space-y-6"
      >
        {/* SECTION 1: HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1.5">
              <h1 className="text-2xl font-bold text-white tracking-tight">Budget & Fraud Reports</h1>
              <span className="px-3 py-1 bg-[#0f172a] border border-[#1e293b] rounded-full text-[11px] text-[#94A3B8]">
                Madhya Pradesh | PWD
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Clock size={12} />
              <span>Last updated: 2 mins ago</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#1e293b] rounded-lg text-sm text-white hover:bg-[#1e293b]/50 transition-colors bg-[#071426]">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* SECTION 2: SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-5 flex items-start gap-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-shadow">
            <div className="p-3 bg-[#3B82F6]/10 rounded-lg shrink-0">
              <Building2 size={24} className="text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3B82F6] mb-1">Total Sanctioned</p>
              <h2 className="text-3xl font-bold text-white mb-1">₹{stats.sanctioned} Crore</h2>
              <p className="text-xs text-[#94A3B8]">Total budget sanctioned</p>
            </div>
          </Card>
          <Card className="p-5 flex items-start gap-4 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-shadow">
            <div className="p-3 bg-[#22C55E]/10 rounded-lg shrink-0">
              <Wallet size={24} className="text-[#22C55E]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#22C55E] mb-1">Total Spent</p>
              <h2 className="text-3xl font-bold text-white mb-1">₹{stats.spent} Crore</h2>

              <p className="text-xs text-[#94A3B8]">Total amount spent</p>
            </div>
          </Card>
          <Card className="p-5 flex items-start gap-4 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-shadow">
            <div className="p-3 bg-[#F59E0B]/10 rounded-lg shrink-0">
              <PieChart size={24} className="text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#F59E0B] mb-1">Overall Utilization</p>
              <h2 className="text-3xl font-bold text-white mb-1">{stats.utilization}%</h2>
              <p className="text-xs text-[#94A3B8]">Average utilization across roads</p>
            </div>
          </Card>
        </div>

        {/* SECTION 3: BUDGET OVERVIEW CHART */}
        <Card className="p-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-white">Budget Overview (Sanctioned vs Spent)</h3>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></div>Sanctioned</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]"></div>Spent</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#EF4444]"></div>Fraud Flagged</div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                  tickFormatter={(value) => value > 0 ? `${value / 1000}K` : '0'}
                  label={{ value: 'Amount (₹ Lakhs)', angle: -90, position: 'insideLeft', fill: '#94A3B8', fontSize: 10, dy: -60, dx: 10 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.4 }} />
                <Bar dataKey="sanctioned" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="spent" fill="#22C55E" radius={[4, 4, 0, 0]} maxBarSize={16} />
                <Bar dataKey="fraud" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* SECTION 4: FRAUD ALERTS */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-[#EF4444]" size={20} />
            <h3 className="text-lg font-semibold text-[#EF4444]">Fraud Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fraudAlerts.map((alert, idx) => (
              <div key={idx} className="bg-[#FFF1F2] rounded-xl p-5 border border-[#FECDD3] shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900 text-base">{alert.road}</h4>
                  <span className="text-[10px] font-bold text-red-600 bg-red-100 border border-red-200 px-1.5 py-0.5 rounded">
                    {alert.type}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
                  <MapPin size={12} />
                  <span>{alert.location}</span>
                </div>
                <p className="text-red-600 font-bold text-sm mb-4">{alert.issue}</p>
                
                <div className="space-y-2 text-xs text-slate-700 flex-grow mb-5">
                  <p><span className="font-medium text-slate-900">Contractor:</span> {alert.contractor}</p>
                  <p><span className="font-medium text-slate-900">Total Spent:</span> {alert.spent}</p>
                  <p><span className="font-medium text-slate-900">Last Repair:</span> {alert.date}</p>
                  <p><span className="font-medium text-slate-900">Complaints:</span> {alert.complaints}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-auto">
                  <button className="text-[10px] font-medium text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded py-1.5 transition-colors">
                    View Road Detail
                  </button>
                  <button className="text-[10px] font-medium text-white bg-red-600 hover:bg-red-700 rounded py-1.5 transition-colors">
                    Flag Contractor
                  </button>
                  <button className="text-[10px] font-medium text-white bg-slate-900 hover:bg-slate-800 rounded py-1.5 transition-colors">
                    Escalate to Higher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: ROAD-WISE BUDGET TABLE */}
        <Card className="overflow-hidden">
          <div className="p-5 border-b border-[#1e293b]">
            <h3 className="text-lg font-semibold text-white">Road-wise Budget</h3>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse text-xs min-w-[900px]">
              <thead>
                <tr className="border-b border-[#1e293b] bg-[#071426]">
                  {['Road Name', 'Type', 'District', 'Contractor', 'Sanctioned (₹)', 'Spent (₹)', 'Utilization %', 'Complaints', 'Fraud Flag', 'Action'].map((head, i) => (
                    <th key={i} className="py-3 px-4 font-medium text-[#94A3B8] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {head}
                        {head !== 'Action' && head !== 'Fraud Flag' && head !== 'Type' && head !== 'District' && <ChevronsUpDown size={10} className="opacity-50" />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[#e2e8f0]">
                {roadBudgetTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#1e293b]/50 hover:bg-[#0f172a]/50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">{row.road}</td>
                    <td className="py-3 px-4">{row.type}</td>
                    <td className="py-3 px-4">{row.district}</td>
                    <td className="py-3 px-4 min-w-[160px] whitespace-nowrap">{row.contractor}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{row.sanctioned}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{row.spent}</td>
                    <td className="py-3 px-4 font-bold" style={{ color: row.utilColor }}>{row.util}</td>
                    <td className="py-3 px-4 text-center">{row.complaints}</td>
                    <td className="py-3 px-4 text-center">
                      {row.fraud ? 
                        <AlertTriangle size={14} className="text-[#EF4444] mx-auto" /> : 
                        <CheckCircle2 size={14} className="text-[#22C55E] mx-auto" />
                      }
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-[10px] text-[#3B82F6] border border-[#3B82F6]/30 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 px-2 py-1 rounded transition-colors">View</button>
                        <button className="text-[10px] text-[#F59E0B] border border-[#F59E0B]/30 bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 px-2 py-1 rounded transition-colors">Investigate</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* SECTION 6: CONTRACTOR PERFORMANCE TABLE */}
        <Card className="overflow-hidden">
          <div className="p-5 border-b border-[#1e293b]">
            <h3 className="text-lg font-semibold text-white">Contractor Performance</h3>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse text-xs min-w-[800px]">
              <thead>
                <tr className="border-b border-[#1e293b] bg-[#071426]">
                  {['Contractor Name', 'Roads Assigned', 'Total Budget (₹)', 'Total Spent (₹)', 'Complaints Filed', 'Fraud Flags', 'Risk Level', 'Action'].map((head, i) => (
                    <th key={i} className="py-3 px-4 font-medium text-[#94A3B8] whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {head}
                        {head !== 'Action' && head !== 'Risk Level' && head !== 'Roads Assigned' && head !== 'Fraud Flags' && <ChevronsUpDown size={10} className="opacity-50" />}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[#e2e8f0]">
                {contractorTable.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#1e293b]/50 hover:bg-[#0f172a]/50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">{row.name}</td>
                    <td className="py-3 px-4 text-center">{row.roads}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{row.budget}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{row.spent}</td>
                    <td className="py-3 px-4 text-center">{row.complaints}</td>
                    <td className="py-3 px-4 text-center">{row.fraud}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${row.riskColor}`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-[10px] text-[#3B82F6] border border-[#3B82F6]/30 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 px-2 py-1 rounded transition-colors whitespace-nowrap">View Roads</button>
                        <button className="text-[10px] text-[#F59E0B] border border-[#F59E0B]/30 bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 px-2 py-1 rounded transition-colors whitespace-nowrap">Flag Suspicious</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* SECTION 7: UTILIZATION OVERVIEW */}
        <Card className="p-5 overflow-x-auto scrollbar-hide">
          <div className="min-w-[600px]">
            <h3 className="text-lg font-semibold text-white mb-6">Utilization Overview (Road-wise)</h3>
            <div className="space-y-4">
              <div className="flex text-xs font-medium text-[#94A3B8] mb-2 px-2">
                <div className="w-[140px]">Road Name</div>
                <div className="flex-grow"></div>
                <div className="w-[80px] text-right">Utilization</div>
              </div>
              {utilizationOverview.map((item, idx) => (
                <div key={idx} className="flex items-center text-xs">
                  <div className="w-[140px] truncate text-[#e2e8f0] pr-4">{item.name}</div>
                  <div className="flex-grow h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: item.width }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="w-[80px] text-right font-medium flex items-center justify-end gap-2" style={{ color: item.color }}>
                    {item.value}
                    {item.alert ? <AlertTriangle size={12} className="text-[#EF4444]" /> : <span className="w-3"></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </motion.div>
    </div>
  );
}