import Task from './Task.jsx';

const TaskList = ({ tasks, deleteTask, toggleTask, updateTaskTitle }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found. Add a new task!</p>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            updateTaskTitle={updateTaskTitle}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
