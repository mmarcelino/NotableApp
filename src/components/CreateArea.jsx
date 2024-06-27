import React, { useState, useRef, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const textareaRef = useRef(null);
  const titleRef = useRef(null);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });

    if (name === "content") {
      adjustTextareaHeight();
    }
  }

  function submitNote(event) {
    if (note.title.trim() === "" && note.content.trim() === "") {
      alert(
        "Your note is looking a bit empty. Add a title and some content before hitting the submit button!"
      );
    } else {
      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    }
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  function adjustTextareaHeight() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  useEffect(() => {
    adjustTextareaHeight();
  }, [note.content]);

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        submitNote(event);
      }
    }

    const textarea = textareaRef.current;
    const titleInput = titleRef.current;

    if (textarea) {
      textarea.addEventListener("keypress", handleKeyPress);
    }

    if (titleInput) {
      titleInput.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener("keypress", handleKeyPress);
      }
      if (titleInput) {
        titleInput.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [note]);

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          onClick={expand}
          onChange={handleChange}
          value={note.title}
          placeholder="Note title goes here"
          ref={titleRef}
        />
        {isExpanded && (
          <textarea
            ref={textareaRef}
            name="content"
            onChange={handleChange}
            value={note.content}
            placeholder="And its content here"
            rows="3"
          />
        )}
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
