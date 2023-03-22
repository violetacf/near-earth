import './GoToTop.css';
import rocket from './../../Images/rocket.png';

export default function GoToTop() {
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.getElementById('button-up').style.display = 'block';
    } else {
      document.getElementById('button-up').style.display = 'none';
    }
  }

  return (
    <a href="#top" aria-label="top of the page" name="top of the page">
      <button id="button-up" title="Go to top button">
        <img
          id="rocket"
          src={rocket}
          alt="rocket to click to go to top of page"
        ></img>
      </button>
    </a>
  );
}
