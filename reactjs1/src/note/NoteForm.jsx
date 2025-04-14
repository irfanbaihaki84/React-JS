import { useState } from 'react';

export default function NoteForm({ onAddNote }) {
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleClick() {
    setText('');
    onAddNote(text);
  }
  return (
    <>
      <h3>NoteForm Page</h3>
      {/* <form> */}
      <input
        value={text}
        onChange={handleChange}
        type="text"
        placeholder="Add Note..."
      />
      <button onClick={handleClick}>Add</button>
      {/* </form> */}
    </>
  );
}
