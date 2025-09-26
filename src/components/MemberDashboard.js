import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote } from "../api";
import NotesList from "./NotesList";

export default function MemberDashboard({ token, tenant, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [plan, setPlan] = useState(tenant?.plan || "free");

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const fetchNotes = async () => {
    const data = await getNotes(token);
    setNotes(data.notes || []);
    if (data.tenant) setPlan(data.tenant.plan);
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const handleCreate = async () => {
    const data = await createNote(token, { title: newTitle, content: newContent });
    if (data.error) {
      alert(data.error);
    } else {
      setNewTitle("");
      setNewContent("");
      fetchNotes();
    }
  };

  const handleDelete = async (id) => {
    await deleteNote(token, id);
    fetchNotes();
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <h2>Member Dashboard ({plan})</h2>
      <button onClick={onLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <div style={{ marginBottom: 20 }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          style={{ width: "45%", padding: 8, marginRight: 10 }}
        />
        <input
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Content"
          style={{ width: "45%", padding: 8 }}
        />
        <button onClick={handleCreate} style={{ padding: 8, marginLeft: 10 }}>
          Add
        </button>
      </div>

      <NotesList notes={notes} onDelete={handleDelete} />
    </div>
  );
}
