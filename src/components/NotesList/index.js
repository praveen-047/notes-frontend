import "./index.css";
import { MdDelete } from "react-icons/md";

export default function NotesList({ notes = [], onDelete, onEdit }) {
  if (!notes || notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  function getRandomColor() {
  const colors = ["#FFD700", "#FFB6C1", "#ADD8E6", "#90EE90", "#FFA07A", "#E6E6FA"];
  return colors[Math.floor(Math.random() * colors.length)];
}

  return (
    <ul className="notes-ul-container">
      {notes.map((note) => (
        <li className="notes-li-container" key={note._id}>
          <div className="notes-div" style={{ backgroundColor: getRandomColor() }}>
            <h1 className="title">{note.title}</h1>
            <p className="content">{note.content || "(no content)"}</p>
            <div className="time-delete-container">
              <p className="time">
              {note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}
            </p>
            
          <MdDelete className="delete-icon" onClick={() => onDelete(note._id)}/>
            </div>
          </div>

        </li>
      ))}
    </ul>
  );
}
