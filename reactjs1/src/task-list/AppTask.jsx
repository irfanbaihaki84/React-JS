import { useState } from 'react';
import TaskList from './TaskList.jsx';
import TaskForm from './TaskForm.jsx';
import './App.css';

// Initial dummy data
const initialData = [
  { id: 1, title: 'Learn HTML', completed: false },
  { id: 2, title: 'Build Web HTML', completed: true },
  { id: 3, title: 'Learn CSS', completed: false },
  { id: 4, title: 'Build Web with CSS', completed: true },
  { id: 5, title: 'Learn Javascript', completed: false },
  { id: 6, title: 'Learn React Js', completed: false },
  { id: 7, title: 'Build a task list app', completed: true },
  { id: 8, title: 'Deploy to production', completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialData);

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskTitle = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  return (
    <div className="app">
      <h1>Task List</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        updateTaskTitle={updateTaskTitle}
      />
    </div>
  );
}

export default App;
