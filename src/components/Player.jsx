import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  console.log(playerName);
  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  }
  return (
    <section id='player'>
      <h2>
        Welcome {enteredPlayerName ? ` ${enteredPlayerName}` : "Unknown Player"}
      </h2>
      <p>
        <input ref={playerName} type='text' />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

// refs are the values or special values just like the state is the value or variable is the value.
