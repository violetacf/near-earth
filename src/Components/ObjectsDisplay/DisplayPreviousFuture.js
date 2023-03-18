import { useState } from 'react';
import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

let approachesArray = [];
let previousFive = [];
let nextFive = [];

export default function PreviousFuture({ id, startDate, endDate }) {
  const [url, setUrl] = useState('');
  async function getSingularElement() {
    const response = await fetch(
      `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
    );
    const data = await response.json();
    // console.log(
    //   'this is the data for singular element approach data',
    //   data.close_approach_data
    // );
    // console.log(
    //   'this is the data for singular element url nasa more info',
    //   data.nasa_jpl_url
    // );
    data.close_approach_data.forEach((element, index) => {
      approachesArray.push(element.close_approach_date);
      console.log('approaches Array', approachesArray); // dates when the object has approached Earth
      console.log(index); // I don't need the index, is the same as the index of the date - Index in the array of each approach - to find the index of the one that meets the dates requirement and then find 5 previous and 5 future
    });
    setUrl(data.nasa_jpl_url);
  }

  function onClick() {
    getSingularElement();
    dateRange(startDate, endDate, 1);
  }

  function dateRange(startDate, endDate, steps) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    console.log('this is the dates range', dateArray);
    // TODO: I need this array to compare the dates received for each element, to see the five previous and the five times after it went around the Earth
    return dateArray;
  }

  let enteredDatesArray = dateRange(startDate, endDate, 1);

  function getMatch(a, b) {
    var matches = [];

    for (let i = 0; i < a.length; i++) {
      for (let e = 0; e < b.length; e++) {
        if (a[i] === b[e]) matches.push(a[i]);
      }
    }
    console.log('matches', matches);
    // TODO: here make sure there is only one match, otherwise won't be accurate:
    // matches[0];
    // TODO: This is a horrible "solution"

    for (let o = 0; o < approachesArray.length; o++) {
      if (approachesArray[o] === matches[0]) {
        // Position in the array, to bring back the previous 5 and the next five
        console.log(o);
        previousFive = approachesArray.slice(o - 5, o);
        nextFive = approachesArray.slice(o + 1, o + 6);
      }
    }
    console.log('previous', previousFive);
    console.log('next', nextFive);
    return matches;
  }

  getMatch(enteredDatesArray, approachesArray);

  // This is to open new NASA tab for more info about specific object. It only works after image has been clicked:
  //   const openInNewTab = (url) => {
  //     window.open(url, '_blank', 'noreferrer');
  //   };

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
