import { useState } from 'react';

// fungsi useImmer yaitu mengcopy/menyalin data asli
// yang ditampung ke draft maka data di draft dapat
// di edit sesuai kebutuhan
import { useImmer } from 'use-immer';
import QuestForm from './QuestForm';
import QuestList from './QuestList';

const data = [
  {
    id: 0,
    text: 'Belajar HTML',
    isCompleted: false,
  },
  {
    id: 1,
    text: 'Belajar CSS',
    isCompleted: false,
  },
  {
    id: 2,
    text: 'Belajar JavaScript',
    isCompleted: true,
  },
  {
    id: 3,
    text: 'Belajar React JS',
    isCompleted: true,
  },
];

export default function Quest() {
  const [item, setItem] = useState('');
  const [items, setItems] = useImmer([]);

  function handleQuestChange(e) {
    setItem(e.target.value);
  }

  function handleQuestClick(e) {
    e.preventDefault();
    setItems((draft) => {
      draft.push(item);
    });
    setItem('');
  }
  return (
    <div>
      <QuestForm
        item={item}
        handleQuestChange={handleQuestChange}
        handleQuestClick={handleQuestClick}
      />
      <QuestList items={items} />
    </div>
  );
}
