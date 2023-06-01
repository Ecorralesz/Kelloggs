import { NoteData } from "./App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";
import Banner from "./component/Banner";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  // onAddTag: (tag: Tag) => void;
  // availableTags: Tag[];
};

export function EditNote({ onSubmit }: EditNoteProps) {
  const note = useNote()
  return (
    <>
      <Banner/>
      <NoteForm
        subject={note.subject}
        markdown={note.markdown}
        // tags={note.tags}
        onSubmit={data => onSubmit(note.id, data)}
        // onAddTag={onAddTag}
        // availableTags={availableTags}
      />
    </>
  );
}
