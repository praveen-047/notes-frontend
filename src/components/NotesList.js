// src/components/NotesList.js
import React from "react";

export default function NotesList({ notes = [], onDelete, onEdit }) {
  if (!notes || notes.length === 0) {
    return <p>No notes yet.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {notes.map((note) => (
        <li
          key={note._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ maxWidth: "80%" }}>
            {note.title && <h4 style={{ margin: "0 0 6px 0" }}>{note.title}</h4>}
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {note.content || "(no content)"}
            </p>
            <small style={{ color: "#666" }}>
              {note.createdAt ? new Date(note.createdAt).toLocaleString() : ""}
            </small>
          </div>

          <div style={{ marginLeft: 12, display: "flex", gap: 8 }}>
            {typeof onEdit === "function" && (
              <button
                onClick={() => onEdit(note)}
                style={{
                  padding: "6px 8px",
                  borderRadius: 6,
                  border: "1px solid #bbb",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            )}

            <button
              onClick={() => onDelete(note._id)}
              style={{
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #e55353",
                background: "#ffefef",
                color: "#a40000",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
