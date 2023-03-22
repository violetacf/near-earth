import './Instructions.css';

export default function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="title-container">Is the end near?</h1>
      <p className="instructions-text-container">
        Ignore the dramatic title, <b>we already know that the end is near!!</b>
        <br />
        Please enter two dates below. We'll show you all the floating bodies
        that might be close to colliding with Earth between those dates and tell
        you whether or not you should worry.
        <br />
        We hope you enjoy your stay and that you live each day like it is the
        last!
        <br />
        You will only be able to select a range of a week. If you try to select
        more than a week*, you could be the next flying object around the Earth.
      </p>
    </div>
  );
}
