import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ─── GENERAL & PUBLIC PAGES ───
import Landing from './pages/Landing'; 
import Login from './pages/Login';     

// ─── CITIZEN DASHBOARD PAGES ───
import CitizenHome from './pages/Citizen/CitizenHome'; 

// ⚡ DIRECT COMPLAINT FOLDER FORM IMPORT
import ComplaintForm from './components/complaint/ComplaintForm'; 
import CitizenHistory from './pages/Citizen/CitizenHistory';       
import CitizenBudget from './pages/Citizen/CitizenBudget';         
import CitizenChat from './pages/Citizen/CitizenChat';             
import CitizenMap from './pages/Citizen/CitizenMap'; // Added matching folder structure map screen if needed

// ─── AUTHORITY PORTAL PAGES ───
import AuthorityDashboard from './pages/Authority/AuthorityHome'; 
import AuthorityComplaints from './pages/Authority/AuthorityComplaints'; 
import AuthorityMap from './pages/Authority/AuthorityMap';             
import AuthorityBudget from './pages/Authority/AuthorityBudget';       

// ─── CONTRACTOR PAGES ───
import ContractorDashboard from './pages/Contractor/ContractorHome'; 
import ContractorRoads from './pages/Contractor/ContractorRoads';   
import ContractorBudget from './pages/Contractor/ContractorBudget'; 


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#060d18] text-slate-100 flex flex-col m-0 p-0 w-full select-none overflow-x-hidden">
        <main className="flex-grow w-full m-0 p-0">
          <Routes>
            
            {/* PUBLIC TARGETS */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />

            {/* CITIZEN BASE DASHBOARD CONNECTIONS */}
            <Route path="/home" element={<CitizenHome />} />
            <Route path="/portal" element={<CitizenHome />} />
            <Route path="/citizen" element={<CitizenHome />} />
            
            {/* ⚡ CITIZEN CORE CHANNELS */}
            <Route path="/citizen/complaint" element={<ComplaintForm />} />
            <Route path="/citizen/history" element={<CitizenHistory />} />
            <Route path="/citizen/budget" element={<CitizenBudget />} />
            <Route path="/citizen/chat" element={<CitizenChat />} />
            <Route path="/citizen/map" element={<CitizenMap />} />

            {/* AUTHORITY SEGMENTS */}
            <Route path="/authority" element={<AuthorityDashboard />} />
            <Route path="/authority/complaints" element={<AuthorityComplaints />} />
            <Route path="/authority/map" element={<AuthorityMap />} />
            <Route path="/authority/budget" element={<AuthorityBudget />} />

            {/* CONTRACTOR SEGMENTS */}
            <Route path="/contractor" element={<ContractorDashboard />} />
            <Route path="/contractor/roads" element={<ContractorRoads />} />
            <Route path="/contractor/budget" element={<ContractorBudget />} />
            <Route path="/contractor/complaints" element={<ContractorRoads />} />

            {/* FALLBACK REDIRECT */}
            <Route path="*" element={<Navigate to="/citizen" replace />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;