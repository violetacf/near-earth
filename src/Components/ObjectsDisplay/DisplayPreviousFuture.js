import { useState } from 'react';
import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

let approachesArray = [];
let previousFive = [];
let nextFive = [];

export default function PreviousFuture({ id, startDate, endDate }) {
  const [url, setUrl] = useState('');
  //   const [match, setMatch] = useState('');
  let match = '';

  // Get element by id by clicking picture
  async function getElementById() {
    const response = await fetch(
      `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
    );
    const data = await response.json();
    data.close_approach_data.forEach((element) => {
      approachesArray.push(element.close_approach_date);
    });
    // console.log('approaches Array', approachesArray); // dates when the object has approached Earth

    setUrl(data.nasa_jpl_url);
  }

  // Dates entered range:
  function dateRange(startDate, endDate, steps) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    console.log('this is the dates range', dateArray);
    return dateArray;
  }

  let enteredDatesArray = dateRange(startDate, endDate, 1);

  // Find the date that matches the entered dates with the approaches dates to find previous 5 and 5 after:
  function getMatch(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      for (let e = 0; e < array2.length; e++) {
        if (array1[i] === array2[e]) match = array1[i];
        //   setMatch(array1[i]);
      }
    }
    console.log('match', match, 'id', id);
    return match;
  }

  function getPreviousAndAfter(previous, after) {
    for (let o = 0; o < approachesArray.length; o++) {
      if (approachesArray[o] === match) {
        // Position in the array, to bring back the previous 5 and the next five
        // console.log(o);
        previousFive = approachesArray.slice(o - previous, o);
        nextFive = approachesArray.slice(o + 1, o + after + 1);
      }
    }
    console.log('previous', previousFive, 'id', id);
    console.log('next', nextFive, 'id', id);
  }

  getMatch(enteredDatesArray, approachesArray);

  // This is to open new NASA tab for more info about specific object. It only works after image has been clicked:
  //   const openInNewTab = (url) => {
  //     window.open(url, '_blank', 'noreferrer');
  //   };

  // On click image:
  function onClick() {
    getElementById();
    dateRange(startDate, endDate, 1);
    getPreviousAndAfter(5, 5);
  }

  return (
    <div>
      <img
        className="meteor-image"
        alt="Meteor to click on"
        src={meteor}
        onClick={onClick}
      ></img>
      {/* <button role="link" onClick={() => openInNewTab(url)}>
        Read more about this element in the NASA website
      </button> */}
      {/* TODO: This button has to be displayed after user clicks on image (for fetch req) Button only works after the image has been clicked and the fetch req with id has been made*/}
    </div>
  );
}
