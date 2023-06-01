import { NoteData } from "./App";
import { NoteForm } from "./NoteForm";
import Banner from "./component/Banner";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  // onAddTag: (tag: Tag) => void;
  // availableTags: Tag[];
};

export function NewNote({ onSubmit}: NewNoteProps) {
  return (
    <>
      <Banner/>
      <NoteForm
        onSubmit={onSubmit}
        // onAddTag={onAddTag}
        // availableTags={availableTags}
      />
    </>
  );
}
