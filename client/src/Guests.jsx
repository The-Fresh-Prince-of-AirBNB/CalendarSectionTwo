import React from 'react';
import PropTypes from 'prop-types';

const Guests = (props) => (
  <div className="guests">
    <div className="guestsContent">
      <div>
        <div className="guestType">
          <div>Adults</div>
          <div className="guestTypeForm">
            <button className={props.guests.adults === 0 ? 'zero guestFormBut' : 'nonZero guestFormBut'} type="button" onClick={() => props.add.adults(-1)}>-</button>
            <div>{props.guests.adults}</div>
            <button className={props.max === 4 ? 'zero guestFormBut' : 'nonZero guestFormBut'} type="button" onClick={() => props.add.adults(1)}>+</button>
          </div>
        </div>
        <div className="guestType">
          <div>
            <div>Children</div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Ages 2–12</div>
          </div>
          <div className="guestTypeForm">
            <button className={props.guests.children === 0 ? 'zero guestFormBut' : 'nonZero guestFormBut'} type="button" onClick={() => props.add.chilren(-1)}>-</button>
            <div>{props.guests.children}</div>
            <button className={props.max === 4 ? 'zero guestFormBut' : 'nonZero guestFormBut'} type="button" onClick={() => props.add.chilren(1)}>+</button>
          </div>
        </div>
        <div className="guestType">
          <div>
            <div>Infants</div>
            <div style={{ fontSize: '12px', marginTop: '5px' }}>Under 2</div>
          </div>
          <div className="guestTypeForm">
            <button className={props.guests.infants === 0 ? 'zero guestFormBut' : 'nonZero guestFormBut'} type="button" onClick={() => props.add.infants(-1)}>-</button>
            <div>{props.guests.infants}</div>
            <button className="nonZero guestFormBut" type="button" onClick={() => props.add.infants(1)}>+</button>
          </div>
        </div>
        <div style={{ fontSize: '13px', lineHeight: '20px' }}>
          4 guests maximum. Infants don’t count toward the number of guests.
        </div>
      </div>
      <button className="clearCalendar closeGuests" type="button" onClick={() => props.toggleGuests()}>Close</button>
    </div>
  </div>
);

Guests.defaultProps = {
  guests: { adults: 2, children: 0, infants: 0 },
  max: 2,
  add: {},
  toggleGuests: () => null,
};

Guests.propTypes = {
  guests: PropTypes.shape({ adults: 2, children: 0, infants: 0 }),
  max: PropTypes.number,
  add: PropTypes.shape({}),
  toggleGuests: PropTypes.func,
};

export default Guests;
