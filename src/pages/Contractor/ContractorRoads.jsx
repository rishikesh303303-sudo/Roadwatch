import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, CheckCircle2, ArrowLeft, Flag, 
  UploadCloud, ArrowRight, Bell, X, FileImage, RefreshCw
} from 'lucide-react';

export default function ContractorAllComplaints() {
  const navigate = useNavigate();
  const contractorName = localStorage.getItem('contractorName') || "Bhopal Infrastructure Group";
  
  const [realComplaints, setRealComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Drawer & Upload States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeComplaint, setActiveComplaint] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fixNote, setFixNote] = useState('Pothole filled and leveled');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FETCH COMPLAINTS ---
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/complaints/contractor/${encodeURIComponent(contractorName)}`)
        
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setRealComplaints(data);
          } else if (data && Array.isArray(data.data)) {
            setRealComplaints(data.data);
          } else {
            setRealComplaints([]);
          }
        }
      } catch (error) {
        console.error("Complaints load error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (contractorName) {
      fetchComplaints();
    }
  }, [contractorName]);

  // --- DIRECT MARK AS FIXED (No Photo) ---
  const handleMarkAsFixed = async (complaintId) => {
    setRealComplaints(prev => prev.map(comp => 
      comp.id === complaintId ? { ...comp, status: 'Resolved' } : comp
    ));
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/complaints/${complaintId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Resolved' })
      });
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  // --- DRAWER CONTROLS ---
  const openDrawer = (comp) => {
    setActiveComplaint(comp);
    setSelectedFile(null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setActiveComplaint(null);
      setSelectedFile(null);
    }, 300);
  };
const handlePhotoSubmit = async () => {
  if (!activeComplaint || !selectedFile) return;
  setIsSubmitting(true);
  
  try {
    // Image compress karo
    const compressedFile = await new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const MAX = 800;
        let w = img.width, h = img.height;
        if (w > MAX) { h = h * MAX / w; w = MAX; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        canvas.toBlob(blob => resolve(
          new File([blob], selectedFile.name, { type: 'image/jpeg' })
        ), 'image/jpeg', 0.7); // 70% quality
      };
    });

    const formData = new FormData();
    formData.append('fix_photo', compressedFile);
    formData.append('fix_note', fixNote);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/complaints/${activeComplaint.id}/fix-photo`, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const err = await res.json();
      alert("Upload failed: " + (err.detail || "Error"));
      return;
    }

    const data = await res.json();
    const fixImageUrl = data.fix_image_url || URL.createObjectURL(selectedFile);
    
    setRealComplaints(prev => prev.map(comp => 
      comp.id === activeComplaint.id 
        ? { ...comp, fix_image_url: fixImageUrl, fix_note: fixNote, fix_status: 'pending_review' }
        : comp
    ));
  } catch (error) {
    console.error("Photo submit error:", error);
    alert("Upload error: " + error.message);
  } finally {
    setIsSubmitting(false);
    closeDrawer();
  }
};

  return (
    <div className="bg-[#060F1A] text-[#F8FAFC] min-h-screen font-sans p-4 md:p-8 overflow-x-hidden">
      <div className={`max-w-[1200px] mx-auto space-y-6 transition-all duration-300 ${isDrawerOpen ? 'lg:pr-[400px]' : ''}`}>
        
        {/* --- HEADER --- */}
        <div className="flex items-center gap-4 border-b border-[#1C2B41] pb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-[#0D192B] border border-[#1C2B41] rounded-lg hover:bg-[#1C2B41] transition-colors">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white tracking-tight">All Complaints on My Roads</h1>
              <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-[0_0_8px_#f97316]">
                {realComplaints.length} Total
              </span>
            </div>
            <p className="text-sm text-[#9BA6B5] mt-1">{contractorName}</p>
          </div>
        </div>

        {/* --- COMPLAINTS LIST --- */}
        <div className="bg-[#0D192B] border border-[#1C2B41] rounded-xl shadow-lg p-6">
          {isLoading ? (
            <div className="text-center text-[#9BA6B5] py-12">Loading all complaints from database...</div>
          ) : realComplaints.length === 0 ? (
            <div className="text-center text-[#9BA6B5] py-12 flex flex-col items-center">
              <CheckCircle2 size={48} className="mb-4 opacity-30" />
              <p className="text-lg">No complaints found for your assigned roads!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {realComplaints.map((comp) => {
                const isFixed = comp.status === 'Resolved' || comp.status === 'Fixed' || comp.fix_image_url;
                
                return (
                <div key={comp.id} className="bg-[#13233A] border border-[#1e324f] rounded-xl p-4 flex flex-col lg:flex-row gap-5 hover:border-[#2b466e] transition-colors">
                  
                  {/* 👉 BEFORE / AFTER IMAGE SECTION */}
                  <div className={`shrink-0 flex gap-2 ${isFixed ? 'w-full lg:w-[320px]' : 'w-full lg:w-48'} h-36`}>
                    
                    {/* BEFORE IMAGE (Citizen) */}
                    <div className="flex-1 h-full rounded-lg overflow-hidden relative border border-white/10 bg-[#1C2B41] flex items-center justify-center group">
                      {isFixed && <div className="absolute top-0 left-0 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg z-10 shadow-md">BEFORE</div>}
                      {comp.image_url ? (
                        <img src={comp.image_url} alt="Before" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <span className="text-[#9BA6B5] text-xs">📸 No Photo</span>
                      )}
                    </div>

                    {/* AFTER IMAGE (Contractor) - Only show if fixed */}
                    {isFixed && (
                      <div className="flex-1 h-full rounded-lg overflow-hidden relative border border-green-500/30 bg-[#142920] flex items-center justify-center group">
                        <div className="absolute top-0 left-0 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg z-10 shadow-md">AFTER</div>
                        {comp.fix_image_url ? (
                          <img src={comp.fix_image_url} alt="After" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        ) : (
                          <span className="text-green-500/50 text-xs text-center px-2">Fixed without photo</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* --- DETAILS SECTION --- */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white text-[15px]">{comp.title || comp.road_name || 'Road Issue'}</h4>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium flex items-center gap-1 ${
                          isFixed ? 'text-green-400 border-green-400/30 bg-green-400/10' :
                          comp.status === 'Pending' ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                          'text-red-400 border-red-400/30 bg-red-400/10'
                        }`}>
                          {isFixed && <CheckCircle2 size={12} />}
                          {comp.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#9BA6B5] mb-3 leading-relaxed">{comp.description}</p>
                      
                      {/* Note if fixed */}
{isFixed && comp.fix_note && (
  <div className="mb-3 px-3 py-2 bg-green-500/5 border border-green-500/10 rounded-lg text-xs text-green-400 italic">
    <span className="font-semibold text-green-500 mr-1">Contractor Note:</span> {comp.fix_note}
  </div>
)}

{/* Reject message */}
{comp.fix_status === 'rejected' && (
  <div className="mb-3 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400">
    ⚠️ Authority ne photo reject ki — Please reupload a better photo!
  </div>
)}

                      <div className="flex items-center gap-2 text-xs text-[#9BA6B5] mb-1.5">
                        <MapPin size={13} />
                        <span>{comp.latitude?.toFixed(4)}, {comp.longitude?.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#9BA6B5]">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} />
                          {new Date(comp.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        {comp.is_fraud && (
                          <span className="text-red-400 font-semibold flex items-center gap-1"><Flag size={12} className="fill-red-400" /> Fraud</span>
                        )}
                      </div>
                    </div>

                    {/* --- BUTTONS SECTION --- */}
                    <div className="flex justify-end gap-3 mt-4 lg:mt-0">
                      {isFixed ? (
                        <>
                          <div className="px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-semibold rounded flex items-center gap-2 mr-auto lg:mr-0">
                            Verified Fix
                          </div>
                          <button 
                            onClick={() => openDrawer(comp)} 
                            className="px-4 py-2 bg-[#1C2B41] hover:bg-[#2b466e] text-white border border-[#2b466e] text-xs font-semibold rounded flex items-center gap-2 transition-colors shadow-sm"
                          >
                            <RefreshCw size={14} /> Reupload Photo
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleMarkAsFixed(comp.id)} className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded transition-colors shadow-sm">
                            Mark as Fixed
                          </button>
                          <button onClick={() => openDrawer(comp)} className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#1e40af] text-white text-xs font-semibold rounded transition-colors shadow-sm">
                            Upload Fix Photo
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                </div>
              )})}
            </div>
          )}
        </div>
      </div>

      {/* 👉 RIGHT SIDE UPLOAD DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent cursor-pointer"
            />
            
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#0A1322]/95 backdrop-blur-xl border-l border-[#1C2B41] z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-[#1C2B41] flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  {(activeComplaint?.status === 'Resolved' || activeComplaint?.status === 'Fixed') ? 'Reupload Fix Photo' : 'Upload Fix Photo'}
                </h2>
                <button onClick={closeDrawer} className="text-[#9BA6B5] hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <p className="text-sm text-[#9BA6B5] mb-2">
                  Resolving: <span className="text-white font-semibold">{activeComplaint?.title || activeComplaint?.road_name}</span>
                </p>
                
                <label className="border-2 border-dashed border-[#1C2B41] hover:border-[#3B82F6] transition-colors rounded-xl bg-[#0D192B] flex flex-col items-center justify-center py-12 px-4 cursor-pointer mb-6 group relative">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  {selectedFile ? (
                    <div className="text-center">
                      <div className="bg-green-500/20 p-3 rounded-full inline-block mb-2">
                        <FileImage size={28} className="text-green-500" />
                      </div>
                      <p className="text-sm text-green-400 font-bold truncate max-w-[200px]">{selectedFile.name}</p>
                      <p className="text-xs text-[#9BA6B5] mt-1">Click to change file</p>
                    </div>
                  ) : (
                    <>
                      <div className="bg-[#1C2B41] p-4 rounded-full mb-4 group-hover:bg-[#1D4ED8]/20 transition-colors">
                        <UploadCloud size={32} className="text-[#9BA6B5] group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="text-sm text-white font-medium mb-1">Click to browse image</p>
                      <p className="text-xs text-[#9BA6B5]">JPG, PNG supported</p>
                    </>
                  )}
                </label>

                <p className="text-sm text-[#9BA6B5] mb-2">Fix Note (Optional)</p>
                <textarea 
                  className="w-full bg-[#0D192B] border border-[#1C2B41] rounded-lg p-3 text-sm text-white placeholder:text-[#9BA6B5] focus:outline-none focus:border-[#3B82F6] resize-none mb-6 h-24 transition-colors"
                  placeholder="Describe the fix..."
                  value={fixNote}
                  onChange={(e) => setFixNote(e.target.value)}
                ></textarea>

                <button 
                  onClick={handlePhotoSubmit}
                  disabled={!selectedFile || isSubmitting}
                  className={`w-full py-3 text-white font-bold rounded-lg transition-colors shadow-lg flex justify-center items-center gap-2
                    ${!selectedFile || isSubmitting ? 'bg-[#1C2B41] cursor-not-allowed text-slate-400' : 'bg-[#15803D] hover:bg-[#166534] shadow-[0_0_15px_rgba(21,128,61,0.4)]'}`}
                >
                  {isSubmitting ? 'Uploading...' : 'Submit Update'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}