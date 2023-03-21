// import './MyPortfolio.css';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

let approachesArray = [];
let previousFive = [];
let futureFive = [];

export default function CloseUpElement() {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const getElementById = async function () {
    const response = await fetch(
      `http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`
    );
    const data = await response.json();
    approachesArray = [];
    data.close_approach_data.forEach((element) => {
      approachesArray.push(Date.parse(element.close_approach_date));
    });
    console.log('data', data);
    // console.log('approaches Array', approachesArray[0]); // dates when the object has approached Earth
    setUrl(data.nasa_jpl_url);
  };

  const getFutureClosestToToday = function (approachesArray) {
    let today = new Date();
    let futureIndex = approachesArray.findIndex(function (date) {
      return date > today;
    });
    console.log('index array', futureIndex);
    return futureIndex;
  };

  const getPreviousAndFuture = function (index) {
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

    console.log('previous', previousFive, 'id', id);
    console.log('next', futureFive, 'id', id);
  };

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  // On click image:
  // async function onClick() {
  //   await getElementById();
  //   let index = getFutureClosestToToday(approachesArray);
  //   getPreviousAndFuture(index);
  // }
  useEffect(() => {
    async function getData() {
      await getElementById();
      let index = getFutureClosestToToday(approachesArray);
      getPreviousAndFuture(index);
    }
    getData();
    console.log('useffect', id);
  }, []);

  //   const { previousFive } = useLocation().state;
  console.log('props params', id);
  // console.log('state', previousFive);
  return (
    <div className="close-up-container">
      <div className="close-up">
        <p>{id}</p>
        <Link to={'/'}>
          <button>Go back to explore the Universe</button>
        </Link>
        <button role="link" onClick={() => openInNewTab(url)}>
          Read more about this element in the NASA website
        </button>
        {/* <button onClick={onClick()}>See more</button> */}
      </div>
    </div>
  );
}
