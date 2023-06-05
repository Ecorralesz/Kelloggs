import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from "./NewNote";
import { useEffect } from "react";
import axios from "axios";
import { NoteList } from "./NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";
import { EditNote } from "./EditNote";
import { useState } from "react";
import { useLottie } from "lottie-react";
import animationData from "./assets/corn.json";
import animationData2 from "./assets/kb.json";
import './App.css'

export type Note = {
  id: string;
  // tags: Tag[]; // Include the 'tags' property
  subject: string; // Include the 'subject' property
} & NoteData;

export type RawNote = {
  id: string;
  // tags: Tag[]; // Include the 'tags' property
  subject: string; // Include the 'subject' property
} & RawNoteData;

export type RawNoteData = {
  subject: string;
  markdown: string;
  // tagIds: string[];
};

export type NoteData = {
  subject: string;
  markdown: string;
  // tags: Tag[];
};

// export type Tag = {
//   id: string;
//   label: string;
// };

function App() {
  const [notes, setNotes] = useState<RawNote[]>([]);
  // const [tags, setTags] = useState<Tag[]>([]);


  useEffect(() => {
    // Fetch notes
    axios
      .get("https://kelloggs-api.onrender.com/emails")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching notes:", error);
      });

    // Fetch tags
    // axios.get('http://localhost:3000/tags')
    //   .then((response) => {
    //     setTags(response.data);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error('Error fetching tags:', error);
    //   });
  }, []);

  function onCreateNote({ ...data }: NoteData) {
    // Make the HTTP POST request to create a new note
    axios
      .post("https://kelloggs-api.onrender.com/emails", data)
      .then((response) => {
        // Get the newly created note from the response
        const newNote: RawNote = response.data;

        // Update the state with the newly created note
        setNotes((prevNotes) => [...prevNotes, newNote]);
      })
      .catch((error) => {
        // Handle error
        console.error("Error creating note:", error);
      });
  }

  function onUpdateNote(id: string, { ...data }: NoteData) {
    // Make the HTTP PUT request to update the note
    axios
      .patch(`https://kelloggs-api.onrender.com/emails/${id}`, data)
      .then((response) => {
        // Get the updated note data from the response
        const updatedNoteData: RawNote = response.data;

        // Update the state with the modified note
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
        // Handle error
        console.error("Error updating note:", error);
      });
  }

  function onDeleteNote(id: string) {
    // Make the HTTP DELETE request to delete the note
    axios
      .delete(`https://kelloggs-api.onrender.com/emails/${id}`)
      .then(() => {
        // Update the state by removing the deleted note
        setNotes((prevNotes) => {
          return prevNotes.filter((note) => note.id !== id);
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting note:", error);
      });
  }

  // function addTag(tag: Tag) {
  //   setTags((prev) => [...prev, tag]);
  // }

  // function updateTag(id: string, label: string) {
  //   setTags((prevTags) => {
  //     return prevTags.map((tag) => {
  //       if (tag.id === id) {
  //         return { ...tag, label };
  //       } else {
  //         return tag;
  //       }
  //     });
  //   });
  // }

  // function deleteTag(id: string) {
  //   setTags((prevTags) => {
  //     return prevTags.filter((tag) => tag.id !== id);
  //   });
  // }

  // Lottie Options
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const lottieOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View: View1 } = useLottie(lottieOptions);
  const { View: View2 } = useLottie(lottieOptions2);
  
  

  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notes={notes}
              // availableTags={tags}
              // onUpdateTag={updateTag}
              // onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              // onAddTag={addTag}
              // availableTags={tags}
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
                // onAddTag={addTag}
                // availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <div className="LottieImage">
        {View1}
      </div> */}
      <div className="LottieImage2" style={{width: 400}}>
        {View2}
      </div>
      <div className="LottieImage" style={{width: 400}}>
        {View1}
      </div>
    </Container>
  );
}

export default App;
