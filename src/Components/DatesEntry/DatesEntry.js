import './DatesEntry.css';
import { useState } from 'react';
import ObjectsDisplay from '../ObjectsDisplay/ObjectsDisplay';
import telescope from './../../Images/telescope.png';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

export default function DatesEntry() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(maxEndDate());
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [objectsReceived, setObjectsReceived] = useState();

  async function getData(startDate, endDate) {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    );
    const data = await response.json();
    setNumberOfElements(data.element_count);
    setObjectsReceived(data.near_earth_objects);
  }

  function onClick() {
    // console.log('start date', startDate);
    // console.log('end date', endDate);
    if (startDate !== '' && endDate !== '') {
      getData(startDate, endDate);
    }
  }

  function maxEndDate() {
    if (startDate === '') return '';
    var date = new Date(startDate);
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  }

  return (
    <div className="dates-submit-container">
      <div className="dates-entry-container">
        <div>
          <label className="date-label">
            Enter start date:
            <input
              value={startDate}
              className="date-input"
              type="date"
              onChange={(event) => setStartDate(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="date-label">
            and end date:
            <input
              value={endDate}
              className="date-input"
              type="date"
              min={startDate}
              max={maxEndDate()}
              onChange={(event) => setEndDate(event.target.value)}
              // TODO: if endDate is less than startDate move start Date 7 days before
              // See if I can add a calendar like google flights with range
              required
            />
          </label>
        </div>
      </div>
      <button id="submit-dates-button" onClick={onClick}>
        <img id="telescope" src={telescope} alt="magnifying glass"></img>
        Find flying objects
      </button>
      <ObjectsDisplay
        startDate={startDate}
        endDate={endDate}
        objectsReceived={objectsReceived}
        numberOfElements={numberOfElements}
      />
    </div>
  );
}
