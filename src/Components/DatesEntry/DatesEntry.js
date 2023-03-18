import { useState } from 'react';
import ObjectsDisplay from '../ObjectsDisplay/ObjectsDisplay';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

export default function DatesEntry() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [objectsReceived, setObjectsReceived] = useState();

  async function getData(startDate, endDate) {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    );
    const data = await response.json();
    // console.log('this is the data', data);
    setNumberOfElements(data.element_count);
    setObjectsReceived(data.near_earth_objects);
    // console.log('number of elements', data.element_count);
  }

  function onClick() {
    console.log('start date', startDate);
    console.log('end date', endDate);
    getData(startDate, endDate);
  }

  function maxEndDate() {
    if (startDate === '') return '';
    console.log('start date entered', startDate);
    var date = new Date(startDate);
    date.setDate(date.getDate() + 7);
    console.log('max end date', date.toISOString().split('T')[0]);
    return date.toISOString().split('T')[0];
  }

  return (
    <div>
      <label>
        Start date:
        <input
          type="date"
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
      </label>
      <label>
        End date:
        <input
          type="date"
          min={startDate}
          max={maxEndDate()}
          onChange={(event) => setEndDate(event.target.value)}
          // TODO: if endDate is less than startDate move start Date 7 days before
          // See if I can add a calendar like google flights with range
          required
        />
      </label>
      <p>
        <button onClick={onClick}>Submit</button>
      </p>
      <ObjectsDisplay
        startDate={startDate}
        endDate={endDate}
        objectsReceived={objectsReceived}
        numberOfElements={numberOfElements}
      />
    </div>
  );
}
