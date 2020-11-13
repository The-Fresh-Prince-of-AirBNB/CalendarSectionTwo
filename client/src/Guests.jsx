import React from 'react';

const Guests = (props) => {
  const fuc = () => (
    1 + 1
  );

  return (
    <div className="guests">
      <div className="guestsContent">
        <p>Guests</p>
        <button className="closeGuests" type="button" onClick={props.close}>Close</button>
      </div>
    </div>
  );
};

export default Guests;
