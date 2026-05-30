
import React, { useState, useEffect, useRef } from 'react';
import { complaintsAPI } from '../../utils/api'; 
import { useNavigate } from 'react-router-dom'; // Router Hook Integrated
import { 
  FaRoad, FaHouseUser, FaChevronDown, FaArrowLeft, FaCloudUploadAlt,
  FaCheckCircle, FaMapMarkerAlt, FaLightbulb, FaHeadset, FaTimesCircle, FaInfoCircle,
  FaExclamationTriangle, FaFileAlt, FaUserCircle, FaArrowRight
} from 'react-icons/fa';

export default function ComplaintForm() {
  const navigate = useNavigate(); // Hook Trigger
  const [lang, setLang] = useState('en');
// ← NEW STATES — yahan add karo
const [location, setLocation] = useState({ lat: null, lng: null, address: '' })
const [photos, setPhotos] = useState([])
const [isSubmitting, setIsSubmitting] = useState(false)
const [submitSuccess, setSubmitSuccess] = useState(false)
const [submitError, setSubmitError] = useState('')
const [isDuplicate, setIsDuplicate] = useState(false)
const fileInputRef = useRef(null)
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');

  // Strict Translation mapping based on second layout image
  const content = {
    en: {
      title: "Road e-Complaint Portal",
      home: "Home",
      langLabel: "Language",
      backBtn: "Back to Home",
      mainHeading: "Raise a Road Complaint",
      mainSub: "Help us to improve the roads in your area.",
      sec1Title: "1. Location Details",
      autoLoc: "Auto-detected Location",
      detected: "Detected",
      address: "MG Road, Near City Hospital, MP",
      or: "OR",
      manualLoc: "Enter Location Manually",
      placeholderManual: "Enter area, street, landmark..",
      useLocBtn: "Use this location",
      sec2Title: "2. Complaint Details",
      issueLabel: "Type of Issue*",
      selectIssue: "Select issue type",
      descLabel: "Description*",
      placeholderDesc: "Please describe the issue in detail...",
      sec3Title: "3. Upload Images (Max 5)",
      uploadBox: "Click to upload or drag and drop\nJPG, PNG up to 10MB each",
      cancelBtn: "Cancel",
      submitBtn: "Submit Complaint",
      tipsTitle: "Tips for Better Complaint",
      tip1: "Provide clear location details",
      tip2: "Upload clear images of the issue",
      tip3: "Select appropriate issue type",
      tip4: "Provide detailed description",
      autoLocTitle: "Auto-detect Location",
      autoLocDesc: "We automatically detect your current location.",
      locAccess: "Location access enabled",
      needHelp: "Need Help?",
      helpDesc: "Facing any issue in filing a complaint?",
      contactSupport: "Contact Support",
      bottomNotice: "Your complaint will be forwarded to the concerned department for action."
    },
    hi: {
      title: "सड़क ई-शिकायत पोर्टल",
      portalSub: "सड़क ई-शिकायत पोर्टल",
      home: "होमपेज / शिकायत दर्ज करें",
      langLabel: "Language / भाषा",
      backBtn: "होमपेज पर वापस जाएं",
      mainHeading: "सड़क शिकायत दर्ज करें",
      mainSub: "अपने क्षेत्र की सड़कों को बेहतर बनाने में हमारी मदद करें।",
      sec1Title: "1. स्थान विवरण",
      autoLoc: "स्वचालित रूप से पहचाना गया स्थान",
      detected: "पत्ता लगा लिया",
      address: "एमजी रोड, सिटी हॉस्पिटल के पास, जयपुर, राजस्थान 302001",
      or: "OR / या",
      manualLoc: "स्थान स्वयं लिखें",
      placeholderManual: "क्षेत्र, सड़क, लैंडमार्क दर्ज करें...",
      useLocBtn: "इस स्थान का उपयोग करें",
      sec2Title: "2. शिकायत विवरण",
      issueLabel: "समस्या का प्रकार *",
      selectIssue: "प्रकार चुनें / Select issue type",
      descLabel: "विवरण *",
      placeholderDesc: "कृपया समस्या का विवरण विस्तार से लिखें...",
      sec3Title: "3. फोटो अपलोड करें (अधिकतम 5)",
      uploadBox: "अपलोड करने के लिए क्लिक करें या ड्रैग एंड ड्रॉप करें",
      cancelBtn: "रद्द करें",
      submitBtn: "शिकायत दर्ज करें",
      tipsTitle: "बेहतर शिकायत के लिए सुझाव",
      tip1: "स्पष्ट स्थान विवरण प्रदान करें",
      tip2: "समस्या की स्पष्ट तस्वीरें अपलोड करें",
      tip3: "उचित समस्या प्रकार का चयन करें",
      tip4: "विस्तृत विवरण प्रदान करें",
      autoLocTitle: "स्थान का स्वतः पता लगाएं",
      autoLocDesc: "हम आपके वर्तमान स्थान का स्वचालित रूप से पता लगाते हैं।",
      locAccess: "स्थान पहुंच सक्षम है",
      needHelp: "सहायता चाहिए?",
      helpDesc: "शिकायत दर्ज करने में कोई समस्या आ रही है?",
      contactSupport: "तकनीकी सहायता से संपर्क करें",
      bottomNotice: "आपकी शिकायत संबंधित विभाग को कार्रवाई के लिए भेज दी जाएगी।"
    },
    
bhoj: {
  title: "सड़क ई-शिकायत पोर्टल",
  home: "घर",
  langLabel: "भाषा",
  backBtn: "घरे वापस जाईं",
  mainHeading: "सड़क शिकायत दर्ज करीं",
  mainSub: "आपन इलाका के सड़क बेहतर बनावे में मदद करीं।",
  sec1Title: "1. जगह के जानकारी",
  autoLoc: "अपने आप पता लागल जगह",
  detected: "मिल गइल",
  or: "या",
  manualLoc: "जगह खुद लिखीं",
  placeholderManual: "इलाका, सड़क, लैंडमार्क लिखीं...",
  useLocBtn: "इ जगह इस्तेमाल करीं",
  sec2Title: "2. शिकायत के जानकारी",
  issueLabel: "समस्या के प्रकार *",
  selectIssue: "प्रकार चुनीं",
  descLabel: "विवरण *",
  placeholderDesc: "कृपया समस्या के विस्तार से बताईं...",
  sec3Title: "3. फोटो अपलोड करीं (अधिकतम 5)",
  uploadBox: "अपलोड करे खातिर क्लिक करीं",
  cancelBtn: "रद्द करीं",
  submitBtn: "शिकायत दर्ज करीं",
  tipsTitle: "बेहतर शिकायत खातिर सुझाव",
  tip1: "साफ जगह के जानकारी दीं",
  tip2: "समस्या के साफ फोटो अपलोड करीं",
  tip3: "सही समस्या प्रकार चुनीं",
  tip4: "विस्तार से बताईं",
  autoLocTitle: "जगह अपने आप पता लगाईं",
  autoLocDesc: "हम रउआर मौजूदा जगह अपने आप पता लगाइत बानी।",
  locAccess: "जगह के अनुमति मिलल बा",
  needHelp: "मदद चाहीं?",
  helpDesc: "शिकायत दर्ज करे में कउनो दिक्कत बा?",
  contactSupport: "सहायता से संपर्क करीं",
  bottomNotice: "रउआर शिकायत संबंधित विभाग के भेज दिहल जाई।"
}
  };
 useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        
        // Real address fetch karo
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { 'User-Agent': 'RoadWatch_App' } }
          )
          const data = await res.json()
          setLocation({
            lat,
            lng,
            address: data.display_name || `${lat}, ${lng}`
          })
        } catch {
          setLocation({ lat, lng, address: `${lat}, ${lng}` })
        }
      },
      (error) => console.error('GPS Error:', error)
    )
  }
}, [])
const handlePhotoUpload = (e) => {
  const files = Array.from(e.target.files)
  if (photos.length + files.length > 5) {
    alert('Maximum 5 photos allowed')
    return
  }
  const newPhotos = files.map(file => ({
    file,
    preview: URL.createObjectURL(file)
  }))
  setPhotos(prev => [...prev, ...newPhotos])
}

const handleRemovePhoto = (index) => {
  setPhotos(prev => prev.filter((_, i) => i !== index))
}

const handleSubmit = async () => {
  if (!issueType) {
    setSubmitError('Please select issue type')
    return
  }
  if (!description) {
    setSubmitError('Please add description')
    return
  }
  if (photos.length === 0) {
    setSubmitError('Please upload at least 1 photo')
    return
  }

  setIsSubmitting(true)
  setSubmitError('')

  try {
    const formData = new FormData()
    formData.append('issue_type', issueType)
    formData.append('description', description)
    formData.append('latitude', location.lat || 23.2599)
    formData.append('longitude', location.lng || 77.4126)
    formData.append('address', location.address || 'Bhopal, Madhya Pradesh')

    photos.forEach((photo) => {
      formData.append('photos', photo.file)
    })

    console.log('=== FORMDATA CHECK ===')
for (let [key, value] of formData.entries()) {
  console.log(key, ':', value)
}

    const res = await complaintsAPI.create(formData)
    alert('API Response: ' + res.status) 
    const data = await res.json()

    if (res.ok) {
      setSubmitSuccess(true)
      setTimeout(() => navigate('/citizen/history'), 2000)
    } else {
      setSubmitError(data.detail || 'Something went wrong. Please try again.')
    }
  } catch (err) {
    console.error('Submit error:', err)
    setSubmitError('Network error. Please check your connection.')
  } finally {
    setIsSubmitting(false)
  }
}

  const t = content[lang];

  return (
    <div className="min-h-screen text-white p-4 md:p-5 font-sans bg-[#020b14] bg-[radial-gradient(circle_at_50%_0%,_#07223d_0%,_#020b14_70%)]">
      
      {/* HEADER NAVBAR */}
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
            <span>{t.langLabel}</span>
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
            <button 
              onClick={() => setLang('bhoj')} 
              className={`bg-transparent border border-white/10 px-3 py-1.5 rounded-md text-xs cursor-pointer transition-all ${lang === 'bhoj' ? 'bg-[#00d2ff]/10 border-[#00d2ff] text-[#00d2ff] font-semibold' : 'text-[#90a0b2]'}`}
            >
              भोजपुरी
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm cursor-pointer">
            <FaUserCircle className="text-xl text-[#00d2ff]" />
            <span>Rishi</span>
            <FaChevronDown className="text-xs" />
          </div>
        </div>
      </header>

      {/* FORM HEADER CONTROLS */}
      <div className="max-w-[1400px] mx-auto mb-4 flex flex-col gap-3">
        <button onClick={() => navigate('/citizen')} className="flex items-center gap-2 text-xs text-[#00d2ff] hover:underline bg-transparent border-none cursor-pointer self-start">
          <FaArrowLeft /> {t.backBtn}
        </button>
        
        {/* Main Banner Heading block matching image illustration graphic flow */}
        <div className="flex justify-between items-center relative overflow-hidden bg-gradient-to-r from-[#031424] to-transparent p-5 rounded-xl border border-white/5">
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex justify-center items-center text-xl text-[#00d2ff]">
              <FaFileAlt />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#00d2ff]">{t.mainHeading}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t.mainSub}</p>
            </div>
          </div>
          
          {/* Right Badge Construction Layout Illustration Graphic Match */}
          <div className="relative z-30 border border-white/20 p-[6px_10px] md:p-[10px_18px] rounded-md flex items-center gap-2 md:gap-4 bg-black/40 flex-shrink-0 self-center">
            <div className="flex flex-col text-[8px] md:text-[11px] font-bold tracking-wider text-right">
              <span>BETTER ROADS</span>
              <span>BETTER JOURNEYS</span>
            </div>
            <div className="text-base md:text-2xl text-[#ffb703] flex-shrink-0">
              <FaExclamationTriangle className="animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMN DASHBOARD CONTAINER */}
      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-5 mb-5 items-start">
        
        {/* LEFT COLUMN: COMPLAINT INPUT SHEET FORM */}
        <div className="flex flex-col gap-5">
          
          {/* SECTION 1: LOCATION FIELDS */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <h3 className="text-sm font-semibold text-[#00d2ff] border-b border-white/5 pb-3 mb-4">{t.sec1Title}</h3>
            
            {/* Auto GPS tracking wrapper grid box */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_160px] gap-4 items-center bg-[#020d1a]/80 border border-white/5 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3 min-w-0">
                <FaCheckCircle className="text-[#00ff88] mt-0.5 flex-shrink-0 text-base" />
                <div className="min-w-0">
                  <span className="block text-[11px] text-[#90a0b2] mb-0.5">{t.autoLoc}</span>
                  <p className="text-xs font-medium text-white truncate">
                    {location.address || 'Detecting location...'}
                </p>
                </div>
              </div>
              <div className="flex justify-end md:justify-center">
                <span className="text-[11px] font-bold tracking-wider text-[#00ff88] bg-[#00ff88]/10 border border-[#00ff88]/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase">
                  <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full inline-block"></span> {t.detected}
                </span>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 my-3 font-semibold select-none">{t.or}</div>

            {/* Manual input and Mini Map view layout wrapper */}
            <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.7fr] gap-4">
              <div className="flex flex-col gap-1.5 justify-center">
                <label className="text-[11px] text-[#90a0b2] font-medium">{t.manualLoc}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t.placeholderManual}
                    className="w-full bg-[#020b14] border border-white/10 rounded-lg p-3 pl-10 text-xs text-white focus:outline-none focus:border-[#00d2ff] transition-colors"
                  />
                  <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-gray-500 text-sm" />
                </div>
              </div>

              {/* Sub Vector Canvas Mini Preview Wrapper Component */}
              <div className="relative h-[110px] bg-[#041424] border border-white/5 rounded-lg overflow-hidden flex flex-col justify-end p-2 group">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:15px_15px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#00d2ff]/20 flex justify-center items-center shadow-lg border border-[#00d2ff]/40">
                  <FaMapMarkerAlt className="text-[#00d2ff] animate-bounce text-sm" />
                </div>
                <button className="relative z-10 w-full bg-[#03101f]/90 hover:bg-[#00d2ff] hover:text-black border border-[#00d2ff]/40 text-[#00d2ff] py-1.5 rounded text-[10px] font-bold tracking-wide transition-all uppercase flex justify-center items-center gap-1 cursor-pointer">
                  🌐 {t.useLocBtn}
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 2: ISSUE TYPE AND DETAILS DESCRIPTION */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <h3 className="text-sm font-semibold text-[#00d2ff] border-b border-white/5 pb-3 mb-4">{t.sec2Title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#90a0b2] font-medium">{t.issueLabel}</label>
                <select 
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full bg-[#020b14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#00d2ff] cursor-pointer transition-colors"
                >
                  <option value="" disabled>{t.selectIssue}</option>
                  <option value="pothole">Pothole / गड्ढे</option>
                  <option value="damaged">Damaged Road / क्षतिग्रस्त सड़क</option>
                  <option value="water">Water Logging / जलभराव</option>
                  <option value="footpath">Broken Footpath / टूटी फुटपाथ</option>
                  <option value="other">Other Issue / अन्य समस्याएं</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] text-[#90a0b2] font-medium">{t.descLabel}</label>
                <span className="text-[10px] text-gray-500 font-mono">{description.length}/500</span>
              </div>
              <textarea 
                maxLength={500}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.placeholderDesc}
                rows={4}
                className="w-full bg-[#020b14] border border-white/10 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#00d2ff] transition-colors resize-none leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* SECTION 3: IMAGE ATTACHMENTS */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <h3 className="text-sm font-semibold text-[#00d2ff] border-b border-white/5 pb-3 mb-4">{t.sec3Title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] gap-4 items-center">
              {/* Image Input Trigger Frame box */}
              <div onClick={() => fileInputRef.current.click()} 
               className="border border-dashed border-white/10 hover:border-[#00d2ff]/50 bg-[#020b14]/50 rounded-xl p-5 text-center cursor-pointer flex flex-col items-center justify-center gap-2.5 group transition-colors min-h-[110px]">
                <FaCloudUploadAlt className="text-2xl text-gray-500 group-hover:text-[#00d2ff] transition-colors" />
                <p className="text-[10px] text-gray-400 whitespace-pre-line leading-normal">{t.uploadBox}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                 />
              </div>
              <div className="flex flex-row gap-3 overflow-x-auto py-1.5 justify-start">
                {photos.map((photo, index) => (
  <div key={index} className="w-[110px] h-[90px] rounded-lg bg-slate-800 border border-white/10 relative overflow-hidden flex-shrink-0 group">
    <img src={photo.preview} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
    <button
      onClick={() => handleRemovePhoto(index)}
      className="absolute top-1 right-1 bg-black/70 text-white hover:text-red-400 border-none w-5 h-5 rounded-full flex justify-center items-center cursor-pointer text-xs transition-colors">
      <FaTimesCircle />
    </button>
    </div>
               ))}
              </div>
            </div>
          </div>

          
          
{/* Error Message */}
{submitError && (
  <div className="text-red-400 text-xs text-right mb-2">
    ⚠️ {submitError}
  </div>
)}

{/* Success Message */}
{submitSuccess && (
  <div className="text-green-400 text-xs text-right mb-2">
    ✅ Complaint submitted! Redirecting...
  </div>
)}

{/* Duplicate Alert */}
{isDuplicate && (
  <div className="text-yellow-400 text-xs text-right mb-2">
    ⚠️ Similar complaint exists nearby — still submitting yours
  </div>
)}

          <div className="flex flex-row justify-end items-center gap-4 mt-1">
            <button onClick={() => navigate('/citizen')} className="bg-transparent border border-white/20 hover:border-white/40 text-gray-300 font-medium p-[10px_24px] rounded-lg text-xs cursor-pointer transition-colors uppercase tracking-wider">
              {t.cancelBtn}
            </button>
           <button
               onClick={handleSubmit} 
               disabled={isSubmitting}
               className="bg-[#00d2ff] hover:bg-[#00b4d8] border-none text-black font-bold p-[10px_26px] rounded-lg text-xs cursor-pointer shadow-[0_0_15px_rgba(0,210,255,0.2)] transition-colors uppercase tracking-wider disabled:opacity-50">
              {isSubmitting ? 'Verifying & Submitting...' : t.submitBtn}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: NOTIFICATION TIPS & HELPDESK INFO BLOCKS */}
        <div className="flex flex-col gap-4 w-full">
          
          {/* Card A: Operational Tips Guides */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <h4 className="text-xs md:text-sm font-bold text-[#00d2ff] flex items-center gap-2 mb-4">
              <FaLightbulb className="text-amber-500 text-sm md:text-base" /> {t.tipsTitle}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-3 text-xs text-gray-300">
              <li className="flex items-start gap-2.5 leading-normal"><span className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full inline-block mt-1.5 flex-shrink-0"></span> {t.tip1}</li>
              <li className="flex items-start gap-2.5 leading-normal"><span className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full inline-block mt-1.5 flex-shrink-0"></span> {t.tip2}</li>
              <li className="flex items-start gap-2.5 leading-normal"><span className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full inline-block mt-1.5 flex-shrink-0"></span> {t.tip3}</li>
              <li className="flex items-start gap-2.5 leading-normal"><span className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full inline-block mt-1.5 flex-shrink-0"></span> {t.tip4}</li>
            </ul>
          </div>

          {/* Card B: Location meta configurations */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <h4 className="text-xs md:text-sm font-bold text-[#00d2ff] flex items-center gap-2 mb-2">
              <span className="text-emerald-400 text-sm">📡</span> {t.autoLocTitle}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">{t.autoLocDesc}</p>
            <div className="bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-lg p-2.5 flex items-center gap-2 text-xs font-semibold text-[#00ff88]">
              <FaCheckCircle className="text-sm" />
              <span>{t.locAccess}</span>
            </div>
          </div>

          {/* Card C: Help Desk panel layout */}
          <div className="bg-[#061526]/60 border border-white/10 rounded-xl p-5 backdrop-blur-md">
            <h4 className="text-xs md:text-sm font-bold text-[#00d2ff] flex items-center gap-2 mb-2">
              <FaHeadset className="text-[#9d4edd] text-base" /> {t.needHelp}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">{t.helpDesc}</p>
            <button 
               onClick={() => navigate('/citizen/chat')}
               className="w-full bg-transparent hover:bg-[#00d2ff]/10 border border-[#00d2ff] text-[#00d2ff] py-2.5 rounded-lg text-xs font-bold tracking-wide transition-colors flex justify-center items-center gap-1.5 uppercase cursor-pointer">
               {t.contactSupport} <FaArrowRight className="text-[10px]" />
            </button>
          </div>

        </div>

      </main>

      {/* FLOATING BOUNDARY FOOTER */}
      <footer className="max-w-[1400px] mx-auto border-t border-white/10 pt-4 text-center mt-6">
        <p className="text-xs text-[#90a0b2] flex flex-row items-center justify-center gap-2 px-4 leading-relaxed">
          <FaInfoCircle className="text-[#00d2ff] flex-shrink-0 text-sm" />
          <span>{t.bottomNotice}</span>
        </p>
      </footer>

    </div>
  );
}