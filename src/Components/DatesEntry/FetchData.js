import { useState } from 'react';
import ObjectsDisplay from '../ObjectsDisplay/ObjectsDisplay';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

export default function FetchData() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [objectsReceived, setObjectsReceived] = useState();

  async function getData(startDate, endDate) {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    );
    const data = await response.json();
    console.log('this is the data', data);
    //   console.log('this is the response', response);
    //   return data;
    setNumberOfElements(data.element_count);
    setObjectsReceived(data.near_earth_objects);
    console.log('number of elements', data.element_count);
  }

  function onSubmit(startDate, endDate) {
    console.log('start date', startDate);
    console.log('end date', endDate);
    setStartDate(startDate);
    setEndDate(endDate);
    getData(startDate, endDate);
  }

  return (
    <div>
      <button onSubmit={onSubmit}>Submit</button>
    </div>
  );
}
