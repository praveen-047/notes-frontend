import { useEffect, useState } from "react";
import { getMembers, upgradeTenant } from "../../api";
import "./index.css";

export default function AdminDashboard({ token, tenant, onLogout }) {
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  const fetchMembers = async () => {
    setLoadingMembers(true); // start loader
    try {
      const data = await getMembers(token);
      setMembers(data.members || []);
    } catch (err) {
      console.error("Failed to fetch members:", err);
      alert("Failed to load members");
    } finally {
      setLoadingMembers(false); // stop loader
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      await upgradeTenant(token, tenant.slug);
      alert("Tenant upgraded to Pro!");
    } catch (err) {
      console.error("Upgrade failed:", err);
      alert("Upgrade failed. Try again.");
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 className="dashboard-header">Admin</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="admin-container">
        <h3>Tenant Members</h3>
        {loadingMembers ? (
          <p>Loading members...</p>
        ) : (
          <ul className="members-list">
            {members.map((m) => (
              <li key={m._id} className="member-item">
                <p>
                  <b>{m.email}</b> ({m.role})
                </p>
                <button
                  className="upgrade-btn"
                  onClick={handleUpgrade}
                  disabled={upgrading} // prevent multiple clicks
                >
                  {upgrading ? "Upgrading..." : "Upgrade to Pro"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
