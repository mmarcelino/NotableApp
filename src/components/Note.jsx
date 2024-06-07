
import React, { useState, useEffect, useRef } from "react";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content
  });

  const textareaRef = useRef(null);
  const titleInputRef = useRef(null);  // Create a ref for the title input

  useEffect(() => {
    if (isEditing) {
      if (textareaRef.current) {
        adjustTextareaHeight();
      }
      if (titleInputRef.current) {
        titleInputRef.current.focus();  // Focus the title input when entering edit mode
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
      [name]: value
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
            ref={titleInputRef}  // Attach the ref to the title input
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
          <button type="button" onClick={handleSave}><CheckCircleIcon /></button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button type="button" onClick={handleDelete}><DeleteIcon /></button>
          <button type="button" onClick={handleEdit}><EditIcon /></button>
        </div>
      )}
    </div>
  );
}

export default Note;

