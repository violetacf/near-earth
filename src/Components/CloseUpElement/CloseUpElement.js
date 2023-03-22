import './CloseUpElements.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import meteor from './../../Images/meteor.png';
import dangerousPic from './../../Images/save-me.png';
import safePic from './../../Images/safe.png';

const apiKey = process.env.REACT_APP_API_KEY;

let approachesArray = [];
let previousFive = [];
let futureFive = [];

export default function CloseUpElement() {
  const { id } = useParams();
  const [info, setInfo] = useState({
    name: '',
    url: '',
    diameterMin: 0,
    diameterMax: 0,
    dangerous: false,
    sentry: false,
    firstObvs: '',
    lastObvs: '',
  });
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
    setInfo({
      ...info,
      name: data.name,
      url: data.nasa_jpl_url,
      diameterMin: data.estimated_diameter.meters.estimated_diameter_min,
      diameterMax: data.estimated_diameter.meters.estimated_diameter_max,
      dangerous: data.is_potentially_hazardous_asteroid,
      sentry: data.is_sentry_object,
      firstObvs: data.orbital_data.first_observation_date,
      lastObvs: data.orbital_data.last_observation_date,
    });
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
              onClick={() => openInNewTab(info.url)}
            >
              Read more in the NASA website
            </button>
          </div>
          <div className="detailed-info-container">
            <div className="title-image-container">
              <h1>Object Name: {info.name}</h1>
              <img src={meteor} alt="meteor"></img>
            </div>
            <div className="dates-container">
              <div className="future-dates-container">
                We're expecting to see this object close to earth on:
                {futureFive.map((item, index) => (
                  <p key={index}>{formatDate(item)}</p>
                ))}
              </div>
              <div className="past-dates-container">
                This object's been near earth before, on:
                {previousFive.map((item, index) => (
                  <p key={index}>{formatDate(item)}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="extra-info-container">
          <p>
            Diameter between: {info.diameterMin.toFixed(2)} and{' '}
            {info.diameterMax.toFixed(2)} m.
          </p>
          <p>First time it was seen: {info.firstObvs}</p>
          <p>Last time it was seen: {info.lastObvs}</p>
          {info.dangerous ? (
            <>
              <img
                className="safe-dangerous-image"
                alt="Earth holding a save me sign"
                src={dangerousPic}
              ></img>
              <p>This element is dangerous.</p>
            </>
          ) : (
            <>
              <img
                className="safe-dangerous-image"
                alt="Earth is safe"
                src={safePic}
              ></img>
              <p>This element is safe.</p>
            </>
          )}
          {info.sentry ? (
            <>
              <p>This element is a sentry object.</p>
            </>
          ) : (
            <>
              <p>This element is not a sentry object.</p>
            </>
          )}
        </div>{' '}
      </div>
    </div>
  );
}
