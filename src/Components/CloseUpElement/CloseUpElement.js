import './CloseUpElements.css';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import meteor from './../../Images/meteor.png';
const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

let approachesArray = [];
let previousFive = [];
let futureFive = [];

export default function CloseUpElement() {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
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
    setName(data.name);
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

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  //   const { previousFive } = useLocation().state;
  console.log('props params', id);
  // console.log('state', previousFive);
  return (
    <div>
      <div className="close-up-container">
        <div className="buttons-container">
          <div>
            <button className="back-more">
              <Link to={'/'}>Go back to explore the Universe</Link>
            </button>
          </div>
          <div>
            <button
              className="back-more"
              role="link"
              onClick={() => openInNewTab(url)}
            >
              Read more in the NASA website
            </button>
          </div>
        </div>
        <div className="detailed-info-container">
          <div className="title-image-container">
            <h1>Object Name: {name}</h1>
            <img src={meteor} alt="meteor"></img>
          </div>
          <div className="dates-container">
            <div className="future-dates-container">
              <p>
                {' '}
                Next times this object will come close to Earth:
                {futureFive.map((item, index) => (
                  <p key={index}>{formatDate(item)}</p>
                ))}
              </p>
            </div>
            <div className="past-dates-container">
              <p>
                Previous times this object had been close to Earth:
                {previousFive.map((item, index) => (
                  <p key={index}>{formatDate(item)}</p>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
