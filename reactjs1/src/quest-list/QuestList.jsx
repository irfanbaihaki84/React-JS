import { useState } from 'react';

export default function QuestList() {
  const initial = ['Belajar HTML', 'Belajar CSS', 'Belajar JavaScript'];
  const [quests, setQuests] = useState(initial);

  return (
    <div>
      <h3>Quest List</h3>
      <ul>
        {quests.map((quest) => (
          <li>{quest}</li>
        ))}
      </ul>
    </div>
  );
}
