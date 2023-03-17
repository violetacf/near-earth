import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';

import format from 'date-fns/format';
import { addDays } from 'date-fns';

import FetchData from './FetchData';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangeComp = ({ onSubmit }) => {
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  //   function handleChange(startDate, endDate) {
  //     console.log('start from displayed calendar', startDate);
  //     console.log('end from displayed calendar', endDate);
  //     // handleClick(startDate, endDate);
  //   }

  function handleClick(startDate, endDate) {
    // console.log('start date', startDate);
    // console.log('end date', endDate);
    // setSelectedStartDate(startDate);
    // setSelectedEndDate(endDate);
    console.log('is this the start date?', startDate);
    console.log('is this the end date?', endDate);
  }

  return (
    <div className="calendarWrap">
      <input
        value={`${format(range[0].startDate, 'dd/MM/yyyy')} to ${format(
          range[0].endDate,
          'dd/MM/yyyy'
        )}`}
        //   onChange={handleChange()}
        // readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="vertical"
            className="calendarElement"
          />
        )}
      </div>
      <FetchData onSubmit={handleClick(range[0].startDate, range[0].endDate)} />
    </div>
  );
};

export default DateRangeComp;
