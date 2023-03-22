import './Instructions.css';

export default function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="title-container">Is the end near?</h1>
      <p className="instructions-text-container">
        Ignore the dramatic title, <b>we already know that the end is near!!</b>
        <br />
        Please, enter two dates below, and the floating bodies around the Earth
        that were close to colliding with us between those dates will be
        displayed.
        <br />
        We hope you enjoy your stay and that you live each day like it is the
        last!
        <br />
        You will only be able to select a range of a week. If you try to select
        more than a week*, you could be the next flying object around the Earth.
      </p>
      <p className="asterisk-container">
        *There is a small bug that we are working to fix. Until then we'll
        accept it as a feature
      </p>
    </div>
  );
}
