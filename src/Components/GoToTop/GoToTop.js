import './GoToTop.css';

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
    <a href="#top" name="targetDiv">
      <button id="button-up" title="Go to top button">
        Top
      </button>
    </a>
  );
}
