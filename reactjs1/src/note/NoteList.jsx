import Note from './Note';

export default function NoteList({ notes, onChange, onDelete }) {
  console.log('notelist ', notes);
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Note note={note} onChange={onChange} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
