import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [listOfNotes, setListOfNotes] = useState([]);

  function addNote(note) {
    setListOfNotes((prevNotes) => [...prevNotes, note]);
  }

  function deleteNote(id) {
    setListOfNotes((prevItems) =>
      prevItems.filter((item, index) => index !== id)
    );
  }

  function editNote(id, updatedNote) {
    setListOfNotes((prevNotes) =>
      prevNotes.map((note, index) => (index === id ? updatedNote : note))
    );
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="main-content container">
        {listOfNotes.map((n, i) => (
          <Note
            key={i}
            id={i}
            content={n.content}
            title={n.title}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
