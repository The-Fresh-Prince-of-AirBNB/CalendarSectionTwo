/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel.jsx';
import styles from '../../styles.css';

const Calendar = (props) => {
  const {
    setForm,
    setReserve,
    reserve,
    form,
    fees,
    setFees,
    setDates,
    dates,
    close,
  } = props;
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

  const countDays = (date1, date2) => {
    const date1Arr = date1.split('/');
    const date2Arr = date2.split('/');
    const newDate1 = new Date(date1Arr[2], date1Arr[0] - 1, date1Arr[1]);
    const newDate2 = new Date(date2Arr[2], date2Arr[0] - 1, date2Arr[1]);
    return ((newDate2 - newDate1) / (1000 * 3600 * 24));
  };

  const handleBook = (m, d, y, out) => {
    const stringDate = `${m + 1}/${d}/${y}`;
    if ((m && !out) || (m === 0 && !out)) {
      setBook({ start: stringDate, end: '' });
      setForm({ in: stringDate, out: 'Add date', days: 0 });
      setBox('checkOut');
    } else if (out) {
      const totDays = countDays(book.start, stringDate);
      setBook({ start: book.start, end: stringDate });
      setForm({ in: form.in, out: stringDate, days: totDays });
      setReserve(!reserve);
    } else {
      setBook({ start: '', end: '' });
      setForm({ in: 'Add date', out: 'Add date' });
      setBox('checkIn');
      setReserve(false);
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

  const handleSumbit = (e) => {
    e.preventDefault();
    if (book.start.length > 0) {
      console.log(book.start);
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
        className={styles.calCheckOut}
        ref={checkInRef}
      >
        <div>
          <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECKOUT</div>
          <input type="text" className={styles.calCheckInput} style={{ border: 'none', width: '70%', fontFamily: 'Montserrat, sans-serif' }} placeholder={placeholders.checkOut} onClick={() => toggleCheckin} value={book.end} onChange={(e) => handleChange(e, 'e')} />
        </div>
      </div>
    );
    checkInBox = (
      <div className={styles.calCheckIn} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0px 10px 22px' }} ref={checkInRef}>
        <div>
          <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECK-IN</div>
          <input
            type="text"
            className={styles.calCheckInput}
            style={{
              border: 'none', width: '70%', marginLeft: '-2px', fontFamily: 'Montserrat, sans-serif',
            }}
            placeholder={placeholders.checkIn}
            onClick={() => toggleCheckin}
            value={book.start}
            onChange={(e) => handleChange(e, 's')}
          />
        </div>
      </div>
    );
  } else {
    checkOutBox = (
      <div className={`${styles.calCheckOut} ${styles.mask}`}>
        <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECKOUT</div>
        <div style={{ lineHeight: '14px', fontSize: '13px' }}>Add date</div>
      </div>
    );
    checkInBox = (
      <div
        style={
          {
            display: 'flex', justifyContent: 'space-between', border: '2px solid black', borderRadius: '8px',
          }
        }
        className={styles.calCheckIn}
        ref={checkInRef}
      >
        <div style={{ paddingLeft: '4px' }}>
          <div style={{ fontSize: '10px', marginBottom: '3px' }}>CHECK-IN</div>
          <input
            type="text"
            className={styles.calCheckInput}
            style={
            {
              border: 'none', width: '70%', marginLeft: '-2px', fontFamily: 'Montserrat, sans-serif',
            }
          }
            placeholder={placeholders.checkIn}
            onClick={() => toggleCheckin}
            value={book.start}
            onChange={(e) => handleChange(e, 's')}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSumbit(e);
              }
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarContent}>
        <div>
          <div style={{ fontSize: '22px' }}>Select Dates</div>
          <div style={{ color: 'rgb(160, 160, 160)', marginTop: '8px' }}>
            Minimum stay:
            {' '}
            {fees.minNights}
            {' '}
            nights
          </div>
        </div>
        <form className={styles.calForm}>
          {checkInBox}
          {checkOutBox}
        </form>
        <div className={styles.calCarousel}>
          <Carousel
            setFees={setFees}
            setDates={setDates}
            dates={dates}
            fees={fees}
            close={close}
            handleBook={handleBook}
          />
        </div>
      </div>
    </div>
  );
};

Calendar.defaultProps = {
  form: { in: 'Add date', out: 'Add date', days: 0 },
  dates: { reservations: {} },
  fees: {
    nightlyFee: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    minNights: 0,
  },
  reserve: false,
  setForm: () => null,
  setReserve: () => null,
  setFees: () => null,
  setDates: () => null,
  close: () => null,
};

Calendar.propTypes = {
  form: PropTypes.shape({ in: 'Add date', out: 'Add date', days: 0 }),
  dates: PropTypes.shape({ reservations: {} }),
  fees: PropTypes.shape(
    {
      nightlyFee: 0,
      cleaningFee: 0,
      serviceFee: 0,
      taxes: 0,
      minNights: 0,
    },
  ),
  reserve: PropTypes.bool,
  setForm: PropTypes.func,
  setReserve: PropTypes.func,
  setFees: PropTypes.func,
  setDates: PropTypes.func,
  close: PropTypes.func,
};

export default Calendar;
