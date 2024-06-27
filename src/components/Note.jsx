import React, { useState, useEffect, useRef } from "react";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });

  const textareaRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length
        );
        adjustTextareaHeight();
      }
    }
  }, [isEditing]);

  function handleDelete(event) {
    event.preventDefault();
    props.onDelete(props.id);
  }

  function handleEdit(event) {
    event.preventDefault();
    setIsEditing(true);
  }

  function handleSave(event) {
    event.preventDefault();
    props.onEdit(props.id, editedNote);
    setIsEditing(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function adjustTextareaHeight() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <input
            name="title"
            onChange={handleChange}
            value={editedNote.title}
          />
          <textarea
            ref={textareaRef}
            name="content"
            onChange={handleChange}
            value={editedNote.content}
            rows="1"
          />
          <button type="button" className="btn-done" onClick={handleSave}>
            Done
          </button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <div className="buttons">
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
