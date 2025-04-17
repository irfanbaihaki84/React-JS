import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const QuestForm = () => {
  const { currentUser, users, addQuest } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuest = {
      id: Date.now(),
      title,
      description,
      assignedTo: assignedTo.map(Number),
      dueDate,
      status: 'pending',
      createdBy: currentUser.id,
    };
    addQuest(newQuest);
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setAssignedTo([]);
  };

  const handleStudentSelect = (studentId) => {
    setAssignedTo((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const students = users.filter((u) => u.role === 'student');

  return (
    <div className="quest-form">
      <h2>Create New Quest</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Assign to Students:</label>
          <div className="student-select">
            {students.map((student) => (
              <div key={student.id}>
                <input
                  type="checkbox"
                  id={`student-${student.id}`}
                  checked={assignedTo.includes(student.id)}
                  onChange={() => handleStudentSelect(student.id)}
                />
                <label htmlFor={`student-${student.id}`}>
                  {student.username}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Create Quest</button>
      </form>
    </div>
  );
};

export default QuestForm;
