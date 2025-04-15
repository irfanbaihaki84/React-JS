import { useImmer } from 'use-immer';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import { useReducer } from 'react';

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

// function notesReducer(notes, action) {
//   switch (action.type) {
//     case 'ADD_NOTE':
//       return [
//         ...notes,
//         {
//           id: id++,
//           text: action.text,
//           done: false,
//         },
//       ];

//     case 'CHANGE_NOTE':
//       return notes.map((note) =>
//         note.id === action.id
//           ? { ...notes, text: action.text, done: action.done }
//           : note
//       );
//     case 'DELETE_NOTE':
//       return notes.filter((note) => note.id !== action.id);
//     default:
//       return notes;
//   }
// }

function AppNote() {
  const [notes, setNotes] = useImmer(initialNotes);
  //   const [notes, dispatch] = useReducer(notesReducer, initialNotes);

  function handleAddNote(text) {
    console.log('handleAddNote<appNote ', text);
    setNotes((draft) => {
      draft.push({
        id: id++,
        text: text,
        done: false,
      });
    });
    // dispatch({
    //   type: 'ADD_NOTE',
    //   text: text,
    // });
  }

  function handleChangeNote(note) {
    console.log('handleChangeNote<appNote ', note);
    setNotes((draft) => {
      const index = draft.findIndex((item) => {
        item.id === note.id;
      });
      draft[index].text = note.text;
      draft[index].done = note.done;
    });
    // dispatch({
    //   ...note,
    //   type: 'CHANGE_NOTE',
    // });
  }

  function handleDeleteNote(note) {
    setNotes((draft) => {
      const index = draft.findIndex((item) => {
        item.id === note.id;
      });
      draft.splice(index, 1);
    });
    // dispatch({
    //   type: 'DELETE_NOTE',
    //   id: note.id,
    // });
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
