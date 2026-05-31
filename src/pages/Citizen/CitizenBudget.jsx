import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaRoad, FaChevronDown, FaUserCircle, FaInfoCircle, FaChartLine,
  FaWallet, FaPercentage, FaFolder, FaCalendarAlt, FaArrowRight 
} from 'react-icons/fa';

export default function CitizenBudget() {
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState('en');
  const [selectedState, setSelectedState] = useState('Bhopal');
  const [budgetData, setBudgetData] = useState(null)
const [tableData, setTableData] = useState([])
const [currentMetrics, setCurrentMetrics] = useState({
  sanctioned: '0', spent: '0', util: '0', projects: '0'
})

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/budget/summary/Madhya Pradesh`)
    .then(r => r.json())
    .then(data => {
      setBudgetData(data)
      const roads = data.data || []
      const analytics = data.analytics || {}
      
      setCurrentMetrics({
        sanctioned: (analytics.total_sanctioned / 10000000).toFixed(2),
        spent: (analytics.total_spent / 10000000).toFixed(2),
        util: analytics.total_sanctioned > 0 
          ? ((analytics.total_spent / analytics.total_sanctioned) * 100).toFixed(2)
          : '0',
        projects: roads.length.toString()
      })
      
      setTableData(roads.map(road => ({
        name: road.road_name,
        dist: 'Bhopal',
        sanc: (road.budget_sanctioned / 10000000).toFixed(2),
        spent: (road.budget_spent / 10000000).toFixed(2),
        pct: road.budget_sanctioned > 0 
          ? ((road.budget_spent / road.budget_sanctioned) * 100).toFixed(2)
          : '0',
        status: 'In Progress',
        contractor: road.contractor_name,
        type: road.road_type
      })))
    })
    .catch(err => console.error(err))
}, [])

  // Multi-lingual Translation Matrix matching layout text strings strictly
  const translations = {
    en: {
      portalTitle: "Road e-Complaint Portal",
      homeNav: "Home",
      budgetNav: "Citizen Budget",
      langLabel: "Language",
      userName: "User Name",
      mainHeading: "Citizen Budget",
      mainDesc: "Track sanctioned and spent amounts on road projects in your state.",
      selectStateLabel: "Select State",
      card1Title: "Total Sanctioned Amount",
      card2Title: "Total Spent Amount",
      card3Title: "Utilization Percentage",
      card4Title: "Total Projects",
      chart1Title: "Sanctioned vs Spent Amount",
      finYearLabel: "This Financial Year",
      chart1Legend1: "Sanctioned Amount",
      chart1Legend2: "Spent Amount",
      chart2Title: "Category-wise Breakdown",
      chart2Total: "Total",
      cat1: "National Highways",
      cat2: "State Highways",
      cat3: "Major District Roads",
      cat4: "Other Roads",
      tableTitle: "Major Road Projects in",
      viewAllBtn: "View All Projects",
      thProject: "Project Name",
      thDistrict: "District",
      thSanctioned: "Sanctioned Amount (₹ Cr)",
      thSpent: "Spent Amount (₹ Cr)",
      thUtil: "Utilization (%)",
      thStatus: "Status",
      badgeInProg: "In Progress",
      badgePlanned: "Planned",
      taxCardTitle: "Your Tax, Your Roads",
      taxCardDesc: "Transparency in every rupee spent.",
      bottomNotice: "All amounts are in ₹ Crore. Data is updated as per latest available records. / सभी राशियां करोड़ रुपये में हैं। डेटा नवीनतम उपलब्ध रिकॉर्ड के अनुसार अपडेट किया गया है।"
    },
    hi: {
      portalTitle: "सड़क ई-शिकायत पोर्टल",
      homeNav: "होमपेज",
      budgetNav: "नागरिक बजट",
      langLabel: "भाषा",
      userName: "ऋषि",
      mainHeading: "नागरिक बजट",
      mainDesc: "अपने राज्य में सड़क परियोजनाओं पर स्वीकृत और खर्च की गई राशि को ट्रैक करें।",
      selectStateLabel: "राज्य चुनें",
      card1Title: "कुल संकलित राशि",
      card2Title: "कुल व्यय राशि",
      card3Title: "उपयोग प्रतिशत",
      card4Title: "कुल परियोजनाएं",
      chart1Title: "संकलित राशि बनाम व्यय राशि",
      finYearLabel: "इस वित्तीय वर्ष",
      chart1Legend1: "संकलित राशि",
      chart1Legend2: "व्यय राशि",
      chart2Title: "श्रेणी-वार विवरण",
      chart2Total: "कुल",
      cat1: "राष्ट्रीय राजमार्ग",
      cat2: "राज्य राजमार्ग",
      cat3: "मुख्य जिला सड़कें",
      cat4: "अन्य सड़कें",
      tableTitle: "में प्रमुख सड़क परियोजनाएं",
      viewAllBtn: "सभी परियोजनाएं देखें",
      thProject: "परियोजना नाम",
      thDistrict: "जिला",
      thSanctioned: "संकलित राशि",
      thSpent: "व्यय राशि",
      thUtil: "उपयोग प्रतिशत",
      thStatus: "स्थिति",
      badgeInProg: "प्रगति पर",
      badgePlanned: "नियोजित",
      taxCardTitle: "आपका टैक्स, आपकी सड़कें",
      taxCardDesc: "खर्च किए गए हर रुपये में पारदर्शिता।",
      bottomNotice: "सभी राशियां करोड़ रुपये में हैं। डेटा नवीनतम उपलब्ध रिकॉर्ड के अनुसार अपडेट किया गया है। / All amounts are in ₹ Crore. Data is updated as per latest available records."
    },
    bhoj: {
      portalTitle: "सड़क ई-शिकायत पोर्टल",
      portalSub: "Road e-Complaint Portal",
      homeNav: "घर",
      budgetNav: "नागरिक बजट",
      langLabel: "भाषा / Language",
      userName: "ऋषि",
      mainHeading: "नागरिक बजट",
      mainHeadingSub: "Citizen Budget",
      mainDesc: "आपन राज्य में सड़क प्रोजेक्ट पर पास भइल आ खरच भइल रुपिया देखीं।",
      selectStateLabel: "जगह चुनीं / Select State",
      card1Title: "कुल पास भइल रुपिया",
      card1Sub: "Total Sanctioned Amount",
      card2Title: "कुल खरच भइल रुपिया",
      card2Sub: "Total Spent Amount",
      card3Title: "उपयोग के प्रतिशत",
      card3Sub: "Utilization Percentage",
      card4Title: "कुल प्रोजेक्ट",
      card4Sub: "Total Projects",
      chart1Title: "पास भइल बनाम खरच भइल रुपिया",
      chart1Sub: "Sanctioned vs Spent Amount",
      finYearLabel: "ई वित्तीय वर्ष",
      chart1Legend1: "पास भइल रुपिया",
      chart1Legend2: "खरच भइल रुपिया",
      chart2Title: "कैटेगरी के हिसाब से विवरण",
      chart2Sub: "Category-wise Breakdown",
      chart2Total: "कुल",
      cat1: "राष्ट्रीय राजमार्ग",
      cat2: "राज्य राजमार्ग",
      cat3: "जिला के मुख्य सड़क",
      cat4: "अउर दूसर सड़क",
      tableTitle: "में मुख्य सड़क प्रोजेक्ट सभ",
      tableSub: "Major Road Projects in",
      viewAllBtn: "सभ प्रोजेक्ट देखीं",
      thProject: "प्रोजेक्ट के नाम",
      thDistrict: "जिला",
      thSanctioned: "पास भइल राशि (₹ Cr)",
      thSpent: "खरच भइल राशि (₹ Cr)",
      thUtil: "उपयोग प्रतिशत (%)",
      thStatus: "स्थिति",
      badgeInProg: "काम चालू बा",
      badgePlanned: "तैयारी बा",
      taxCardTitle: "रउआर टैक्स, रउआर सड़क",
      taxCardDesc: "खरच भइल पाई-पाई के हिसाब साफ बा।",
      bottomNotice: "सभ राशि करोड़ रुपिया में बा। डेटा एकदम नया रिकॉर्ड के हिसाब से बा।"
    }
  };

  const t = translations[activeLang];

  
  return (
    <div className="min-h-screen text-white font-sans bg-[#010811] bg-[radial-gradient(circle_at_50%_0%,_#05182d_0%,_#010811_75%)] p-2 md:p-4 select-none flex flex-col justify-between overflow-x-hidden">
      
      {/* ─── GLOBAL TOP NAVIGATION HEADER ─── */}
      <header className="flex flex-col sm:flex-row justify-between items-center p-3 md:p-[14px_24px] bg-[#020e1c]/80 border border-white/10 rounded-xl mb-4 backdrop-blur-md gap-4 sm:gap-0 w-full flex-shrink-0">
        <div className="flex items-center gap-3 w-full sm:w-auto cursor-pointer" onClick={() => navigate('/citizen')}>
          <div className="bg-gradient-to-br from-[#005f73] to-[#00d2ff] w-11 h-11 rounded-full flex justify-center items-center text-xl shadow-[0_0_15px_rgba(0,210,255,0.25)] flex-shrink-0">
            <FaRoad />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold tracking-wide">{t.portalTitle}</h1>
            <p className="text-[10px] text-gray-400">{t.portalSub}</p>
          </div>
        </div>
        
        <nav className="flex items-center text-sm">
          <span onClick={() => navigate('/citizen')} className="text-gray-400 hover:text-[#00d2ff] text-xs font-bold py-1 px-2 flex items-center gap-1.5 cursor-pointer transition-colors border-b-2 border-transparent hover:border-[#00d2ff]">
            {t.homeNav}
          </span>
          <span className="text-gray-300 font-bold px-1 text-xs">/</span>
          <span className="text-[#00d2ff] text-xs font-bold py-1 px-2 flex items-center gap-1.5 cursor-pointer border-b-2 border-[#00d2ff]">
            {t.budgetNav}
          </span>
        </nav>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 md:gap-5 w-full sm:w-auto border-t border-white/5 sm:border-none pt-2.5 sm:pt-0">
          <div className="flex items-center gap-2 text-xs text-[#8fa0b5]">
            <span className="font-medium">{t.langLabel}</span>
            <div className="flex bg-[#031326] border border-white/10 p-0.5 rounded-md">
              <button onClick={() => setActiveLang('en')} className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${activeLang === 'en' ? 'bg-[#00d2ff]/20 border border-[#00d2ff]/40 text-[#00d2ff]' : 'text-gray-400'}`}>English</button>
              <button onClick={() => setActiveLang('hi')} className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${activeLang === 'hi' ? 'bg-[#00d2ff]/20 border border-[#00d2ff]/40 text-[#00d2ff]' : 'text-gray-400'}`}>हिंदी</button>
              <button onClick={() => setActiveLang('bhoj')} className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-all ${activeLang === 'bhoj' ? 'bg-[#00d2ff]/20 border border-[#00d2ff]/40 text-[#00d2ff]' : 'text-gray-400'}`}>भोजपुरी</button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm cursor-pointer bg-[#031326] border border-white/5 p-[6px_12px] rounded-lg hover:border-white/10">
            <FaUserCircle className="text-base text-[#00d2ff]" />
            <span className="font-semibold text-gray-300">{t.userName}</span>
            <FaChevronDown className="text-[10px] text-gray-400" />
          </div>
        </div>
      </header>

      {/* ─── TWO COLUMN SPLIT ARCHITECTURE GRAPHIC GRID ─── */}
      <main className="flex-grow w-full grid grid-cols-1 gap-4 items-start mb-3">
        
       
        {/* RIGHT ACTION ARCHITECTURE PANEL: GRAPHICS & MATRICES */}
        <section className="flex flex-col gap-4 w-full min-w-0">
          
          {/* TOP GRAPHIC HERO BANNER BLOCK WITH VERIFIED IMAGE PLACEHOLDER */}
          <div className="relative border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center overflow-hidden min-h-[140px] gap-4 sm:gap-0">
            
            {/* Dark glassmorphic gradient scrim protector overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#020e1c] via-[#020e1c]/70 to-[#020e1c] z-20"></div>

            <div className="flex items-center gap-4 z-30 min-w-0 relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#005f73] to-[#00d2ff] flex justify-center items-center text-xl shadow-[0_0_15px_rgba(0,210,255,0.2)] flex-shrink-0">
                <FaChartLine />
              </div>
              <div className="min-w-0">
                <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                  {t.mainHeading} <span className="text-xs text-gray-400 font-normal">({t.mainHeadingSub})</span>
                </h2>
                <p className="text-xs text-gray-300 mt-0.5 leading-normal truncate max-w-[500px] md:whitespace-normal md:overflow-visible">{t.mainDesc}</p>
              </div>
            </div>

            {/* Dropdown Matrix Section wrapper overlay */}
            <div className="flex flex-col gap-1.5 z-30 w-full sm:w-56 flex-shrink-0 relative">
              <label className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide">{t.selectStateLabel}</label>
              <div className="relative">
                <select 
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-[#020b14] border border-white/10 rounded-lg p-2.5 pl-3 pr-10 text-xs font-bold text-white focus:outline-none focus:border-[#00d2ff] cursor-pointer transition-colors appearance-none"
                >
                  <option value="Bhopal">Bhopal (Madhya Pradesh)</option>
                  <option value="Chennai">Chennai (Tamil Nadu)</option>
                </select>
                <FaChevronDown className="absolute right-3.5 top-3.5 text-gray-400 text-[10px] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* FOUR QUADRANT SUMMARY METRICS CARD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            
            {/* Card Matrix Unit 1 */}
            <div className="bg-[#021326]/60 border border-white/10 border-l-4 border-l-cyan-500 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex justify-center items-center text-sm flex-shrink-0"><FaWallet /></div>
              <div>
                <span className="block text-[11px] font-semibold text-gray-400 leading-none">{t.card1Title}</span>
                <span className="block text-[9px] text-gray-500 mt-0.5">{t.card1Sub}</span>
                <span className="block text-base md:text-lg font-black text-white mt-1.5 tracking-wide">₹ {currentMetrics.sanctioned} Cr</span>
              </div>
            </div>

            {/* Card Matrix Unit 2 */}
            <div className="bg-[#021326]/60 border border-white/10 border-l-4 border-l-emerald-500 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex justify-center items-center text-sm flex-shrink-0"><FaWallet /></div>
              <div>
                <span className="block text-[11px] font-semibold text-gray-400 leading-none">{t.card2Title}</span>
                <span className="block text-[9px] text-gray-500 mt-0.5">{t.card2Sub}</span>
                <span className="block text-base md:text-lg font-black text-white mt-1.5 tracking-wide">₹ {currentMetrics.spent} Cr</span>
              </div>
            </div>

            {/* Card Matrix Unit 3 */}
            <div className="bg-[#021326]/60 border border-white/10 border-l-4 border-l-purple-500 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex justify-center items-center text-sm flex-shrink-0"><FaPercentage /></div>
              <div>
                <span className="block text-[11px] font-semibold text-gray-400 leading-none">{t.card3Title}</span>
                <span className="block text-[9px] text-gray-500 mt-0.5">{t.card3Sub}</span>
                <span className="block text-base md:text-lg font-black text-white mt-1.5 tracking-wide">{currentMetrics.util}%</span>
              </div>
            </div>

            {/* Card Matrix Unit 4 */}
            <div className="bg-[#021326]/60 border border-white/10 border-l-4 border-l-amber-500 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex justify-center items-center text-sm flex-shrink-0"><FaFolder /></div>
              <div>
                <span className="block text-[11px] font-semibold text-gray-400 leading-none">{t.card4Title}</span>
                <span className="block text-[9px] text-gray-500 mt-0.5">{t.card4Sub}</span>
                <span className="block text-base md:text-lg font-black text-white mt-1.5 tracking-wide">{currentMetrics.projects}</span>
              </div>
            </div>

          </div>

          {/* TWO GRAPHICAL ANALYTICAL PANEL BLOCKS */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-4 w-full items-stretch">
            
            {/* GRAPH COMPONENT A: BAR ANALYTICS INSIGHTS */}
            <div className="bg-[#020e1c]/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between backdrop-blur-md">
              <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-4">
                <div>
                  <h3 className="text-xs md:text-sm font-bold text-white">{t.chart1Title}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{t.chart1Sub}</p>
                </div>
                <div className="flex items-center gap-1 bg-[#010811] border border-white/10 p-1.5 rounded-lg text-[10px] text-gray-300 font-semibold cursor-pointer">
                  <FaCalendarAlt className="text-cyan-400" /> <span>{t.finYearLabel}</span> <FaChevronDown className="text-[8px]" />
                </div>
              </div>

              {/* Vector Bar Chart Blueprint Layout Frame mock */}
              <div className="h-[200px] w-full flex flex-col justify-between pt-2">
                <div className="flex-grow w-full flex items-end justify-between gap-1 border-b border-white/10 pb-1 relative">
                  {/* Grid overlay rules line metrics */}
                  <div className="absolute left-0 right-0 top-0 border-t border-white/5 text-[9px] text-gray-600 font-mono pt-0.5">800 Cr</div>
                  <div className="absolute left-0 right-0 top-1/4 border-t border-white/5 text-[9px] text-gray-600 font-mono pt-0.5">600 Cr</div>
                  <div className="absolute left-0 right-0 top-2/4 border-t border-white/5 text-[9px] text-gray-600 font-mono pt-0.5">400 Cr</div>
                  <div className="absolute left-0 right-0 top-3/4 border-t border-white/5 text-[9px] text-gray-600 font-mono pt-0.5">200 Cr</div>

                  {/* Twelve cyclical calendar data bar representations */}
                  {["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((month, idx) => (
                    <div key={idx} className="flex flex-col items-center flex-grow group z-10">
                      <div className="flex gap-[2px] items-end h-[140px] justify-center w-full">
                        <div className="bg-cyan-500 rounded-t-sm w-[6px] md:w-2 transition-all group-hover:brightness-110" style={{ height: `${60 + (idx % 3) * 12}%` }}></div>
                        <div className="bg-emerald-500 rounded-t-sm w-[6px] md:w-2 transition-all group-hover:brightness-110" style={{ height: `${45 + (idx % 3) * 10}%` }}></div>
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 mt-2 font-mono">{month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legends Insertion Block */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center pt-3 border-t border-white/5 mt-3 text-[10px] text-gray-400 font-semibold">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cyan-500 inline-block"></span> {t.chart1Legend1}</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span> {t.chart1Legend2}</div>
              </div>
            </div>

            {/* GRAPH COMPONENT B: DONUT BREAKDOWN DIAGRAM */}
            <div className="bg-[#020e1c]/50 border border-white/10 rounded-xl p-4 flex flex-col justify-between backdrop-blur-md">
              <div className="border-b border-white/5 pb-2.5 mb-4">
                <h3 className="text-xs md:text-sm font-bold text-white">{t.chart2Title}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{t.chart2Sub}</p>
              </div>

              {/* Concentric vector representation widget mockup */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-32 h-32 rounded-full border-[14px] border-cyan-500 relative flex flex-col justify-center items-center shadow-lg bg-black/20" style={{ borderTopColor: '#a855f7', borderRightColor: '#f59e0b', borderBottomColor: '#10b981' }}>
                  <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase leading-none">{t.chart2Total}</span>
                  <span className="text-xs font-black text-white mt-1 text-center leading-none">₹{currentMetrics.sanctioned}<br/><span className="text-[9px] font-normal text-gray-400">Cr</span></span>
                </div>
              </div>

              {/* Comprehensive Metric Percent Segments representation index list */}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/5 text-[11px]">
                <div className="flex justify-between items-center bg-[#010811]/40 p-1.5 rounded border border-white/5">
                  <div className="flex items-center gap-2 text-gray-300 font-medium"><span className="w-2 h-2 rounded-full bg-cyan-500 inline-block"></span> {t.cat1}</div>
                  <span className="font-mono text-xs font-bold text-white">43.34%</span>
                </div>
                <div className="flex justify-between items-center bg-[#010811]/40 p-1.5 rounded border border-white/5">
                  <div className="flex items-center gap-2 text-gray-300 font-medium"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> {t.cat2}</div>
                  <span className="font-mono text-xs font-bold text-white">30.21%</span>
                </div>
                <div className="flex justify-between items-center bg-[#010811]/40 p-1.5 rounded border border-white/5">
                  <div className="flex items-center gap-2 text-gray-300 font-medium"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span> {t.cat3}</div>
                  <span className="font-mono text-xs font-bold text-white">16.53%</span>
                </div>
                <div className="flex justify-between items-center bg-[#010811]/40 p-1.5 rounded border border-white/5">
                  <div className="flex items-center gap-2 text-gray-300 font-medium"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span> {t.cat4}</div>
                  <span className="font-mono text-xs font-bold text-white">9.92%</span>
                </div>
              </div>
            </div>

          </div>

          {/* LOWER DATA PREVIEW SHEET COMPONENT: SYSTEM DATA TABLE */}
          <div className="bg-[#020e1c]/50 border border-white/10 rounded-xl p-4 backdrop-blur-md w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-3 mb-4 gap-2 sm:gap-0">
              <div>
                <h3 className="text-xs md:text-sm font-bold text-white">
                  {t.tableTitle} {selectedState} <span className="text-xs text-gray-400 font-normal">({selectedState} {t.tableSub})</span>
                </h3>
              </div>
              <button className="bg-transparent hover:bg-white/5 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 p-[6px_14px] rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 uppercase">
                {t.viewAllBtn} <FaArrowRight className="text-[10px]" />
              </button>
            </div>

            {/* Responsive Table Wrapper block frame */}
            <div className="w-full overflow-x-auto rounded-lg border border-white/5 bg-[#010811]/40">
              <table className="w-full text-left border-collapse min-w-[700px] text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#021326]/60 text-gray-400 uppercase text-[10px] font-bold tracking-wide">
                    <th className="p-3.5">{t.thProject}</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Contractor</th>
                    <th className="p-3.5 text-right">{t.thSanctioned}</th>
                    <th className="p-3.5 text-right">{t.thSpent}</th>
                    <th className="p-3.5">{t.thUtil}</th>
                    <th className="p-3.5 text-center">{t.thStatus}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-200 font-medium">
                  {tableData.map((row, index) => (
                    <tr key={index} className="hover:bg-white/[2%] transition-colors">
                     <td className="p-3.5 font-semibold text-white max-w-[280px] truncate">{row.name}</td>
                     <td className="p-3.5 text-gray-300">{row.type}</td>
                     <td className="p-3.5 text-gray-300">{row.contractor}</td>
                      <td className="p-3.5 text-right font-mono text-cyan-400 font-bold">{row.sanc}</td>
                      <td className="p-3.5 text-right font-mono text-emerald-400 font-bold">{row.spent}</td>
                      <td className="p-3.5 min-w-[130px]">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] w-10 flex-shrink-0 text-gray-300">{row.pct}%</span>
                          <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full rounded-full" style={{ width: `${row.pct}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-center flex-shrink-0">
                        {row.status === "In Progress" ? (
                          <span className="inline-block p-[3px_10px] text-[10px] font-bold tracking-wide rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">{t.badgeInProg}</span>
                        ) : (
                          <span className="inline-block p-[3px_10px] text-[10px] font-bold tracking-wide rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">{t.badgePlanned}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </section>
      </main>

      {/* ─── TECHNICAL BOUNDARY SAFETY LEGAL FOOTER ─── */}
      <footer className="w-full border-t border-white/10 pt-2.5 text-center flex-shrink-0">
        <p className="text-[10px] text-gray-500 flex flex-row items-center justify-center gap-1.5 px-4 leading-relaxed">
          <FaInfoCircle className="text-[#00d2ff] flex-shrink-0 text-xs" />
          <span>{t.bottomNotice}</span>
        </p>
      </footer>

    </div>
  );
}