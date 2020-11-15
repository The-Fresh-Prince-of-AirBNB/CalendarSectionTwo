import React, { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel.jsx';

const Calendar = (props) => {
  const checkInRef = useRef(null);
  const [placeholders, setPlaceholders] = useState({ checkIn: 'Add date', checkOut: 'Add date' });

  const toggleCheckin = (event) => {
    if (checkInRef.current && !checkInRef.current.contains(event.target)) {
      setPlaceholders({ checkIn: 'Add date', checkOut: placeholders.checkOut });
    } else {
      setPlaceholders({ checkIn: 'MM/DD/YYY', checkOut: placeholders.checkOut });
    }
  };

  const toggleCheckout = (event) => {
    if (checkInRef.current && !checkInRef.current.contains(event.target)) {
      setPlaceholders({ checkIn: placeholders.checkIn, checkOut: 'Add date' });
    } else {
      setPlaceholders({ checkIn: placeholders.checkIn, checkOut: 'MM/DD/YYYY' });
    }
  };

  useEffect(() => {
    document.addEventListener('click', toggleCheckin, false);
    return () => {
      document.removeEventListener('click', toggleCheckin, false);
    };
  }, []);

  return (
    <div className="calendar">
      <div className="calendarContent">
        <div>
          <div style={{ fontSize: '22px' }}>Select Dates</div>
          <div>Minimum stay: </div>
        </div>
        <form className="calForm">
          <div className="calCheckIn" ref={checkInRef}>
            <div>CHECK-IN</div>
            <input type="text" style={{ border: 'none', width: '70%' }} placeholder={placeholders.checkIn} onClick={() => toggleCheckin} />
          </div>
          <div className="calCheckOut">
            <div>CHECK-OUT</div>
            <input type="text" style={{ border: 'none', width: '70%' }} placeholder={placeholders.checkOut} onClick={() => toggleCheckout} />
          </div>
        </form>
        <div className="calCarousel">
          <Carousel />
        </div>
      </div>
      <button className="closeCalendar" type="button" onClick={props.close}>Close</button>
    </div>
  );
};

export default Calendar;
