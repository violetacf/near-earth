import { useState } from 'react';
import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

export default function PreviousFuture({ id }) {
  const [url, setUrl] = useState('');
  async function getSingularElement() {
    const response = await fetch(
      `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
    );
    const data = await response.json();
    console.log(
      'this is the data for singular element approach data',
      data.close_approach_data
    );
    console.log(
      'this is the data for singular element url nasa more info',
      data.nasa_jpl_url
    );
    data.close_approach_data.forEach((element, index) => {
      console.log(element.close_approach_date); // dates when the object has approached Earth
      console.log(index); // Index in the array of each approach - to find the index of the one that meets the dates requirement and then find 5 previous and 5 future
    });
    setUrl(data.nasa_jpl_url);
  }
  function onClick() {
    getSingularElement();
  }
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  return (
    <div>
      <img
        className="meteor-image"
        alt="Meteor to click on"
        src={meteor}
        onClick={onClick}
      ></img>
      <button role="link" onClick={() => openInNewTab(url)}>
        Read more about this element in the NASA website
      </button>
      {/* This button has to be displayed after user clicks on image (for fetch req) */}
    </div>
  );
}
