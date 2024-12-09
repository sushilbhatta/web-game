import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const formatedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((remainingTime / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));
  return createPortal(
    // onClose={onReset} removes the dialog by pressing ESC
    <dialog ref={dialog} className='result-modal' onClose={onReset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime}seconds.</strong>
      </p>
      <p>
        You Stopped the timer with a time of
        <strong> {formatedRemainingTime} seconds.</strong>
      </p>
      <form method='dialog' onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default ResultModal;
