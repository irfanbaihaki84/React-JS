import Note from './Note.jsx';
import { useContext } from 'react';
import { NoteContext } from './NoteContext.jsx';

const NoteList = () => {
  const { notes } = useContext(NoteContext);

  return (
    <div className="task-list">
      {notes.length === 0 ? (
        <p>No Notes found. Add a new note!</p>
      ) : (
        notes.map((note) => <Note key={note.id} note={note} />)
      )}
    </div>
  );
};

export default NoteList;
