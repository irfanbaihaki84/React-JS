export default function HelloWorld() {
  return (
    <>
      <HeaderHelloWorld />
      <ParagrapHelloWorld />
    </>
  );
}

function HeaderHelloWorld() {
  const text = 'Hello World';
  return (
    <h1
      style={{
        color: 'blue',
        backgroundColor: 'red',
        textAlign: 'center',
      }}
    >
      {text.toUpperCase()}
    </h1>
  );
}

function ParagrapHelloWorld() {
  const text = 'Selmat Belajar React JS';
  return (
    <p
      style={{
        color: 'green',
        backgroundColor: 'yellow',
      }}
    >
      {text.toLowerCase()}
    </p>
  );
}
