import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaRoad, FaHouseUser, FaChevronDown, FaExclamationTriangle, 
  FaClipboardList, FaRobot, FaChartPie, FaBookOpen, 
  FaPlus, FaFileAlt, FaMapMarkerAlt, FaExclamation, 
  FaUserCircle, FaArrowRight, FaInfoCircle 
} from 'react-icons/fa';

export default function CitizenHome() {
  const [lang, setLang] = useState('en');
  const navigate = useNavigate();


  const content = {
    en: {
      title: "Road e-Complaint Portal",
      home: "Citizen Home",
      languageLabel: "Language",
      welcome: "Welcome!",
      subtitle: "How can we help you today?",
      fileBtn: "File Road Complaint",
      fileDesc: "Raise a new road-related complaint and get assistance.",
      myBtn: "My Complaints",
      myDesc: "View and track your complaints.",
      aiBtn: "AI Chatbot",
      aiDesc: "Get instant answers to your queries.",
      budgetBtn: "Budget",
      budgetDesc: "View department budget information.",
      noticeBtn: "Notices & Updates",
      noticeDesc: "View latest notices, circulars and updates.",
      eComplaints: "e-Complaints",
      raiseBtn: "Raise a Complaint",
      complaintId: "Complaint ID",
      locationLabel: "Location",
      dateLabel: "Date",
      updatedLabel: "Last Updated",
      status: "In Progress",
      viewDetails: "View Details",
      viewAllComplaints: "View All Complaints",
      nearbyTitle: "Nearby Road Complaints",
      viewAll: "View All",
      potholes: "Potholes",
      damaged: "Damaged Road",
      water: "Water Logging",
      footpath: "Broken Footpath",
      other: "Other Issues",
      helpline: "For any assistance, please contact our helpline."
    },
    hi: {
      title: "सड़क ई-शिकायत पोर्टल",
      home: "सिटीजन होम",
      languageLabel: "भाषा",
      welcome: "स्वागत हैं!",
      subtitle: "हम आज आपकी कैसे सहायता कर सकते हैं?",
      fileBtn: "सड़क शिकायत दर्ज करें",
      fileDesc: "नई सड़क संबंधी शिकायत दर्ज करें और सहायता प्राप्त करें।",
      myBtn: "मेरी शिकायतें",
      myDesc: "अपनी शिकायतें देखें और उनकी स्थिति जानें।",
      aiBtn: "एआई चैटबॉट",
      aiDesc: "अपने प्रश्नों के त्वरित उत्तर प्राप्त करें।",
      budgetBtn: "बजट",
      budgetDesc: "विभागीय बजट की जानकारी देखें।",
      noticeBtn: "सूचनाएं और अपडेट",
      noticeDesc: "नवीनतम सूचनाएं, परिपत्र और अपडेट देखें।",
      eComplaints: "ई-शिकायतें",
      raiseBtn: "शिकायत दर्ज करें",
      complaintId: "शिकायत आईडी",
      locationLabel: "स्थान",
      dateLabel: "दिनांक",
      updatedLabel: "अंतिम अपडेट",
      status: "प्रगति पर",
      viewDetails: "विवरण देखें",
      viewAllComplaints: "सभी शिकायतें देखें",
      nearbyTitle: "आपके आसपास की सड़क शिकायतें",
      viewAll: "सभी देखें",
      potholes: "गड्ढे",
      damaged: "क्षतिग्रस्त सड़क",
      water: "जलभराव",
      footpath: "टूटी फुटपाथ",
      other: "अन्य समस्याएं",
      helpline: "किसी भी सहायता के लिए हमारी हेल्पलाइन से संपर्क करें।"
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen text-white p-4 md:p-5 font-sans bg-[#020b14] bg-[radial-gradient(circle_at_50%_0%,_#07223d_0%,_#020b14_70%)]">
      
      {/* Top Navbar */}
      <header className="flex flex-col sm:flex-row justify-between items-center p-4 md:p-[15px_25px] bg-[#03101f]/80 border border-white/10 rounded-xl mb-5 backdrop-blur-md gap-4 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="bg-gradient-to-br from-[#005f73] to-[#00d2ff] w-11 h-11 rounded-full flex justify-center items-center text-xl flex-shrink-0 shadow-[0_0_15px_rgba(0,210,255,0.3)]">
            <FaRoad />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-semibold tracking-wide">{t.title}</h1>
          </div>
        </div>
        
        <nav className="flex items-center">
          <span onClick={() => navigate('/citizen')} className="text-[#00d2ff] no-underline text-sm font-medium border-b-2 border-[#00d2ff] py-1 px-1 flex items-center gap-1.5 cursor-pointer">
            <FaHouseUser /> {t.home}
          </span>
        </nav>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 md:gap-6 w-full sm:w-auto border-t border-white/5 sm:border-none pt-3 sm:pt-0">
          <div className="flex items-center gap-2.5 text-xs text-[#90a0b2]">
            <span>{t.languageLabel}</span>
            <button 
              onClick={() => setLang('en')} 
              className={`bg-transparent border border-white/10 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-all ${lang === 'en' ? 'bg-[#00d2ff]/10 border-[#00d2ff] text-[#00d2ff] font-semibold' : 'text-[#90a0b2]'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLang('hi')} 
              className={`bg-transparent border border-white/10 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-all ${lang === 'hi' ? 'bg-[#00d2ff]/10 border-[#00d2ff] text-[#00d2ff] font-semibold' : 'text-[#90a0b2]'}`}
            >
              हिंदी
            </button>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-sm">
            <FaUserCircle className="text-xl text-[#00d2ff]" />
            <span>Rishi</span>
            <FaChevronDown className="text-xs" />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto">
        
     {/* Hero Banner Section */}
<section className="relative min-h-[140px] md:h-[180px] rounded-2xl border border-white/10 overflow-hidden flex flex-row items-center justify-between p-4 md:p-6 md:px-10 mb-5 gap-2 md:gap-0">
  
  <img 
    src="/Road.jpg" 
    alt="Road Background" 
    className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
  />
  
  <div className="absolute inset-0 bg-gradient-to-r from-[#020b14] via-[#020b14]/80 to-[#020b14] z-10"></div>

  {/* Left Container: Avatar + Welcome Text */}
  <div className="relative z-20 flex flex-row items-center gap-2.5 md:gap-6 flex-nowrap min-w-0">
    <div className="w-[50px] h-[50px] md:w-[90px] md:h-[90px] rounded-full border-2 border-[#00d2ff]/40 flex justify-center items-center flex-shrink-0 shadow-[0_0_20px_rgba(0,210,255,0.2)] overflow-hidden">
      <img 
        src="/Road3.jpg" 
        alt="Profile" 
        className="w-full h-full object-cover" 
      />
    </div>
    <div className="min-w-0 flex flex-col justify-center">
      <h1 className="text-base md:text-2xl text-[#00d2ff] font-bold whitespace-nowrap overflow-hidden text-ellipsis">{t.welcome}</h1>
      <p className="text-[10px] md:text-sm text-gray-200 mt-1 whitespace-nowrap overflow-hidden text-ellipsis md:whitespace-normal md:overflow-visible">{t.subtitle}</p>
    </div>
  </div>

  {/* Right Container: Better Roads Badge */}
  <div className="relative z-20 border border-white/20 p-[6px_10px] md:p-[10px_18px] rounded-md flex items-center gap-2 md:gap-4 bg-black/40 flex-shrink-0 self-center">
    <div className="flex flex-col text-[8px] md:text-[11px] font-bold tracking-wider text-right">
      <span>BETTER ROADS</span>
      <span>BETTER JOURNEYS</span>
    </div>
    <div className="text-base md:text-2xl text-[#ffb703] flex-shrink-0">
      <FaExclamationTriangle />
    </div>
  </div>

</section>

        {/* 5-Column Grid Features */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
          
          {/* Card 1: File Complaint*/}
          <div onClick={() => navigate('/citizen/complaint')} className="bg-[#061526]/60 border border-white/10 border-t-4 border-t-[#00d2ff] rounded-xl p-[25px_20px] relative backdrop-blur-md flex flex-col justify-between group hover:translate-y-[-2px] transition-all duration-300 cursor-pointer">
            <div>
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#00d2ff]/15 text-[#00d2ff] mb-5 text-xl">
                <FaRoad />
              </div>
              <h3 className="text-sm font-semibold mb-2">{t.fileBtn}</h3>
              <p className="text-xs text-[#90a0b2] line-clamp-2 leading-relaxed">{t.fileDesc}</p>
            </div>
            <div className="mt-4 flex justify-end text-[#00d2ff] opacity-80"><FaArrowRight /></div>
          </div>

          {/* Card 2: My Complaints */}
          <div onClick={() => navigate('/citizen/history')} className="bg-[#061526]/60 border border-white/10 border-t-4 border-t-[#00ff88] rounded-xl p-[25px_20px] relative backdrop-blur-md flex flex-col justify-between group hover:translate-y-[-2px] transition-all duration-300 cursor-pointer">
            <div>
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#00ff88]/15 text-[#00ff88] mb-5 text-xl">
                <FaClipboardList />
              </div>
              <h3 className="text-sm font-semibold mb-2">{t.myBtn}</h3>
              <p className="text-xs text-[#90a0b2] line-clamp-2 leading-relaxed">{t.myDesc}</p>
            </div>
            <div className="mt-4 flex justify-end text-[#00ff88] opacity-80"><FaArrowRight /></div>
          </div>

          {/* Card 3: AI Chatbot */}
          <div onClick={() => navigate('/citizen/chat')} className="bg-[#061526]/60 border border-white/10 border-t-4 border-t-[#9d4edd] rounded-xl p-[25px_20px] relative backdrop-blur-md flex flex-col justify-between group hover:translate-y-[-2px] transition-all duration-300 cursor-pointer">
            <div>
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#9d4edd]/15 text-[#9d4edd] mb-5 text-xl">
                <FaRobot />
              </div>
              <h3 className="text-sm font-semibold mb-2">{t.aiBtn}</h3>
              <p className="text-xs text-[#90a0b2] line-clamp-2 leading-relaxed">{t.aiDesc}</p>
            </div>
            <div className="mt-4 flex justify-end text-[#9d4edd] opacity-80"><FaArrowRight /></div>
          </div>

          {/* Card 4: Budget */}
          <div onClick={() => navigate('/citizen/budget')} className="bg-[#061526]/60 border border-white/10 border-t-4 border-t-[#ff9f1c] rounded-xl p-[25px_20px] relative backdrop-blur-md flex flex-col justify-between group hover:translate-y-[-2px] transition-all duration-300 cursor-pointer">
            <div>
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#ff9f1c]/15 text-[#ff9f1c] mb-5 text-xl">
                <FaChartPie />
              </div>
              <h3 className="text-sm font-semibold mb-2">{t.budgetBtn}</h3>
              <p className="text-xs text-[#90a0b2] line-clamp-2 leading-relaxed">{t.budgetDesc}</p>
            </div>
            <div className="mt-4 flex justify-end text-[#ff9f1c] opacity-80"><FaArrowRight /></div>
          </div>

          {/* Card 5: Notices */}
          <div onClick={() => navigate('/citizen/history')} className="bg-[#061526]/60 border border-white/10 border-t-4 border-t-[#0077b6] rounded-xl p-[25px_20px] relative backdrop-blur-md flex flex-col justify-between group hover:translate-y-[-2px] transition-all duration-300 cursor-pointer">
            <div>
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#0077b6]/15 text-[#0077b6] mb-5 text-xl">
                <FaBookOpen />
              </div>
              <h3 className="text-sm font-semibold mb-2">{t.noticeBtn}</h3>
              <p className="text-xs text-[#90a0b2] line-clamp-2 leading-relaxed">{t.noticeDesc}</p>
            </div>
            <div className="mt-4 flex justify-end text-[#0077b6] opacity-80"><FaArrowRight /></div>
          </div>

        </section>

        {/* Split Contents Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 mb-5">
          
          {/* Left Panel: Recent Complaints */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-2xl p-4 md:p-5">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-2xl text-[#00d2ff]" />
                <div>
                  <h3 className="text-base md:text-lg font-medium">{t.eComplaints}</h3>
                </div>
              </div>
              {/* Raise a Complaint Button */}
              <button onClick={() => navigate('/citizen/complaint')} className="bg-transparent border border-[#00d2ff] text-[#00d2ff] p-[6px_14px] md:p-[8px_18px] rounded-lg flex items-center gap-2 cursor-pointer hover:bg-[#00d2ff]/10 transition-colors">
                <FaPlus className="text-xs md:text-sm" />
                <span className="text-[11px] font-semibold">{t.raiseBtn}</span>
              </button>
            </div>

            <div className="bg-[#020d1a]/60 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row gap-4 sm:gap-5">
              <div className="w-full sm:w-[130px] h-[100px] rounded-md overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-[#0f253d] border border-dashed border-white/10 flex items-center justify-center text-[11px] text-[#90a0b2]">
                   <img 
                     src="/RoadPothole.jpg" 
                     alt="Profile" 
                      className="w-full h-full object-cover" 
                      />
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between gap-3 sm:gap-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block text-[11px] text-[#90a0b2] mb-0.5">{t.complaintId}</span>
                    <span className="text-xs md:text-sm font-bold tracking-wide">RCMP/2024/000123</span>
                  </div>
                  <div className="bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] p-[4px_10px] md:p-[4px_12px] rounded text-right flex-shrink-0">
                    <span className="block text-[10px] md:text-[11px] font-semibold">{t.status}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[11px] text-[#90a0b2] mb-0.5">{t.locationLabel}</span>
                  <span className="text-xs">MG Road, Near City Hospital, MP</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2">
                  <div>
                    <span className="block text-[11px] text-[#90a0b2] mb-0.5">{t.dateLabel}</span>
                    <span className="text-[11px]">12 May 2026</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] text-[#90a0b2] mb-0.5">{t.updatedLabel}</span>
                    <span className="text-[11px]">15 May 2026</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-5 gap-2">
              <span onClick={() => navigate('/citizen/history')} className="text-[#00d2ff] no-underline text-xs flex items-center gap-1.5 hover:underline cursor-pointer">{t.viewDetails} <FaArrowRight /></span>
              <span onClick={() => navigate('/citizen/history')} className="text-[#00ff88] no-underline text-xs flex items-center gap-1.5 hover:underline cursor-pointer">{t.viewAllComplaints} <FaArrowRight /></span>
            </div>
          </div>

          {/* Right Panel: Live Blueprint Map */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-2xl p-4 md:p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs md:text-sm font-semibold flex items-center gap-1.5 pr-2">
                <FaMapMarkerAlt className="text-[#00d2ff]" />
                <span className="truncate">{t.nearbyTitle}</span>
              </h3>
              {/* Nearby map View All */}
              <span onClick={() => navigate('/citizen/map')} className="text-[#00d2ff] no-underline text-xs hover:underline cursor-pointer flex-shrink-0">{t.viewAll}</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="relative h-[230px] bg-[#041424] rounded-lg border border-white/5 overflow-hidden">
                <div 
                  className="absolute inset-0" 
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                ></div>
                
                <div className="absolute top-[40%] -left-[10%] w-[120%] h-[15px] bg-white/10 text-white/30 text-[10px] flex items-center justify-center -rotate-12 select-none">MG Road</div>
                <div className="absolute bottom-[20%] -left-[10%] w-[120%] h-[15px] bg-white/10 text-white/30 text-[10px] flex items-center justify-center rotate-2 select-none">Tonk Road</div>
                
                <div className="absolute top-[55%] left-[30%] text-[10px] text-white/40">City Hospital</div>
                <div className="absolute bottom-[10%] right-[10%] text-[10px] text-white/40">Jawahar Circle</div>
                
                <div className="absolute w-6 h-6 rounded-full flex justify-center items-center text-[11px] text-white shadow-md bg-[#ff9f1c] top-[25%] left-[20%]"><FaExclamationTriangle /></div>
                <div className="absolute w-6 h-6 rounded-full flex justify-center items-center text-[11px] text-white shadow-md bg-[#0077b6] top-[50%] left-[10%]"><FaRoad /></div>
                <div className="absolute w-7 h-7 rounded-full flex justify-center items-center text-sm font-bold bg-[#e63946] shadow-[0_0_15px_#e63946] top-[65%] left-[45%]"><FaExclamation /></div>
                <div className="absolute w-6 h-6 rounded-full flex justify-center items-center text-[11px] text-white shadow-md bg-[#ff9f1c] top-[25%] left-[75%]"><FaExclamationTriangle /></div>
                <div className="absolute w-6 h-6 rounded-full flex justify-center items-center text-[11px] text-white shadow-md bg-[#9d4edd] bottom-[20%] left-[60%]"><FaRoad /></div>
                <div className="absolute w-6 h-6 rounded-full flex justify-center items-center text-[11px] text-white shadow-md bg-[#ff9f1c] bottom-[45%] left-[55%]"><FaExclamationTriangle /></div>
                <div className="absolute w-6 h-6 rounded-full flex justify-center items-center text-[11px] text-white shadow-md bg-[#00b4d8] top-[40%] right-[15%]"><FaRoad /></div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full inline-block bg-[#ff9f1c]"></span> {t.potholes}</div>
                <div className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full inline-block bg-[#e63946]"></span> {t.damaged}</div>
                <div className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full inline-block bg-[#00d2ff]"></span> {t.water}</div>
                <div className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full inline-block bg-[#9d4edd]"></span> {t.footpath}</div>
                <div className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full inline-block bg-[#00b4d8]"></span> {t.other}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Footer Helpline */}
        <footer className="border-t border-white/10 pt-4 text-center mt-6">
          <p className="text-xs text-[#90a0b2] flex flex-row items-center justify-center gap-1.5 px-4 leading-relaxed">
            <FaInfoCircle className="text-[#00d2ff] flex-shrink-0" />
            <span>{t.helpline}</span>
          </p>
        </footer>

      </main>
    </div>
  );
}