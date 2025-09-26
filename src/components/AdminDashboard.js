import { useEffect, useState } from "react";
import { getMembers, upgradeTenant } from "../api";

export default function AdminDashboard({ token, tenant, onLogout }) {
  const [members, setMembers] = useState([]);
  const [plan, setPlan] = useState("free");

  const fetchMembers = async () => {
    const data = await getMembers(token);
    setMembers(data.members || []);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleUpgrade = async () => {
    await upgradeTenant(token, tenant.slug);
    alert("Tenant upgraded to Pro!");
    setPlan("pro");
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Admin Dashboard ({plan})</h2>
      <button onClick={onLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <h3>Tenant Members</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {members.map((m) => (
          <li
            key={m._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
              marginBottom: 10,
            }}
          >
            <p><b>{m.email}</b> ({m.role})</p>
          </li>
        ))}
      </ul>

      <button onClick={handleUpgrade} style={{ marginTop: 20, padding: 10 }}>
        Upgrade to Pro
      </button>
    </div>
  );
}
