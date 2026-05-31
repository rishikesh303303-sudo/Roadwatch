import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaRoad, FaPaperPlane, FaPaperclip, FaRobot, FaCommentAlt, 
  FaQuestionCircle, FaHeadset, FaCommentDots, FaChevronDown, 
  FaUserCircle, FaChevronRight, FaPlus, FaClipboardList, 
  FaMapMarkerAlt, FaPhoneAlt, FaLightbulb, FaInfoCircle, 
  FaFileAlt, FaGlobe, FaCamera 
} from 'react-icons/fa';

export default function CitizenChat() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [activeLang, setActiveLang] = useState('en');
  const [langSelected, setLangSelected] = useState(false)
  const sendMessage = async (text) => {
  if (!text.trim()) return

  const userMsg = { role: 'user', content: text, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
  setMessages(prev => [...prev, userMsg])
  setInputText('')
  setIsLoading(true)

  try {
    const response =await fetch(`${import.meta.env.VITE_API_URL}/api/chatbot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, language: activeLang })
    })
    const data = await response.json()
    const botReply = data.reply || 'Sorry, I could not process your request.';

    const botMsg = {
      role: 'assistant',
      content: botReply,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, botMsg])
  } catch (err) {
    console.error('Groq error:', err)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Sorry, something went wrong. Please try again.',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }])
  } finally {
    setIsLoading(false)
  }
}
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const translations = {
    en: {
      portalTitle: "Road e-Complaint Portal",
      portalSub: "सड़क ई-शिकायत पोर्टल",
      homeNav: "Home",
      chatbotNav: "AI Chatbot",
      langLabel: "Language / भाषा",
      userName: "Rishi",
      aiAssistant: "AI Road Assistant",
      aiStatus: "Online",
      tagline: "Always with you",
      newChat: "New Chat",
      menuHeader: "Navigation / मेनू",
      myConversations: "My Conversations",
      faqs: "FAQs",
      helpSupport: "Help & Support",
      feedback: "Feedback",
      popularQueries: "Popular Queries / लोकप्रिय प्रश्न",
      queries: [
        "How to file a complaint?",
        "How to track complaint status?",
        "What types of complaints can be filed?",
        "How long does resolution take?",
        "Can I complain anonymously?"
      ],
      viewAllFaqs: "View All FAQs",
      welcomeMsg: "Hello! I am your AI Road Assistant. 🙏",
      welcomeDesc: "I can help you with your road-related complaints and information. Please choose your language and ask your question.",
      chooseLang: "Choose your language / अपनी भाषा चुनें",
      userMsg: "I want to file a complaint about a road pothole.",
      botResponse1: "Alright! You can file a complaint related to a Pothole.",
      botResponse2: "Please choose from the options below or I can guide you further.",
      helpHeading: "How can I help you today?",
      action1Title: "File Complaint",
      action1Desc: "File a new road issue",
      action2Title: "My Complaints",
      action2Desc: "Track filed issues status",
      action3Title: "Complaint Info",
      action3Desc: "Get resolution timelines",
      action4Title: "Location Details",
      action4Desc: "Check regional road health",
      inputPlaceholder: "Type your message...",
      inputSub: "You can send text or image",
      quickActionsTitle: "Quick Actions / त्वरित कार्य",
      tipTitle: "Tips / सुझाव",
      tips: [
        "Provide clear location details",
        "Upload clear and bright images",
        "Select appropriate issue category",
        "Describe the impact on traffic"
      ],
      langSupportTitle: "Language Support / भाषा सहायता",
      langSupportDesc: "We support the following languages",
      langFooter: "Choose your preferred language and talk to us.",
      bottomNotice: "Information provided by AI is for general guidance only. For official escalations, contact the concerned department."
    },
    hi: {
      portalTitle: "सड़क ई-शिकायत पोर्टल",
      portalSub: "Road e-Complaint Portal",
      homeNav: "होमपेज",
      chatbotNav: "एआई चैटबॉट",
      langLabel: "भाषा / Language",
      userName: "ऋषि",
      aiAssistant: "एआई रोड असिस्टेंट",
      aiStatus: "ऑनलाइन",
      tagline: "आपके साथ, हमेशा",
      newChat: "नया चैट दर्ज करें",
      menuHeader: "नेविगेशन / मेनू",
      myConversations: "मेरी बातचीत",
      faqs: "अक्सर पूछे जाने वाले प्रश्न",
      helpSupport: "सहायता और समर्थन",
      feedback: "प्रतिक्रिया दें",
      popularQueries: "लोकप्रिय प्रश्न / Popular Queries",
      queries: [
        "शिकायत कैसे दर्ज करें?",
        "शिकायत की स्थिति कैसे देखें?",
        "कौन-कौन सी शिकायतें दर्ज कर सकते हैं?",
        "शिकायत निवारण में कितना समय लगता है?",
        "क्या मैं गुमनाम रूप से शिकायत कर सकता हूँ?"
      ],
      viewAllFaqs: "सभी प्रश्न देखें",
      welcomeMsg: "नमस्ते! मैं आपका AI Road Assistant हूँ। 🙏",
      welcomeDesc: "मैं आपकी सड़क संबंधित शिकायतों और जानकारी में आपकी मदद कर सकता हूँ। आप अपनी bhasha चुनें और अपना सवाल पूछें।",
      chooseLang: "अपनी भाषा चुनें / Choose your language",
      userMsg: "मुझे गड्ढे वाली सड़क की शिकायत करनी है।",
      botResponse1: "ठीक बा! आप गड्ढा (Pothole) से जुड़ी शिकायत दर्ज कर सकतीनी।",
      botResponse2: "कृपया नीचे दिए गए विकल्प में से चुनें या मैं आपकी मदद कर सकता हूँ।",
      helpHeading: "मैं आपकी कैसे मदद कर कर सकता हूँ?",
      action1Title: "शिकायत दर्ज करें",
      action1Desc: "नई सड़क शिकायत दर्ज करें",
      action2Title: "मेरी शिकायतें",
      action2Desc: "अपनी शिकायतों की स्थिति देखें",
      action3Title: "शिकायत की जानकारी",
      action3Desc: "शिकायत से जुड़ी सभी जानकारी पाएँ",
      action4Title: "स्थान की जानकारी",
      action4Desc: "किसी स्थान की सड़क स्थिति जानें",
      inputPlaceholder: "अपना संदेश लिखें...",
      inputSub: "आप टेक्स्ट या इमेज भेज सकते हैं",
      quickActionsTitle: "त्वरित कार्य / Quick Actions",
      tipTitle: "सुझाव / Tips",
      tips: [
        "अपनी समस्या स्पष्ट रूप से लिखें",
        "स्थान की सही जानकारी प्रदान करें",
        "साफ और स्पष्ट फोटो अपलोड करें",
        "शिकायत के निवारण में सहायता मिलेगी"
      ],
      langSupportTitle: "भाषा सहायता / Language Support",
      langSupportDesc: "हम निम्न भाषाओं में आपकी सहायता करते हैं",
      langFooter: "अपनी पसंदीदा भाषा चुनें और हमसे बात करें।",
      bottomNotice: "AI Assistant द्वारा दी गई जानकारी सामान्य हैं। अधिक जानकारी या सहायता के लिए संबंधित विभाग से संपर्क करें।"
    },
    bhoj: {
      portalTitle: "सड़क ई-शिकायत पोर्टल",
      portalSub: "Road e-Complaint Portal",
      homeNav: "घर",
      chatbotNav: "एआई चैटबॉट",
      langLabel: "भाषा / Language",
      userName: "ऋषि",
      aiAssistant: "एआई रोड असिस्टेंट",
      aiStatus: "ऑनलाइन",
      tagline: "रउआ संगे, हरदम",
      newChat: "नया चैट शुरू करीं",
      menuHeader: "नेविगेशन / मेनू",
      myConversations: "हमार बातचीत",
      faqs: "सवाल-जवाब",
      helpSupport: "मदद आ सहायता",
      feedback: "विचार बताईं",
      popularQueries: "बेसी पूछल जाए वाला सवाल",
      queries: [
        "शिकायत कइसे दर्ज करीं?",
        "शिकायत के स्थिति कइसे देखीं?",
        "कवन-कवन शिकायत दर्ज कइल जा सकेला?",
        "शिकायत ठीक होखे में कतना समय लागेला?",
        "का हम बिना नाम बतइले शिकायत कर सक्तीं?"
      ],
      viewAllFaqs: "सभ सवाल देखीं",
      welcomeMsg: "प्रणाम! हम रउआर एआई रोड असिस्टेंट हईं। 🙏",
      welcomeDesc: "हम रउआर सड़क से जुड़ल शिकायत आ जानकारी में मदद कर सकिला। आपन भाषा चुनीं आ सवाल पूछीं।",
      chooseLang: "आपन भाषा चुनीं / Choose your language",
      userMsg: "हमरा खाल्ह-खदक वाली सड़क के शिकायत करे के बा।",
      botResponse1: "ठीक बा! रउआ खाल्ह-खदक (Pothole) से जुड़ल शिकायत दर्ज कर सकिला।",
      botResponse2: "कृपा कइके नीचे दिहल गइल विकल्प में से चुनीं या हम रउआर मदद कर सकिला।",
      helpHeading: "हम रउआर कइसे मदद कर सकिला?",
      action1Title: "शिकायत दर्ज करीं",
      action1Desc: "नया सड़क शिकायत लिखीं",
      action2Title: "हमार शिकायत",
      action2Desc: "आपन शिकायत के स्थिति देखीं",
      action3Title: "शिकायत के जानकारी",
      action3Desc: "शिकायत से जुड़ल सभ जानकारी पाईं",
      action4Title: "जगह के जानकारी",
      action4Desc: "कवनो जगह के सड़क के हाल जानीं",
      inputPlaceholder: "आपन बात लिखीं...",
      inputSub: "रउआ मैसेज चाहे फोटो भेज सकिला",
      quickActionsTitle: "झटपट काम / Quick Actions",
      tipTitle: "सलाह / Tips",
      tips: [
        "आपन समस्या एकदम साफ-साफ लिखीं",
        "जगह के एकदम सही जानकारी दीं",
        "साफ आ अजोर वाली फोटो अपलोड करीं",
        "शिकायत के जल्दी निपटारा में मदद मिली"
      ],
      langSupportTitle: "भाषा सहायता / Language Support",
      langSupportDesc: "हम ई सभ भाषा में मदद करिला",
      langFooter: "आपन मनपसंद भाषा चुनीं आ हमसे बात करीं।",
      bottomNotice: "एआई असिस्टेंट द्वारा दिहल गइल जानकारी आम जानकारी ह। बेसी मदद खातिर संबंधित विभाग से संपर्क करीं।"
    }
  };

  const t = translations[activeLang];

  return (
    <div className="min-h-screen text-white font-sans bg-[#010811] bg-[radial-gradient(circle_at_50%_0%,_#05182d_0%,_#010811_75%)] p-2 md:p-4 select-none flex flex-col justify-between overflow-x-hidden">
      
      {/* GLOBAL TOP NAVIGATION HEADER */}
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
            {t.chatbotNav}
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

      {/* THREE COLUMN PORTAL GRID LAYOUT */}
      <main className="flex-grow w-full grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr_320px] gap-4 items-stretch min-h-0 overflow-hidden mb-3">
        
        {/* PANEL LEFT: SIDEBAR SYSTEM CONTROLS */}
        <section className="bg-[#020e1c]/50 border border-white/10 rounded-xl p-3 backdrop-blur-md flex flex-col justify-between hidden md:flex">
          <div className="flex flex-col gap-4">
            
            {/* AI Agent Status Tracker Banner */}
            <div className="flex items-center gap-2.5 p-2.5 bg-[#03162b]/80 border border-white/5 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex justify-center items-center text-lg text-[#00d2ff] flex-shrink-0">
                <FaRobot />
              </div>
              <div>
                <h2 className="text-xs font-bold text-gray-200">{t.aiAssistant}</h2>
                <span className="text-[10px] text-gray-400 block">{t.tagline}</span>
                <span className="text-[9px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span> {t.aiStatus}
                </span>
              </div>
            </div>

            {/* Action Trigger Tab triggers */}
            <button className="w-full bg-gradient-to-r from-[#12132e] to-[#201540] border border-[#7d4cf4]/40 hover:border-[#7d4cf4] text-white p-3 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-2 shadow-[0_0_10px_rgba(125,76,244,0.15)] uppercase tracking-wide">
              <FaCommentAlt className="text-[#a855f7] text-sm" /> {t.newChat}
            </button>

            <div className="flex flex-col gap-2 mt-1">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1 mb-1">{t.menuHeader}</span>
              <button className="w-full bg-transparent hover:bg-white/5 border-none text-gray-300 hover:text-white p-2.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-2.5 transition-colors text-left">
                <FaCommentDots className="text-[#00d2ff] text-sm" /> {t.myConversations}
              </button>
              <button className="w-full bg-transparent hover:bg-white/5 border-none text-gray-300 hover:text-white p-2.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-2.5 transition-colors text-left">
                <FaQuestionCircle className="text-amber-400" /> {t.faqs}
              </button>
              <button className="w-full bg-transparent hover:bg-white/5 border-none text-gray-300 hover:text-white p-2.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-2.5 transition-colors text-left">
                <FaHeadset className="text-emerald-400" /> {t.helpSupport}
              </button>
              <button className="w-full bg-transparent hover:bg-white/5 border-none text-gray-300 hover:text-white p-2.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-2.5 transition-colors text-left">
                <span className="text-xs">⭐</span> {t.feedback}
              </button>
            </div>

            {/* Strict Placement: Popular Queries List block */}
            <div className="flex flex-col gap-1.5 mt-3">
              <span className="text-[10px] font-bold text-[#00d2ff] uppercase tracking-wider px-1 mb-1">{t.popularQueries}</span>
              {t.queries.map((query, idx) => (
                <button key={idx} className="w-full bg-transparent hover:bg-white/5 border-none text-gray-400 hover:text-white p-2 text-xs font-semibold transition-all cursor-pointer flex justify-between items-center text-left rounded-md group">
                  <span className="truncate pr-1 group-hover:text-white">{query}</span>
                  <FaChevronRight className="text-[9px] text-gray-600 group-hover:text-[#00d2ff] flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-transparent hover:bg-[#00d2ff]/5 border border-[#00d2ff]/30 text-[#00d2ff] p-2.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex justify-center items-center gap-2 mt-4">
            {t.viewAllFaqs} <FaChevronRight className="text-[9px]" />
          </button>
        </section>

        {/* PANEL MID: COMPREHENSIVE CONVERSATION HUB VIEWPORT */}
        <section className="bg-[#020e1c]/30 border border-white/10 rounded-xl backdrop-blur-md flex flex-col overflow-hidden min-w-0 h-[74vh] md:h-[80vh]">
          
          {/* Internal Scroll Screen Wrapper */}
          <div className="flex-grow p-3 md:p-4 overflow-y-auto space-y-4 leading-relaxed scrollbar-thin">
            
            {/* System Welcome Message */}
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-9 h-9 rounded-full bg-[#1e2056] border border-[#4d52cc]/50 flex justify-center items-center text-xs flex-shrink-0 text-[#8b91ff]">
                <FaRobot className="text-sm" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="bg-[#03152b] border border-white/5 rounded-xl p-3.5 shadow-md">
                  <p className="text-sm font-bold text-white mb-1">{t.welcomeMsg}</p>
                  <p className="text-xs text-gray-200 leading-normal">{t.welcomeDesc}</p>
                </div>
                <span className="text-[10px] text-gray-500 font-mono px-1">10:30 AM</span>
              </div>
            </div>
            
{messages.map((msg, idx) => (
  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'gap-3'} max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : ''}`}>
    {msg.role === 'assistant' && (
      <div className="w-9 h-9 rounded-full bg-[#1e2056] border border-[#4d52cc]/50 flex justify-center items-center text-xs flex-shrink-0 text-[#8b91ff]">
        <FaRobot className="text-sm" />
      </div>
    )}
    <div className="flex flex-col gap-1">
      <div className={`${msg.role === 'user' ? 'bg-[#004b66]/60 border border-[#00d2ff]/30 rounded-xl rounded-tr-none' : 'bg-[#03152b] border border-white/5 rounded-xl'} p-3 shadow-md`}>
        <p className="text-xs text-white leading-relaxed">{msg.content}</p>
      </div>
      <span className="text-[10px] text-gray-500 font-mono px-1">{msg.time}</span>
    </div>
  </div>
))}

{/* Loading indicator */}
{isLoading && (
  <div className="flex gap-3 max-w-[85%]">
    <div className="w-9 h-9 rounded-full bg-[#1e2056] border border-[#4d52cc]/50 flex justify-center items-center text-xs flex-shrink-0 text-[#8b91ff]">
      <FaRobot className="text-sm" />
    </div>
    <div className="bg-[#03152b] border border-white/5 rounded-xl p-3">
      <div className="flex gap-1 items-center">
        <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
)}

            {/* Language */}
            {!langSelected && (

            <div className="ml-12 bg-[#031326]/60 border border-white/5 rounded-xl p-3 max-w-[450px]">
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wide mb-2.5">{t.chooseLang}</span>
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => { setActiveLang('hi'); setLangSelected(true) }} className={`border p-2 rounded-lg text-center cursor-pointer transition-all ${activeLang === 'hi' ? 'border-[#00d2ff] bg-[#00d2ff]/5' : 'border-white/10 bg-[#020b14]/80 hover:border-gray-600'}`}>
                  <span className="block text-xs font-bold text-blue-400">हिंदी</span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Hindi</span>
                </div>
                <div onClick={() => { setActiveLang('en'); setLangSelected(true) }} className={`border p-2 rounded-lg text-center cursor-pointer transition-all ${activeLang === 'en' ? 'border-[#00d2ff] bg-[#00d2ff]/5' : 'border-white/10 bg-[#020b14]/80 hover:border-gray-600'}`}>
                  <span className="block text-xs font-bold text-[#00d2ff]">English</span>
                  <span className="text-[10px] text-gray-400 block mt-0.5">English</span>
                </div>
               <div onClick={() => { setActiveLang('bhoj'); setLangSelected(true) }} className={`border p-2 rounded-lg text-center cursor-pointer transition-all ${activeLang === 'bhoj' ? 'border-[#00d2ff] bg-[#00d2ff]/5' : 'border-white/10 bg-[#020b14]/80 hover:border-gray-600'}`}>
                  <span className="block text-xs font-bold text-amber-500">भोजपुरी</span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Bhojpuri</span>
                </div>
              </div>
            </div>
            )}


          </div>

          {/* Bottom message */}
          <div className="p-3 border-t border-white/10 bg-[#020c17] flex-shrink-0">
            <div className="flex gap-2 items-center bg-[#010811] border border-white/10 rounded-xl p-2 focus-within:border-[#00d2ff] transition-all">
              <button  onClick={() => sendMessage(inputText)} className="bg-transparent hover:bg-white/5 text-gray-400 hover:text-white p-2 border-none rounded-lg cursor-pointer transition-colors text-sm flex items-center justify-center">
                <FaPaperclip />
              </button>
              <input 
                type="text"
                placeholder={t.inputPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputText)}
                className="flex-grow bg-transparent border-none text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none py-1.5"
              />
              <button className="bg-transparent hover:bg-white/5 text-gray-400 hover:text-white p-2 border-none rounded-lg cursor-pointer transition-colors text-sm flex items-center justify-center">
                <FaCamera />
              </button>
              <button className="bg-[#1e2056] border border-[#4d52cc]/40 hover:bg-[#2a2d7c] text-white w-9 h-9 rounded-lg cursor-pointer flex justify-center items-center transition-all shadow-md">
                <FaPaperPlane className="text-xs" />
              </button>
            </div>
            <div className="text-center text-[10px] text-gray-500 mt-1.5 font-semibold tracking-wide">
              {t.inputSub}
            </div>
          </div>
        </section>

        {/* PANEL RIGHT */}
        <section className="flex flex-col gap-4 hidden lg:flex">
          
          {/* Card Module A: Quick Actions Container */}
          <div className="bg-[#020e1c]/50 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-[#00d2ff] flex items-center gap-2 border-b border-white/5 pb-2.5 mb-3">
              <span>⚡</span> {t.quickActionsTitle}
            </h3>
            <div className="flex flex-col gap-2">
              <div onClick={() => navigate('/citizen/complaint')} className="bg-[#010811] border border-white/5 hover:border-white/10 rounded-lg p-2.5 flex justify-between items-center cursor-pointer group transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-400 flex justify-center items-center text-xs border border-blue-500/20"><FaPlus /></span>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white">{t.action1Title}</span>
                </div>
                <FaChevronRight className="text-[9px] text-gray-600" />
              </div>
              <div onClick={() => navigate('/citizen/history')} className="bg-[#010811] border border-white/5 hover:border-white/10 rounded-lg p-2.5 flex justify-between items-center cursor-pointer group transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-400 flex justify-center items-center text-xs border border-emerald-500/20"><FaClipboardList /></span>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white">{t.action2Title}</span>
                </div>
                <FaChevronRight className="text-[9px] text-gray-600" />
              </div>
              <div onClick={() => navigate('/citizen/history')} className="bg-[#010811] border border-white/5 hover:border-white/10 rounded-lg p-2.5 flex justify-between items-center cursor-pointer group transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 flex justify-center items-center text-xs border border-amber-500/20"><FaFileAlt /></span>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white">{t.action3Title}</span>
                </div>
                <FaChevronRight className="text-[9px] text-gray-600" />
              </div>
              <div onClick={() => navigate('/citizen/map')} className="bg-[#010811] border border-white/5 hover:border-white/10 rounded-lg p-2.5 flex justify-between items-center cursor-pointer group transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-400 flex justify-center items-center text-xs border border-purple-500/20"><FaMapMarkerAlt /></span>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white">{t.action4Title}</span>
                </div>
                <FaChevronRight className="text-[9px] text-gray-600" />
              </div>
              <div className="bg-[#010811] border border-white/5 hover:border-white/10 rounded-lg p-2.5 flex justify-between items-center cursor-pointer group transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-rose-500/10 text-rose-400 flex justify-center items-center text-xs border border-rose-500/20"><FaPhoneAlt /></span>
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white">
                    {activeLang === 'en' ? 'Contact Helpline' : activeLang === 'hi' ? 'हेल्पलाइन से संपर्क करें' : 'हेल्पलाइन से संपर्क करीं'}
                  </span>
                </div>
                <FaChevronRight className="text-[9px] text-gray-600" />
              </div>
            </div>
          </div>

          {/* Card Module B: Tips Guide Block */}
          <div className="bg-[#020e1c]/50 border border-white/10 rounded-xl p-4 backdrop-blur-md">
            <h3 className="text-xs font-bold text-[#00d2ff] flex items-center gap-2 border-b border-white/5 pb-2.5 mb-3">
              <FaLightbulb className="text-purple-400 text-sm" /> {t.tipTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300 pl-0 list-none m-0">
              {t.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full mt-1.5 inline-block flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Card Module C: Language Support Display */}
          <div className="bg-[#020e1c]/50 border border-white/10 rounded-xl p-4 backdrop-blur-md flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#00d2ff] flex items-center gap-2 border-b border-white/5 pb-2.5 mb-3">
                <FaGlobe className="text-emerald-400 text-xs" /> {t.langSupportTitle}
              </h3>
              <p className="text-xs text-gray-400 mb-4">{t.langSupportDesc}</p>
              <div className="grid grid-cols-3 gap-2">
                <div onClick={() => setActiveLang('hi')} className={`border p-2 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer transition-all ${activeLang === 'hi' ? 'border-[#00d2ff] bg-[#00d2ff]/10' : 'bg-[#010811] border-white/5 hover:border-gray-600'}`}>
                  <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 text-[10px] flex items-center justify-center font-bold">हि</span>
                  <span className="text-[11px] text-gray-200 font-bold mt-1 block">हिंदी</span>
                  <span className="text-[9px] text-gray-500 block">Hindi</span>
                </div>
                <div onClick={() => setActiveLang('en')} className={`border p-2 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer transition-all ${activeLang === 'en' ? 'border-[#00d2ff] bg-[#00d2ff]/10' : 'bg-[#010811] border-white/5 hover:border-gray-600'}`}>
                  <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] flex items-center justify-center font-bold">EN</span>
                  <span className="text-[11px] text-gray-200 font-bold mt-1 block">English</span>
                  <span className="text-[9px] text-gray-500 block">English</span>
                </div>
                <div onClick={() => setActiveLang('bhoj')} className={`border p-2 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer transition-all ${activeLang === 'bhoj' ? 'border-[#00d2ff] bg-[#00d2ff]/10' : 'bg-[#010811] border-white/5 hover:border-gray-600'}`}>
                  <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-500 text-[10px] flex items-center justify-center font-bold">भौ</span>
                  <span className="text-[11px] text-gray-200 font-bold mt-1 block">भोजपुरी</span>
                  <span className="text-[9px] text-gray-500 block">Bhojpuri</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-center text-gray-400 font-medium leading-relaxed mt-4">
              {t.langFooter}
            </p>
          </div>

        </section>
      </main>

      {/* TECHNICAL BOUNDARY SAFETY LEGAL FOOTER */}
      <footer className="w-full border-t border-white/10 pt-2.5 text-center flex-shrink-0">
        <p className="text-[10px] text-gray-500 flex flex-row items-center justify-center gap-1.5 px-4 leading-relaxed">
          <FaInfoCircle className="text-[#00d2ff] flex-shrink-0 text-xs" />
          <span>{t.bottomNotice}</span>
        </p>
      </footer>

    </div>
  );
}