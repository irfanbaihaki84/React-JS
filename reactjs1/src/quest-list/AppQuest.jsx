import Quest from './Quest';

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

function AppQuest() {
  return (
    <>
      <Quest />
    </>
  );
}

export default AppQuest;
