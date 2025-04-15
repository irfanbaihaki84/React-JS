import { useState, useContext } from 'react';
import { NoteContext } from './NoteContext.jsx';

const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const { deleteNote, toggleNote, updateNoteTitle } = useContext(NoteContext);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateNoteTitle(note.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(note.title);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task ${note.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={note.completed}
          onChange={() => toggleNote(note.id)}
        />

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span onDoubleClick={handleEdit} className="task-title">
            {note.title}
          </span>
        )}
      </div>
      <div className="task-actions">
        {!isEditing && (
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className="delete-btn" onClick={() => deleteNote(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
