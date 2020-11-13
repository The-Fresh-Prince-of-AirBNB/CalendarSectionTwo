import React from 'react';

const Calendar = (props) => {
  const fuc = () => (
    1 + 1
  );

  return (
    <div className="calendar">
      <div className="calendarContent">
        <p>Calendar</p>
        <button className="closeCalendar" type="button" onClick={props.close}>Close</button>
      </div>
    </div>
  );
};

export default Calendar;
