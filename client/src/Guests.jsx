import React from 'react';

const Guests = (props) => {
  const fuc = () => (
    1 + 1
  );

  return (
    <div className="guests">
      <div className="guestsContent">
        <div>
          <div>Adults</div>
          <div>Children</div>
          <div>Infants</div>
        </div>
        <button className="closeGuests" type="button" onClick={props.close}>Close</button>
      </div>
    </div>
  );
};

export default Guests;
