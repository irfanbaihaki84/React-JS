export default function Quest({ text, isCompleted, isDeleted = false }) {
  if (isDeleted) {
    return null;
  } else {
    return (
      <li>
        {text} {isCompleted && '✅ '}
      </li>
    );
  }
}
