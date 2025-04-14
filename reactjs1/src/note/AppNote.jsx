import { useImmer } from 'use-immer';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

let id = 0;
const initialNotes = [
  {
    id: id++,
    text: 'Belajar HTML',
    done: false,
  },
  {
    id: id++,
    text: 'Belajar CSS',
    done: false,
  },
  {
    id: id++,
    text: 'Belajar JavaScript',
    done: true,
  },
  {
    id: id++,
    text: 'Belajar React JS',
    done: true,
  },
];

function AppNote() {
  const [notes, setNotes] = useImmer(initialNotes);

  function handleAddNote(text) {
    console.log('handleAddNote<appNote ', text);
    setNotes((draft) => {
      draft.push({
        id: id++,
        text: text,
        done: false,
      });
    });
  }

  function handleChangeNote(note) {
    console.log('handleChangeNote<appNote ', note);
    setNotes((draft) => {
      const index = draft.findIndex((item) => {
        item.id === note.id;
      });
      draft[index] = note;
    });
  }

  function handleDeleteNote(note) {
    setNotes((draft) => {
      const index = draft.findIndex((item) => {
        item.id === note.id;
      });
      draft.splice(index, 1);
    });
  }
  return (
    <>
      <h3>App Note</h3>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList
        notes={notes}
        onChange={handleChangeNote}
        onDelete={handleDeleteNote}
      />
    </>
  );
}
export default AppNote;
