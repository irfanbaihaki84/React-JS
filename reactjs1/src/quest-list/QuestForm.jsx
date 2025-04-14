export default function QuestForm({
  item,
  handleQuestChange,
  handleQuestClick,
}) {
  return (
    <div>
      <h1>Quest Form</h1>
      <form>
        <input
          value={item}
          onChange={handleQuestChange}
          type="text"
          placeholder="Quest..."
        />
        <button onClick={handleQuestClick}>Submit</button>
      </form>
      <button>Reset</button>
    </div>
  );
}
