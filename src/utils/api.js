const BASE_URL = import.meta.env.VITE_API_URL

export const complaintsAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/api/complaints/all`),

  getNearby: (lat, lng) =>
    fetch(`${BASE_URL}/complaints/nearby?lat=${lat}&lng=${lng}&radius=500`),

  getByUser: (userId) =>
    fetch(`${BASE_URL}/complaints/?user_id=${userId}`),

  getById: (id) =>
    fetch(`${BASE_URL}/complaints/${id}`),

  create: (data) =>
    fetch(`${BASE_URL}/api/complaints/submit`, {
      method: 'POST',
      body: data
    }),

  updateStatus: (id, status) =>
    fetch(`${BASE_URL}/api/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }),

  markAsFixed: (id, photoData, note) =>
    fetch(`${BASE_URL}/api/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'resolved_by_contractor',
        note: note,
        fix_photo: photoData
      })
    }),

  verifyFix: (id) =>
    fetch(`${BASE_URL}/api/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'resolved' })
    }),

  rejectFix: (id, reason) =>
    fetch(`${BASE_URL}/api/complaints/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected_fix', reason: reason })
    }),

  support: (id) =>
    fetch(`${BASE_URL}/complaints/${id}/support`, {
      method: 'POST'
    }),

  checkDuplicate: (lat, lng) =>
    fetch(`${BASE_URL}/api/complaints/all`),
}

export const roadsAPI = {
  getAll: (state, limit = 100) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&limit=${limit}`),

  getById: (id) =>
    fetch(`${BASE_URL}/roads/${id}`),

  getBudget: (state) =>
    fetch(`${BASE_URL}/roads/budget/summary?state_code=${state}`),

  getNearest: (lat, lng) =>
    fetch(`${BASE_URL}/roads/?lat=${lat}&lng=${lng}&limit=1`),

  getByType: (state, type) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&road_type=${type}`),

  getFraudRoads: (state) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&fraud_flag=true`),

  getBudgetById: (id) =>
    fetch(`${BASE_URL}/roads/${id}/budget`),

  getComplaintCount: (id) =>
    fetch(`${BASE_URL}/roads/${id}`),
}

export const chatAPI = {
  send: (message, context = '') =>
    fetch(`${BASE_URL}/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context })
    }),
}

export const authorityAPI = {
  getStats: (state) =>
    fetch(`${BASE_URL}/authority/stats?state_code=${state}`),

  getComplaints: (email, status = '', severity = '') =>
    fetch(`${BASE_URL}/authority/complaints?authority_email=${email}&status=${status}&severity=${severity}`),

  getEscalated: (email) =>
    fetch(`${BASE_URL}/authority/complaints?authority_email=${email}&escalated=true`),

  getFraudReport: (state) =>
    fetch(`${BASE_URL}/authority/fraud?state_code=${state}`),

  searchComplaints: (email, query) =>
    fetch(`${BASE_URL}/authority/complaints?authority_email=${email}&search=${query}`),

  bulkUpdateStatus: (ids, status) =>
    fetch(`${BASE_URL}/authority/complaints/bulk`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status })
    }),
}

export const contractorAPI = {
  getRoads: (state, limit = 100) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&limit=${limit}`),

  getComplaints: (contractorId) =>
    fetch(`${BASE_URL}/complaints/?contractor_id=${contractorId}`),

  getBudget: (state) =>
    fetch(`${BASE_URL}/roads/budget/summary?state_code=${state}`),

  uploadFixPhoto: (complaintId, formData) =>
    fetch(`${BASE_URL}/api/complaints/${complaintId}/fix-photo`, {
      method: 'POST',
      body: formData
    }),

  getFixPhotos: (contractorId) =>
    fetch(`${BASE_URL}/complaints/?contractor_id=${contractorId}&has_fix_photo=true`),

  getFraudRoads: (state) =>
    fetch(`${BASE_URL}/roads/?state_code=${state}&fraud_flag=true`),
}

export const parseResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  return await response.json()
}

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