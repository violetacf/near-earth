import './DatesEntry.css';
import { useState } from 'react';
import ObjectsDisplay from '../ObjectsDisplay/ObjectsDisplay';
import telescope from './../../Images/telescope.png';

const apiKey = process.env.REACT_APP_API_KEY;

export default function DatesEntry() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(maxEndDate(startDate));
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [objectsReceived, setObjectsReceived] = useState();
  const [loading, setLoading] = useState(false);

  async function getData(startDate, endDate) {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    );
    const data = await response.json();
    // console.log('data', data);
    setNumberOfElements(data.element_count);
    setObjectsReceived(data.near_earth_objects);
    setLoading(false);
  }

  function performSearch() {
    if (startDate !== '' && endDate !== '') {
      setLoading(true);
      getData(startDate, endDate);
    } else {
      alert('Dates are invalid');
    }
  }

  function maxEndDate(startDate) {
    if (startDate === '') return '';
    var date = new Date(startDate);
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  }

  function isWithinRange(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <div className="dates-submit-container">
      <div className="dates-entry-container">
        <div>
          <label className="date-label">
            Enter start date:
            <div className="input-box">
              <input
                value={startDate}
                className="date-input"
                type="date"
                onChange={(event) => {
                  let newStartDate = event.target.value;
                  setStartDate(newStartDate);
                  if (!isWithinRange(newStartDate, endDate)) {
                    let newEndDate = maxEndDate(newStartDate);
                    setEndDate(newEndDate);
                  }
                }}
                required
              />
            </div>
          </label>
        </div>
        <div>
          <label className="date-label">
            and end date:
            <div className="input-box">
              <input
                value={endDate}
                className="date-input"
                type="date"
                min={startDate}
                max={maxEndDate(startDate)}
                onChange={(event) => setEndDate(event.target.value)}
                // TODO: if endDate is less than startDate move start Date 7 days before
                // See if I can add a calendar like google flights with range
                required
              />
            </div>
          </label>
        </div>
      </div>
      <button id="submit-dates-button" onClick={performSearch}>
        <img id="telescope" src={telescope} alt="magnifying glass"></img>
        Find flying objects
      </button>
      <ObjectsDisplay
        loading={loading}
        objectsReceived={objectsReceived}
        numberOfElements={numberOfElements}
      />
    </div>
  );
}
