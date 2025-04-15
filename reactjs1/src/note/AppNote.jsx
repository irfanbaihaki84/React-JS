import NoteList from './NoteList.jsx';
import NoteForm from './NoteForm.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Note List</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
}

export default App;
