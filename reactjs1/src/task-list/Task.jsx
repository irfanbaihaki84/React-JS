import { useState } from 'react';

const Task = ({ task, deleteTask, toggleTask, updateTaskTitle }) => {
  const [isEditing, setIsEditing] = useState('');
  const [editedTitle, setEditedTitle] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateTaskTitle(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
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
            {task.title}
          </span>
        )}
      </div>
      <div className="task-actions">
        {!isEditing && (
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
        )}
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
