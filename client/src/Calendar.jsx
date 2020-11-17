import React, { useState, useEffect, useRef } from 'react';
import Carousel from './Carousel.jsx';

const Calendar = (props) => {
  const checkInRef = useRef(null);
  const [placeholders, setPlaceholders] = useState({ checkIn: 'Add date', checkOut: 'Add date' });
  const [book, setBook] = useState({ start: '', end: '' });
  const [box, setBox] = useState('checkIn');

  const toggleCheckin = (event) => {
    if (book.start === '') {
      if (checkInRef.current && !checkInRef.current.contains(event.target)) {
        setPlaceholders({ checkIn: 'Add date', checkOut: placeholders.checkOut });
      } else {
        setPlaceholders({ checkIn: 'MM/DD/YYY', checkOut: placeholders.checkOut });
      }
    } else if (checkInRef.current && !checkInRef.current.contains(event.target)) {
      setPlaceholders({ checkIn: placeholders.checkIn, checkOut: 'Add date' });
    } else {
      setPlaceholders({ checkIn: placeholders.checkIn, checkOut: 'MM/DD/YYY' });
    }
  };

  const handleBook = (m, d, y, out) => {
    if (m && !out) {
      setBook({ start: `${m + 1}/${d}/${y}`, end: '' });
      props.setForm({ in: `${m + 1}/${d}/${y}`, out: 'Add date' });
      setBox('checkOut');
    } else if (out) {
      setBook({ start: book.start, end: `${m + 1}/${d}/${y}` });
      props.setForm({ in: props.form.in, out: `${m + 1}/${d}/${y}` });
      props.setReserve(!props.reserve);
    } else {
      setBook({ start: '', end: '' });
      props.setForm({ in: 'Add date', out: 'Add date' });
      setBox('checkIn');
      props.setReserve(false);
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
  });

  let checkInBox;
  let checkOutBox;
  if (box === 'checkOut') {
    checkOutBox = (
      <div style={{ border: '2px solid black', borderRadius: '8px' }} className="calCheckOut" ref={checkInRef}>
        <div>CHECK-OUT</div>
        <input type="text" className="calCheckInput" style={{ border: 'none', width: '70%' }} placeholder={placeholders.checkOut} onClick={() => toggleCheckin} value={book.end} onChange={(e) => handleChange(e, 'e')} />
      </div>
    );
    checkInBox = (
      <div className="calCheckIn" ref={checkInRef}>
        <div>CHECK-IN</div>
        <input type="text" className="calCheckInput" style={{ border: 'none', width: '70%' }} placeholder={placeholders.checkIn} onClick={() => toggleCheckin} value={book.start} onChange={(e) => handleChange(e, 's')} />
      </div>
    );
  } else {
    checkOutBox = (
      <div className="calCheckOut mask">
        <div>CHECK-OUT</div>
        <div>Add date</div>
      </div>
    );
    checkInBox = (
      <div style={{ border: '2px solid black', borderRadius: '8px' }} className="calCheckIn" ref={checkInRef}>
        <div>CHECK-IN</div>
        <input type="text" className="calCheckInput" style={{ border: 'none', width: '70%' }} placeholder={placeholders.checkIn} onClick={() => toggleCheckin} value={book.start} onChange={(e) => handleChange(e, 's')} />
      </div>
    );
  }

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
          {checkInBox}
          {checkOutBox}
        </form>
        <div className="calCarousel">
          <Carousel
            setFees={props.setFees}
            setDates={props.setDates}
            dates={props.dates}
            fees={props.fees}
            close={props.close}
            handleBook={handleBook}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
