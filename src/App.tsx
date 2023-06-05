import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from "./NewNote";
import { useEffect, useState } from "react";
import axios from "axios";
import { NoteList } from "./NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";
import { EditNote } from "./EditNote";


export type Note = {
  id: string;
  subject: string;
} & NoteData;

export type RawNote = {
  id: string;
  subject: string;
} & RawNoteData;

export type RawNoteData = {
  subject: string;
  markdown: string;
};

export type NoteData = {
  subject: string;
  markdown: string;
};

function App() {
  const [notes, setNotes] = useState<RawNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch notes
    axios
      .get("https://kelloggs-api.onrender.com/emails")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function onCreateNote({ ...data }: NoteData) {
    // Make the HTTP POST request to create a new note
    axios
      .post("https://kelloggs-api.onrender.com/emails", data)
      .then((response) => {
        const newNote: RawNote = response.data;
        setNotes((prevNotes) => [...prevNotes, newNote]);
      })
      .catch((error) => {
        console.error("Error creating note:", error);
      });
  }

  function onUpdateNote(id: string, { ...data }: NoteData) {
    // Make the HTTP PUT request to update the note
    axios
      .patch(`https://kelloggs-api.onrender.com/emails/${id}`, data)
      .then((response) => {
        const updatedNoteData: RawNote = response.data;
        setNotes((prevNotes) => {
          return prevNotes.map((note) => {
            if (note.id === id) {
              return { ...note, ...updatedNoteData };
            } else {
              return note;
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  }

  function onDeleteNote(id: string) {
    // Make the HTTP DELETE request to delete the note
    axios
      .delete(`https://kelloggs-api.onrender.com/emails/${id}`)
      .then(() => {
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => note.id !== id);
        });
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }


  return (
    <Container className="my-4">
        <Routes>
          <Route
            path="/"
            element={
              <NoteList
                notes={notes}
              />
            }
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
              />
            }
          />
          <Route path="/:id" element={<NoteLayout notes={notes} />}>
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </Container>
  );
}

export default App;
