// import { useEffect, useState } from "react";
// import { getNotes, createNote, deleteNote } from "../../api";
// import NotesList from "../NotesList";
// import "./index.css";

// export default function MemberDashboard({ token, tenant, onLogout }) {
//   const [notes, setNotes] = useState([]);
//   const [plan, setPlan] = useState(tenant?.plan || "free");
//   const [loading, setLoading] = useState(false);

//   const [newTitle, setNewTitle] = useState("");
//   const [newContent, setNewContent] = useState("");

//   const fetchNotes = async () => {
//     try {
//       setLoading(true);
//       const data = await getNotes(token);
//       setNotes(data.notes || []);
//       if (data.tenant) setPlan(data.tenant.plan);
//     } catch (err) {
//       console.error("Error fetching notes:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotes();
//   }, [token]);

//   const handleCreate = async () => {
//     const data = await createNote(token, {
//       title: newTitle,
//       content: newContent,
//     });
//     if (data.error) {
//       alert(data.error);
//     } else {
//       setNewTitle("");
//       setNewContent("");
//       fetchNotes();
//     }
//   };

//   const handleDelete = async (id) => {
//     await deleteNote(token, id);
//     fetchNotes();
//   };

//   const supColor = plan === "pro" ? "gold" : "white";
//   return (
//     <div className="dashboard-container">
//       <div className="header">
//         <h1 className="dashboard-header">
//           Dashboar <sup className={`${supColor}`}>{plan}</sup>{" "}
//         </h1>
//         <button className="logout-btn" onClick={onLogout}>
//           Logout
//         </button>
//       </div>

//       <div className="input-container">
//         <h1 className="notes-heading">Notes</h1>
//         <input
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           placeholder="Title"
//         />
//         <textarea
//           value={newContent}
//           onChange={(e) => setNewContent(e.target.value)}
//           placeholder="Enter your Content"
//           rows={4}
//         />
//         <button className="add-btn" onClick={handleCreate}>
//           Add
//         </button>
//       </div>

//       {loading ? (
//         <div class="sk-chase">
//   <div class="sk-chase-dot"></div>
//   <div class="sk-chase-dot"></div>
//   <div class="sk-chase-dot"></div>
//   <div class="sk-chase-dot"></div>
//   <div class="sk-chase-dot"></div>
//   <div class="sk-chase-dot"></div>
// </div>
//       ) : (
//         <NotesList notes={notes} onDelete={handleDelete} />
//       )}
//     </div>
//   );
// }








import { useEffect, useState } from "react";
import { getNotes, createNote, deleteNote, updateNote } from "../../api";
import NotesList from "../NotesList";
import "./index.css";

export default function MemberDashboard({ token, tenant, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [plan, setPlan] = useState(tenant?.plan || "free");
  const [loading, setLoading] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes(token);
      setNotes(data.notes || []);
      if (data.tenant) setPlan(data.tenant.plan);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const handleCreate = async () => {
    const data = await createNote(token, {
      title: newTitle,
      content: newContent,
    });
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

  const handleEdit = async (id, updatedTitle, updatedContent) => {
  try {
    const data = await updateNote(token, id, {
      title: updatedTitle,
      content: updatedContent,
    });

    if (data.error) {
      alert(data.error);
    } else if (data.note) {
      // update local state directly instead of re-fetching
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title: updatedTitle, content: updatedContent } : note
        )
      );
    }
  } catch (err) {
    console.error("Error updating note:", err);
  }
};


  const supColor = plan === "pro" ? "gold" : "white";

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 className="dashboard-header">
          Dashboard <sup className={`${supColor}`}>{plan}</sup>
        </h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="input-container">
        <h1 className="notes-heading">Notes</h1>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Enter your Content"
          rows={4}
        />
        <button className="add-btn" onClick={handleCreate}>
          Add
        </button>
      </div>

      {loading ? (
        <div className="sk-chase">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="sk-chase-dot"></div>
          ))}
        </div>
      ) : (
        <NotesList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </div>
  );
}
