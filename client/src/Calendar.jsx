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
    const stringDate = `${m + 1}/${d}/${y}`;
    if (m && !out) {
      setBook({ start: stringDate, end: '' });
      props.setForm({ in: stringDate, out: 'Add date', days: 0 });
      setBox('checkOut');
    } else if (out) {
      const totDays = countDays(book.start, stringDate);
      setBook({ start: book.start, end: stringDate });
      props.setForm({ in: props.form.in, out: stringDate, days: totDays });
      props.setReserve(!props.reserve);
    } else {
      setBook({ start: '', end: '' });
      props.setForm({ in: 'Add date', out: 'Add date' });
      setBox('checkIn');
      props.setReserve(false);
    }
  };

  const countDays = (date1, date2) => {
    const date1Arr = date1.split('/');
    const date2Arr = date2.split('/');
    const newDate1 = new Date(date1Arr[2], date1Arr[0] - 1, date1Arr[1]);
    const newDate2 = new Date(date2Arr[2], date2Arr[0] - 1, date2Arr[1]);
    return ((newDate2 - newDate1) / (1000 * 3600 * 24));
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
      <div
        style={
        {
          display: 'flex', justifyContent: 'space-between', border: '2px solid black', borderRadius: '8px', padding: '10px 0px 10px 6px',
        }
      }
        className="calCheckOut"
        ref={checkInRef}
      >
        <div>
          <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECKOUT</div>
          <input type="text" className="calCheckInput" style={{ border: 'none', width: '70%', fontFamily: 'Montserrat, sans-serif' }} placeholder={placeholders.checkOut} onClick={() => toggleCheckin} value={book.end} onChange={(e) => handleChange(e, 'e')} />
        </div>
        <button type="button" className="xButton">{book.end === '' ? ' ' : 'x'}</button>
      </div>
    );
    checkInBox = (
      <div className="calCheckIn" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0px 10px 22px' }} ref={checkInRef}>
        <div>
          <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECK-IN</div>
          <input
            type="text"
            className="calCheckInput"
            style={{
              border: 'none', width: '70%', marginLeft: '-2px', fontFamily: 'Montserrat, sans-serif',
            }}
            placeholder={placeholders.checkIn}
            onClick={() => toggleCheckin}
            value={book.start}
            onChange={(e) => handleChange(e, 's')}
          />
        </div>
        <button type="button" className="xButton">x</button>
      </div>
    );
  } else {
    checkOutBox = (
      <div className="calCheckOut mask">
        <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECKOUT</div>
        <div style={{ lineHeight: '14px', fontSize: '13px' }}>Add date</div>
      </div>
    );
    checkInBox = (
      <div
        style={
          {
            display: 'flex', justifyContent: 'space-between', border: '2px solid black', borderRadius: '8px'
          }
        }
        className="calCheckIn"
        ref={checkInRef}
      >
        <div style={{ paddingLeft: '4px' }}>
          <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECK-IN</div>
          <input
            type="text"
            className="calCheckInput"
            style={
            {
              border: 'none', width: '70%', marginLeft: '-2px', fontFamily: 'Montserrat, sans-serif',
            }
          }
            placeholder={placeholders.checkIn}
            onClick={() => toggleCheckin}
            value={book.start}
            onChange={(e) => handleChange(e, 's')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendarContent">
        <div>
          <div style={{ fontSize: '22px' }}>Select Dates</div>
          <div style={{ color: 'rgb(114, 114, 114)', marginTop: '8px' }}>
            Minimum stay:
            {' '}
            {props.fees.minNights}
            {' '}
            nights
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
