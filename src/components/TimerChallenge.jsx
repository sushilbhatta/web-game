// Ref are used to access the DOM elements and remember their values
import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000); //taret time in milliseconds
  const dialog = useRef();
  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  //automaticlally stop the timer is time is over
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  //manuallly stop using btn
  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }
  // assign  a value to timer.current ==> value is
  // timer.current = setTimeout(() => {
  //   setTimerExpired(true);
  //   dialog.current.open();
  // }, targetTime * 1000);
  //  setTimerStarted(true);// Start the timer when the start button is clicked

  // clears the timer when the stop button is clicked
  // function handleStop() {
  //   clearTimeout(timer.current);
  // }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className='challenge'>
        <h2>{title}</h2>
        {/* {timerExpired && <p>Timer Expired</p>} */}
        <p className='challenge-time'>
          {targetTime}second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"}Challenge
          </button>
        </p>
        {/* "active" if time is running or no class  if time is not running/inactive  */}
        <p className={timerIsActive ? "active" : "inactive"}>
          {timerIsActive ? "Time is running ..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
