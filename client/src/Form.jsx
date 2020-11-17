import React, { useState, useEffect } from 'react';
import Calendar from './Calendar.jsx';
import Guests from './Guests.jsx';
import Summary from './Summary.jsx';

const Form = (props) => {
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [displayGuests, setDisplayGuests] = useState(false);
  const [form, setForm] = useState({ in: 'Add date', out: 'Add date', days: 0 });
  const [guestBorder, setGuestBorder] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [reserve, setReserve] = useState(false);
  const [guests, setGuest] = useState({ adults: 2, children: 0, infants: 0 });
  const max = guests.adults + guests.children;

  const add = {
    adults: (q) => {
      if ((q === -1 && guests.adults > 0) || (q === 1 && max < 4)) {
        setGuest({ adults: guests.adults + q, children: guests.children, infants: guests.infants });
      }
    },
    chilren: (q) => {
      if ((q === -1 && guests.children > 0) || (q === 1 && max < 4)) {
        setGuest({ adults: guests.adults, children: guests.children + q, infants: guests.infants });
      }
    },
    infants: (q) => {
      if ((q === -1 && guests.infants > 0) || q === 1) {
        setGuest({ adults: guests.adults, children: guests.children, infants: guests.infants + q });
      }
    },
  };

  const toggleCalendar = () => (
    setDisplayCalendar(!displayCalendar)
  );

  const toggleGuests = (guests) => {
    setGuestBorder(!guestBorder);
    setDisplayGuests(!displayGuests);
    console.log(guests);
  };

  const mousePosition = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  return (
    <div>
      <div className="form">
        <div>
          <button className="check" style={{ borderBottom: guestBorder ? 'none' : '1px solid rgb(179, 179, 179)' }} onClick={() => toggleCalendar()} type="button">
            <div className="checkIn">
              <div style={{ fontSize: '10px', marginBottom: '5px' }}>CHECK-IN</div>
              <div style={{ color: 'rgb(125, 125, 125)', fontFamily: 'Montserrat, sans-serif' }}>{form.in}</div>
            </div>
            <div className="checkOut">
              <div style={{ fontSize: '10px', marginBottom: '5px' }}>CHECKOUT</div>
              <div style={{ color: 'rgb(125, 125, 125)', fontFamily: 'Montserrat, sans-serif' }}>{form.out}</div>
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
            setForm={setForm}
            form={form}
            setReserve={setReserve}
            reserve={reserve}
          />
        </div>
        <div>
          <button
            className="guestBut"
            onClick={() => {
              toggleGuests();
              setGuestBorder(!guestBorder);
            }}
            type="button"
            style={{ border: guestBorder ? '2px solid black' : 'none',  borderRadius: '8px' }}
          >
            <div style={{ fontSize: '10px', marginBottom: '5px' }}>GUESTS</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {max}
              {' '}
              guests
            </div>
          </button>
          <div style={{ display: displayGuests ? 'block' : 'none' }}>
            <Guests
              close={toggleGuests}
              guests={guests}
              max={max}
              add={add}
            />
          </div>
        </div>
      </div>
      {reserve
        ? (
          <Summary
            fees={props.fees}
            x={x}
            y={y}
            setX={setX}
            setY={setY}
            mousePosition={mousePosition}
            form={form}
          />
        )
        : (
          <div>
            <button
              className="checkAvailabilityAndReserve"
              type="button"
              style={{ backgroundPosition: `${x - 80}px ${y}px`, backgroundImage: 'linear-gradient(to right, #d43974, #d43939, #d43974)' }}
              onMouseMove={(event) => mousePosition(event)}
              onMouseLeave={() => {
                setX(0);
                setY(0);
              }}
              onClick={() => toggleCalendar()}
            >
              Check Availability
            </button>
          </div>
        )}
    </div>
  );
};

export default Form;
