import { useState } from 'react';

const apiKey = 'caRwB9KLY9MaGfOSR7VW7Cs3iH66rpq1bFqvXioX';

export default function DatesEntry() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  async function getData(startDate, endDate) {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`
    );
    const data = await response.json();
    console.log('this is the data', data);
    //   console.log('this is the response', response);
    //   return data;
  }

  function onClick() {
    console.log('start date', startDate);
    console.log('end date', endDate);
    
    getData(startDate, endDate);
  }
  return (
    <div>
      <label>
        Start date:
        <input
          type="date"
          name="party"
          min="2017-04-01"
          max="2023-02-23"
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
      </label>
      <label>
        End date:
        <input
          type="date"
          name="party"
          min={startDate}
          max="2023-02-23"
          onChange={(event) => setEndDate(event.target.value)}
          required
        />
      </label>
      <p>
        <button onClick={onClick}>Submit</button>
      </p>
    </div>
  );
}
