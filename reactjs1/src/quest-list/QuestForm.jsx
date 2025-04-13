export default function QuestForm() {
  function handlerSubmit() {
    return 'uncompleted!';
  }
  return (
    <>
      <h1>QUEST LIST</h1>
      <form>
        <label>Input Quest: </label>
        <input
          onChange={handlerSubmit()}
          type="text"
          placeholder="Mausukan Tugas...✅"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
