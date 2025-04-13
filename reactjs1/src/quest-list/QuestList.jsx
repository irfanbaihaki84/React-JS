import Quest from './Quest';

export default function QuestList() {
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

  return (
    <ul>
      {data.map((quest) => (
        <Quest key={quest.id} {...quest} />
      ))}
    </ul>
  );
}
