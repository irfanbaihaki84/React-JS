import { createContext, useEffect, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const initialData = [
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Build a task list app', completed: true },
    { id: 3, title: 'Deploy to production', completed: false },
  ];

  const [notes, setNotes] = useState(initialData);

  const addNote = (title) => {
    const newNote = {
      id: Date.now(),
      title,
      completed: false,
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleNote = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  const updateNoteTitle = (id, newTitle) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      )
    );
  };

  // useEffect(() => {
  //   console.log('useEffect ', notes);
  // }, [setNotes]);

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        toggleNote,
        updateNoteTitle,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
