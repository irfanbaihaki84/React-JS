import { useState, useContext } from 'react';
import { NoteContext } from './NoteContext.jsx';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const { addNote } = useContext(NoteContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addNote(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NoteForm;
