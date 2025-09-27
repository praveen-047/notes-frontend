// import "./index.css";
// import { MdDelete } from "react-icons/md";

// export default function NotesList({ notes = [], onDelete, onEdit }) {
//   if (!notes || notes.length === 0) {
//     return <p>No notes yet.</p>;
//   }

//   function getRandomColor() {
//   const colors = ["#FFD700", "#FFB6C1", "#ADD8E6", "#90EE90", "#FFA07A", "#E6E6FA"];
//   return colors[Math.floor(Math.random() * colors.length)];
// }

//   return (
//     <ul className="notes-ul-container">
//       {notes.map((note) => (
//         <li className="notes-li-container" key={note._id}>
//           <div className="notes-div" style={{ backgroundColor: getRandomColor() }}>
//             <h1 className="title">{note.title}</h1>
//             <p className="content">{note.content || "(no content)"}</p>
//             <div className="time-delete-container">
//               <p className="time">
//               {note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}
//             </p>
            
//           <MdDelete className="delete-icon" onClick={() => onDelete(note._id)}/>
//             </div>
//           </div>

//         </li>
//       ))}
//     </ul>
//   );
// }









import { useState } from "react";
import { MdDelete, MdEdit, MdSave, MdCancel } from "react-icons/md";
import "./index.css";

export default function NotesList({ notes = [], onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  if (!notes || notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  function getRandomColor() {
    const colors = ["#FFD700", "#FFB6C1", "#ADD8E6", "#90EE90", "#FFA07A", "#E6E6FA"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const startEditing = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const saveEdit = (id) => {
    onEdit(id, editTitle, editContent);
    cancelEditing();
  };

  return (
    <ul className="notes-ul-container">
      {notes.map((note) => (
        <li className="notes-li-container" key={note._id}>
          <div className="notes-div" style={{ backgroundColor: getRandomColor() }}>
            {editingId === note._id ? (
              <>
                <input
                  className="edit-title-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="edit-content-input"
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="edit-btns">
                  <MdSave className="save-icon" onClick={() => saveEdit(note._id)} />
                  <MdCancel className="cancel-icon" onClick={cancelEditing} />
                </div>
              </>
            ) : (
              <>
                <h1 className="title">{note.title}</h1>
                <p className="content">{note.content || "(no content)"}</p>
                <div className="time-delete-container">
                  <p className="time">
                    {note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}
                  </p>
                  <MdEdit className="edit-icon" onClick={() => startEditing(note)} />
                  <MdDelete className="delete-icon" onClick={() => onDelete(note._id)} />
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
