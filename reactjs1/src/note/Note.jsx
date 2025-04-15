import { useState } from 'react';

export default function Note({ note, onChange, onDelete }) {
  //   console.log('note ', note);
  const [isEditing, setIsEditing] = useState(false);
  let component;

  function handleChangeText(e) {
    const newNote = {
      ...note,
      text: e.target.value,
    };
    onChange(newNote);
  }

  if (isEditing) {
    component = (
      <>
        <input value={note.text} onChange={handleChangeText} />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    component = (
      <>
        {note.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  function handleChangeDone(e) {
    const newNote = {
      ...note,
      done: e.target.checked,
    };
    onChange(newNote);
  }
  return (
    <label>
      <input checked={note.done} onChange={handleChangeDone} type="checkbox" />
      {component}
      <button onClick={() => onDelete(note)}>Delete</button>
    </label>
  );
}
