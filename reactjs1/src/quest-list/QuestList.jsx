export default function QuestList({ items = [] }) {
  return (
    <>
      <h1>Quest List</h1>
      {items.map((hasil, index) => (
        <p key={hasil.id}>
          Quest: {hasil.text} - {hasil.isCompleted}
        </p>
      ))}
    </>
  );
}
