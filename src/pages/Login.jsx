import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { 
  Scale, 
  ShieldCheck, 
  History, 
  Building2, 
  Users, 
  HardHat, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  ChevronDown,
  HeadphonesIcon,
  Globe
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    portalName: "e-Complaint Portal",
    heroTitle1: "Let's Build",
    heroTitleHighlight: "Better Roads",
    heroTitle2: "Together",
    heroSub: "Report issues, track progress, and help us build safer, smoother roads for everyone.",
    feat1Title: "Secure & Transparent",
    feat2Title: "Track & Stay Updated",
    feat3Title: "Better Roads, Better Tomorrow",
    welcome: "Welcome Back!",
    loginSub: "Login to continue",
    loginAs: "Login as",
    roleCitizen: "Citizen",
    roleContractor: "Contractor",
    roleAuthority: "Authority",
    selectContractor: "Select Contractor",
    chooseContractor: "Choose from Bhopal list...",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    passLabel: "Password",
    forgotPass: "Forgot Password?",
    passDemo: "Password is '1234'",
    passPlaceholder: "Enter your password",
    loginBtn: "Login",
    or: "or",
    loginOtp: "Login with OTP",
    loginGoogle: "Continue with Google",
    noAccount: "Don't have an account?",
    register: "Register Now",
    feedbackMsg: "Your feedback helps us improve.",
    helpSupport: "Help & Support",
    langLabel: "Language",
    langSelect: "English ▾"
  },
  hi: {
    portalName: "ई-शिकायत पोर्टल",
    heroTitle1: "आइए मिलकर",
    heroTitleHighlight: "बेहतर सड़कें",
    heroTitle2: "बनाएं",
    heroSub: "समस्याओं की रिपोर्ट करें, प्रगति को ट्रैक करें, और सभी के लिए सुरक्षित, सुगम सड़कें बनाने में हमारी मदद करें।",
    feat1Title: "सुरक्षित और पारदर्शी",
    feat2Title: "ट्रैक करें और अपडेट रहें",
    feat3Title: "बेहतर सड़कें, बेहतर कल",
    welcome: "वापसी पर स्वागत है!",
    loginSub: "जारी रखने के लिए लॉग इन करें",
    loginAs: "के रूप में लॉग इन करें",
    roleCitizen: "नागरिक",
    roleContractor: "ठेकेदार",
    roleAuthority: "अधिकारी",
    selectContractor: "ठेकेदार चुनें",
    chooseContractor: "भोपाल सूची से चुनें...",
    emailLabel: "ईमेल पता",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    passLabel: "पासवर्ड",
    forgotPass: "पासवर्ड भूल गए?",
    passDemo: "पासवर्ड '1234' है",
    passPlaceholder: "अपना पासवर्ड दर्ज करें",
    loginBtn: "लॉग इन करें",
    or: "या",
    loginOtp: "ओटीपी के साथ लॉग इन करें",
    loginGoogle: "Google के साथ जारी रखें",
    noAccount: "क्या आपके पास खाता नहीं है?",
    register: "अभी पंजीकरण करें",
    feedbackMsg: "आपकी प्रतिक्रिया हमें सुधारने में मदद करती है।",
    helpSupport: "सहायता और समर्थन",
    langLabel: "भाषा",
    langSelect: "हिंदी ▾"
  }
};

const CONTRACTORS = [
  "L&T Infrastructure Pvt Ltd",
  "Dilip Buildcon Ltd",
  "Bansal Construction Works",
  "Gawar Construction Ltd",
  "PNC Infratech Ltd",
  "Central Zone Builders Pvt Ltd",
  "TN Infrastructure Ltd",
  "Shiva Construction Co",
  "Gupta Infratech Ltd",
  "Bhopal Infrastructure Group"
];

export default function Login() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const t = TRANSLATIONS[language];

  const [activeRole, setActiveRole] = useState('citizen'); 
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState('');
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = (e) => {
    e.preventDefault();
    
    if (activeRole === 'contractor' || activeRole === 'authority') {
      if (password !== '1234') {
        alert("For demo purposes, the password for Authority and Contractor is '1234'.");
        return;
      }
    }
    
  
    if (activeRole === 'citizen') {
      navigate('/citizen-home');
    } 
    else if (activeRole === 'contractor') {
      localStorage.setItem('contractorName', selectedContractor);
      navigate('/contractor');
    } 
    else if (activeRole === 'authority') {
      navigate('/authority');
    }
  };

  return (
    <div className="h-screen bg-[#070b14] text-white font-sans flex flex-col md:flex-row overflow-hidden selection:bg-[#00dfd8] selection:text-black">
      
      {/* Left Panel - Branding & Image */}
      <div className="relative w-full md:w-1/2 lg:w-[55%] hidden md:flex flex-col justify-between p-10 lg:p-16 pb-28 border-r border-slate-800/50">
        {/* Background Image with Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=2487&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#070b14]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent"></div>
        </div>

        {/* Content Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-24">
            <div className="w-12 h-12 rounded-xl bg-[#00dfd8] flex items-center justify-center text-black">
              <Scale size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">{t.portalName}</h1>
            </div>
          </div>

          {/* Main Heading */}
          <div className="max-w-xl">
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {t.heroTitle1} <br />
              <span className="text-[#00dfd8]">{t.heroTitleHighlight}</span> <br />
              {t.heroTitle2}
            </h2>
            <p className="text-slate-300 text-lg mb-12 max-w-md">
              {t.heroSub}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-[#00dfd8] mt-1" size={28} />
                <div>
                  <h4 className="font-semibold text-sm">{t.feat1Title}</h4>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <History className="text-[#00dfd8] mt-1" size={28} />
                <div>
                  <h4 className="font-semibold text-sm">{t.feat2Title}</h4>
                </div>
              </div>
              <div className="flex items-start gap-4 col-span-2">
                <Building2 className="text-[#00dfd8] mt-1" size={28} />
                <div>
                  <h4 className="font-semibold text-sm">{t.feat3Title}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Area */}
      <div className="w-full md:w-1/2 lg:w-[45%] flex-1 flex flex-col justify-start md:justify-center items-center p-6 sm:p-12 pt-10 pb-32 relative z-10 bg-[#070b14] overflow-y-auto custom-scrollbar">
        
        {/* Mobile Logo Header */}
        <div className="md:hidden flex items-center gap-3 w-full max-w-md mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#00dfd8] flex items-center justify-center text-black shadow-[0_0_15px_rgba(0,223,216,0.5)]">
              <Scale size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold">{t.portalName}</h1>
            </div>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md bg-[#0c121e] border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{t.welcome}</h2>
            <p className="text-slate-400 text-sm">{t.loginSub}</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
             <div className="h-px bg-slate-800 flex-1"></div>
             <span className="text-xs text-slate-500 uppercase tracking-wider">{t.loginAs}</span>
             <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          {/* Role Selection Tabs */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button 
              onClick={() => { setActiveRole('citizen'); setPassword(''); setEmail(''); }}
              className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-300 ${activeRole === 'citizen' ? 'border-[#00dfd8] bg-[#00dfd8]/5 shadow-[0_0_15px_rgba(0,223,216,0.15)] text-[#00dfd8]' : 'border-slate-800 bg-[#111826] text-slate-400 hover:border-slate-600'}`}
            >
              <Users size={20} className="mb-2" />
              <span className="text-xs font-medium">{t.roleCitizen}</span>
            </button>
            <button 
              onClick={() => { setActiveRole('contractor'); setPassword(''); }}
              className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-300 ${activeRole === 'contractor' ? 'border-[#00dfd8] bg-[#00dfd8]/5 shadow-[0_0_15px_rgba(0,223,216,0.15)] text-[#00dfd8]' : 'border-slate-800 bg-[#111826] text-slate-400 hover:border-slate-600'}`}
            >
              <HardHat size={20} className="mb-2" />
              <span className="text-xs font-medium">{t.roleContractor}</span>
            </button>
            <button 
              onClick={() => { setActiveRole('authority'); setPassword(''); setEmail(''); }}
              className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-300 ${activeRole === 'authority' ? 'border-[#00dfd8] bg-[#00dfd8]/5 shadow-[0_0_15px_rgba(0,223,216,0.15)] text-[#00dfd8]' : 'border-slate-800 bg-[#111826] text-slate-400 hover:border-slate-600'}`}
            >
              <ShieldCheck size={20} className="mb-2" />
              <span className="text-xs font-medium">{t.roleAuthority}</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            
            
            {activeRole === 'contractor' ? (
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#00dfd8] ml-1">{t.selectContractor}</label>
                <div className="relative">
                  <div 
                    className="w-full bg-[#070b14] border border-slate-700 rounded-xl p-3.5 flex items-center justify-between cursor-pointer hover:border-slate-500 transition-colors"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Building2 size={18} className="text-slate-400 flex-shrink-0" />
                      <span className={`text-sm truncate ${selectedContractor ? 'text-white' : 'text-slate-500'}`}>
                        {selectedContractor || t.chooseContractor}
                      </span>
                    </div>
                    <ChevronDown size={18} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-[#111826] border border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
                      {CONTRACTORS.map((contractor, idx) => (
                        <div 
                          key={idx}
                          className="px-4 py-3 text-sm text-slate-300 hover:bg-[#1a2333] hover:text-white cursor-pointer transition-colors border-b border-slate-800/50 last:border-0"
                          onClick={() => {
                          setSelectedContractor(contractor);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {contractor}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#00dfd8] ml-1">{t.emailLabel}</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="w-full bg-[#070b14] border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00dfd8] focus:ring-1 focus:ring-[#00dfd8] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <label className="text-xs font-medium text-[#00dfd8] ml-1">{t.passLabel}</label>
                <a href="#" className="text-xs text-[#00dfd8] hover:text-white transition-colors">{t.forgotPass}</a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={activeRole !== 'citizen' ? t.passDemo : t.passPlaceholder}
                  required
                  className="w-full bg-[#070b14] border border-slate-700 rounded-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00dfd8] focus:ring-1 focus:ring-[#00dfd8] transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            
            <button 
              type="submit"
              className="w-full bg-[#00dfd8] hover:bg-[#00c4c4] text-black font-semibold rounded-xl py-3.5 mt-2 transition-all shadow-[0_0_20px_rgba(0,223,216,0.3)] hover:shadow-[0_0_25px_rgba(0,223,216,0.5)] active:scale-[0.98]"
            >
              {t.loginBtn}
            </button>

            {activeRole === 'citizen' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center justify-center gap-4 my-6">
                  <div className="h-px bg-slate-800 flex-1"></div>
                  <span className="text-xs text-slate-500">{t.or}</span>
                  <div className="h-px bg-slate-800 flex-1"></div>
                </div>

                <div className="space-y-3">
                  <button type="button" className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#00dfd8]/50 hover:border-[#00dfd8] text-[#00dfd8] rounded-xl py-3.5 transition-all hover:bg-[#00dfd8]/5">
                    <Smartphone size={18} />
                    <span className="text-sm font-medium">{t.loginOtp}</span>
                  </button>
                  
                  <button type="button" className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-xl py-3.5 transition-all hover:bg-gray-100 shadow-sm active:scale-[0.98]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="text-sm font-semibold">{t.loginGoogle}</span>
                  </button>
                </div>
              </div>
            )}

            <p className="text-center text-sm text-slate-400 mt-6">
              {t.noAccount} <a href="#" className="text-[#00dfd8] hover:text-white font-medium transition-colors">{t.register}</a>
            </p>
          </form>
        </div>
      </div>

    
      <div className="fixed bottom-0 left-0 w-full bg-[#0c121e] border-t border-slate-800/80 p-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-[#00dfd8]" size={20} />
          <div>
             <p className="text-sm font-medium text-slate-200">{t.feedbackMsg}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer group">
             <HeadphonesIcon size={16} className="text-slate-400 group-hover:text-[#00dfd8] transition-colors" />
             <div>
               <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{t.helpSupport}</p>
             </div>
          </div>
          <div className="w-px h-6 bg-slate-800"></div>
          <div 
            className="flex items-center gap-2 cursor-pointer group hover:bg-slate-800/50 p-2 rounded-lg transition-colors"
            onClick={() => setLanguage(lang => lang === 'en' ? 'hi' : 'en')}
          >
             <Globe size={16} className="text-[#00dfd8] transition-colors" />
             <p className="text-sm text-slate-200 group-hover:text-white transition-colors font-medium">
               {t.langLabel} <span className="text-[#00dfd8] ml-1">{t.langSelect}</span>
             </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #070b14; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155; 
        }
      `}} />
    </div>
  );
}