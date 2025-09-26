const API_URL = "https://notes-backend-tawny.vercel.app"; 

// const API_URL = 'http://localhost:4000'
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}


export async function getMembers(token) {
  const res = await fetch(`${API_URL}/users/tenant-members`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}



export async function getNotes(token) {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createNote(token, note) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note), // note = { title, content }
  });
  return res.json();
}



export async function deleteNote(token, id) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function upgradeTenant(token, tenantSlug) {
  const res = await fetch(`${API_URL}/tenants/${tenantSlug}/upgrade`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

