export default function QuestList({ items = [] }) {
  return (
    <>
      <h1>Quest List</h1>
      <ul>
        {items.map((hasil, index) => (
          <li key={index}>
            <input type="checkbox" />
            Quest: {hasil} - {hasil}
            <button>Save</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
