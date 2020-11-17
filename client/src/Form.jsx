import React, { useState, useEffect } from 'react';
import Calendar from './Calendar.jsx';
import Guests from './Guests.jsx';

const Form = (props) => {
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [displayGuests, setDisplayGuests] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const toggleCalendar = () => (
    setDisplayCalendar(!displayCalendar)
  );

  const toggleGuests = () => {
    setDisplayGuests(!displayGuests);
  };

  const mousePosition = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  return (
    <div>
      <div className="form">
        <div>
          <button className="check" onClick={() => toggleCalendar()} type="button">
            <div className="checkIn">
              <div style={{ fontSize: '12px' }}>CHECK-IN</div>
              <div style={{ color: 'rgb(125, 125, 125)' }}>Add date</div>
            </div>
            <div className="checkOut">
              <div style={{ fontSize: '12px' }}>CHECKOUT</div>
              <div style={{ color: 'rgb(125, 125, 125)' }}>Add date</div>
            </div>
          </button>
        </div>
        <div style={{ display: displayCalendar ? 'block' : 'none' }}>
          <Calendar
            close={toggleCalendar}
            setFees={props.setFees}
            setDates={props.setDates}
            dates={props.dates}
            fees={props.fees}
          />
        </div>
        <div>
          <button className="guestBut" onClick={() => toggleGuests()} type="button">
            <div style={{ fontSize: '12px' }}>GUESTS</div>
            <div>1 guest</div>
          </button>
          <div style={{ display: displayGuests ? 'block' : 'none' }}>
            <Guests close={toggleGuests} />
          </div>
        </div>
      </div>
      <div>
        <button
          className="checkAvailability"
          type="button"
          style={{ backgroundPosition: `${x}px ${y}px`, backgroundImage: `linear-gradient(to right, #d43939, #d43974)` }}
          onMouseMove={(event) => mousePosition(event)}
          onMouseLeave={() => {
            setX(0);
            setY(0);
          }}
        >
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default Form;
