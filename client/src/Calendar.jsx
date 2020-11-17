import React, { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel.jsx';

const Calendar = (props) => {
  const checkInRef = useRef(null);
  const [placeholders, setPlaceholders] = useState({ checkIn: 'Add date', checkOut: 'Add date' });
  const [book, setBook] = useState({ start: null, end: null });

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

  const handleChange = (e, type) => {
    e.preventDefault();
    if (type === 's') {
      setBook({ start: e.target.value, end: book.end });
    } else {
      setBook({ start: book.start, end: e.target.value });
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
          <div>
            Minimum stay:
            {' '}
            {props.fees.minNights}
          </div>
        </div>
        <form className="calForm">
          <div className="calCheckIn" ref={checkInRef}>
            <div>CHECK-IN</div>
            <input type="text" className="calCheckInput" style={{ border: 'none', width: '70%' }} placeholder={placeholders.checkIn} onClick={() => toggleCheckin} value={book.start} onChange={(e) => handleChange(e, 's')} />
          </div>
          <div className="calCheckOut">
            <div>CHECK-OUT</div>
            <input type="text" className="calCheckInput" style={{ border: 'none', width: '70%' }} placeholder={placeholders.checkOut} onClick={() => toggleCheckout} value={book.end} onChange={(e) => handleChange(e, 'e')} />
          </div>
        </form>
        <div className="calCarousel">
          <Carousel
            setFees={props.setFees}
            setDates={props.setDates}
            dates={props.dates}
            fees={props.fees}
            close={props.close}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
