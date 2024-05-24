import React from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import notes from "../notes";

function App() {
  return (
    <>
      <Header />
      {notes.map((note) => (
        <Note key={note.key} header={note.title} body={note.content} />
      ))}
      ;
      <Footer />
    </>
  );
}

export default App;

