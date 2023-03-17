import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

export default function PreviousFuture({ id }) {
  async function getSingularElement() {
    const response = await fetch(
      `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
    );
    const data = await response.json();
    console.log(
      'this is the data for singular element',
      data.close_approach_data
    );
    data.close_approach_data.forEach((element, index) => {
      console.log(element.close_approach_date); // dates when the object has been approching Earth
      console.log(index); // Index in the array of each approach - to find the index of the one that meets the dates requirement and then find 5 previous and 5 future
    });
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
