import React, { useState } from 'react';
import Calendar from './Calendar.jsx';
import Guests from './Guests.jsx';

const Form = () => {
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [displayGuests, setDisplayGuests] = useState(false);

  const toggleCalendar = () => (
    setDisplayCalendar(!displayCalendar)
  );

  const toggleGuests = () => {
    setDisplayGuests(!displayGuests);
  };

  return (
    <div>
      <div>
        <button onClick={() => toggleCalendar()} type="button">
          CHECK-IN
        </button>
        <button onClick={() => toggleCalendar()} type="button">
          CHECK-OUT
        </button>
      </div>
      <div style={{ display: displayCalendar ? 'block' : 'none' }}>
        <Calendar close={toggleCalendar} />
      </div>
      <div>
        <button onClick={() => toggleGuests()} type="button">
          GUESTS
        </button>
        <div style={{ display: displayGuests ? 'block' : 'none' }}>
          <Guests close={toggleGuests} />
        </div>
      </div>
      <div>
        <button type="button">
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default Form;
