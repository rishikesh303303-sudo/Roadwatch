const BASE_URL = import.meta.env.VITE_API_URL

// ==========================================
// COMPLAINTS API
// ==========================================
export const complaintsAPI = {

  // Saari complaints fetch karo
  getAll: (status = '', severity = '') =>
    fetch(`${BASE_URL}/api/complaints/all`),

  // 500m nearby complaints
  getNearby: (lat, lng) =>
    fetch(`${BASE_URL}/complaints/nearby?lat=${lat}&lng=${lng}&radius=500`),

  // Ek citizen ki saari complaints (CitizenHistory)
  getByUser: (userId) =>
    fetch(`${BASE_URL}/complaints/?user_id=${userId}`),

  // Ek complaint ki detail
  getById: (id) =>
    fetch(`${BASE_URL}/complaints/${id}`),

  // Nai complaint submit karo (photo + GPS + form)
  create: (data) =>
     fetch(`http://localhost:8000/api/complaints/submit`, {
      method: 'POST',
      body: data  // multipart form data
    }),

  // Authority status update kare
  updateStatus: (id, status) =>
    fetch(`${BASE_URL}/api/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }),

  // Contractor fix photo upload kare
  markAsFixed: (id, photoData, note) =>
    fetch(`${BASE_URL}/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'resolved_by_contractor',
        note: note,
        fix_photo: photoData
      })
    }),

  // Authority fix verify kare — approve
  verifyFix: (id) =>
    fetch(`${BASE_URL}/api/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'resolved' })
    }),

  // Authority fix reject kare — dobara karo
  rejectFix: (id, reason) =>
    fetch(`${BASE_URL}/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'rejected_fix',
        reason: reason
      })
    }),

  // Complaint ko support karo
  support: (id) =>
    fetch(`${BASE_URL}/complaints/${id}/support`, {
      method: 'POST'
    }),

  // Duplicate check karo
  checkDuplicate: (lat, lng) =>
    fetch(`${BASE_URL}/api/complaints/all`),

}

// ==========================================
// ROADS API
// ==========================================
export const roadsAPI = {

  // State ki saari roads
  getAll: (state, limit = 100) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&limit=${limit}`),

  // Ek road ki poori detail + fraud info
  getById: (id) =>
    fetch(`${BASE_URL}/roads/${id}`),

  // Budget summary — sanctioned vs spent
  getBudget: (state) =>
    fetch(`${BASE_URL}/roads/budget/summary?state_code=${state}`),

  // Nearest road from GPS location
  getNearest: (lat, lng) =>
    fetch(`${BASE_URL}/roads/?lat=${lat}&lng=${lng}&limit=1`),

  // Road type filter — NH/SH/MDR/VR
  getByType: (state, type) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&road_type=${type}`),

  // Fraud flagged roads
  getFraudRoads: (state) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&fraud_flag=true`),

  // Road wise budget detail
  getBudgetById: (id) =>
    fetch(`${BASE_URL}/roads/${id}/budget`),

  // Road ki complaint count
  getComplaintCount: (id) =>
    fetch(`${BASE_URL}/roads/${id}`),

}

// ==========================================
// CHAT API
// ==========================================
export const chatAPI = {

  // Message bhejo AI ko
  send: (message, context = '') =>
    fetch(`${BASE_URL}/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        context: context  // road context agar road page se aao
      })
    }),

}

// ==========================================
// AUTHORITY API
// ==========================================
export const authorityAPI = {

  // Dashboard stats
  getStats: (state) =>
    fetch(`${BASE_URL}/authority/stats?state_code=${state}`),

  // Authority inbox — saari complaints
  getComplaints: (email, status = '', severity = '') =>
    fetch(`${BASE_URL}/authority/complaints?authority_email=${email}&status=${status}&severity=${severity}`),

  // Escalated complaints — 20+ supporters
  getEscalated: (email) =>
    fetch(`${BASE_URL}/authority/complaints?authority_email=${email}&escalated=true`),

  // Fraud report
  getFraudReport: (state) =>
    fetch(`${BASE_URL}/authority/fraud?state_code=${state}`),

  // Complaint search
  searchComplaints: (email, query) =>
    fetch(`${BASE_URL}/authority/complaints?authority_email=${email}&search=${query}`),

  // Bulk status update
  bulkUpdateStatus: (ids, status) =>
    fetch(`${BASE_URL}/authority/complaints/bulk`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status })
    }),

}

// ==========================================
// CONTRACTOR API
// ==========================================
export const contractorAPI = {

  // Contractor ki assigned roads
  getRoads: (state, limit = 100) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&limit=${limit}`),

  // Contractor ki roads pe complaints
  getComplaints: (contractorId) =>
    fetch(`${BASE_URL}/complaints/?contractor_id=${contractorId}`),

  // Budget summary
  getBudget: (state) =>
    fetch(`${BASE_URL}/roads/budget/summary?state_code=${state}`),

  // Fix photo upload
  uploadFixPhoto: (complaintId, formData) =>
    fetch(`${BASE_URL}/complaints/${complaintId}/fix-photo`, {
      method: 'POST',
      body: formData  // multipart
    }),

  // Fix photo history
  getFixPhotos: (contractorId) =>
    fetch(`${BASE_URL}/complaints/?contractor_id=${contractorId}&has_fix_photo=true`),

  // Fraud flagged roads
  getFraudRoads: (state) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&fraud_flag=true`),

}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Response parse karne ka helper
export const parseResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  return await response.json()
}

// API call with loading + error handle
export const apiCall = async (apiFn, onSuccess, onError, setLoading) => {
  try {
    if (setLoading) setLoading(true)
    const res = await apiFn()
    const data = await parseResponse(res)
    if (onSuccess) onSuccess(data)
  } catch (err) {
    console.error('API Error:', err)
    if (onError) onError(err)
  } finally {
    if (setLoading) setLoading(false)
  }
}