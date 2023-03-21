import { useState } from 'react';
import meteor from './../../Images/meteor.png';
import './ObjectsDisplay.css';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

let approachesArray = [];
let previousFive = [];
let futureFive = [];

export default function PreviousFuture({ id }) {
  const [url, setUrl] = useState('');

  // Get element by id by clicking picture
  async function getElementById() {
    const response = await fetch(
      `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
    );
    const data = await response.json();
    approachesArray = [];
    data.close_approach_data.forEach((element) => {
      approachesArray.push(Date.parse(element.close_approach_date));
    });
    // console.log('approaches Array', approachesArray[0]); // dates when the object has approached Earth
    setUrl(data.nasa_jpl_url);
  }

  // Find the date that matches the entered dates with the approaches dates to find previous 5 and 5 after:
  function getFutureClosestToToday(approachesArray) {
    let today = new Date();
    // console.log('today', today);
    // console.log(
    //   'approaches[i]',
    //   approachesArray.map((date) => {
    //     return date;
    //   })
    // );

    let futureIndex = approachesArray.findIndex(function (date) {
      return date > today;
    });
    console.log('index array', futureIndex);
    return futureIndex;
  }

  function getPreviousAndFuture(index) {
    if (index - 5 < 0) {
      previousFive = approachesArray.slice(0, index);
    } else {
      previousFive = approachesArray.slice(index - 5, index);
    }
    if (index + 5 > approachesArray.length) {
      futureFive = approachesArray.slice(index, approachesArray.length);
    } else {
      futureFive = approachesArray.slice(index, index + 5);
    }

    // for (let i = 0; i < approachesArray.length; i++) {
    //   if (approachesArray[i] === closestDate) {
    //     // Position in the array, to bring back the previous 5 and the next five
    //     // console.log(o);
    //     previousFive = approachesArray.slice(i - previous, i);
    //   }
    // }
    console.log('previous', previousFive, 'id', id);
    console.log('next', futureFive, 'id', id);
  }

  // This is to open new NASA tab for more info about specific object. It only works after image has been clicked:
  //   const openInNewTab = (url) => {
  //     window.open(url, '_blank', 'noreferrer');
  //   };

  // On click image:
  async function onClick() {
    await getElementById();
    let index = getFutureClosestToToday(approachesArray);
    getPreviousAndFuture(index);
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
