import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

export default function PreviousFuture({ id }) {
  async function getSingularElement() {
    const response = await fetch(
      `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
    );
    const data = await response.json();
    console.log('this is the data for singular element', data);
    //   console.log('this is the response', response);
    //   return data;
    // console.log('number of elements', data.element_count);
  }
  function onClick() {
    getSingularElement();
  }
  return (
    <img
      className="meteor-image"
      alt="Meteor to click on"
      src={meteor}
      onClick={onClick}
    ></img>
  );
}
