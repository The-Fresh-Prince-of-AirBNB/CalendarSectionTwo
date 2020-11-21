import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles.css';

const Guests = (props) => {
  const {
    guests,
    setGuest,
    toggleGuests,
  } = props;

  const [guestList, setGuestList] = useState({ a: 2, c: 0, i: 0 });
  const max = guestList.a + guestList.c;

  const add = {
    adults: (q) => {
      if ((q === -1 && guestList.a > 0) || (q === 1 && max < 4)) {
        setGuestList({ a: guestList.a + q, c: guestList.c, i: guestList.i });
        setGuest({ adults: guests.adults + q, children: guests.children, infants: guests.infants });
      }
    },
    children: (q) => {
      if ((q === -1 && guestList.c > 0) || (q === 1 && max < 4)) {
        setGuestList({ a: guestList.a, c: guestList.c + q, i: guestList.i });
        setGuest({ adults: guests.adults, children: guests.children + q, infants: guests.infants });
      }
    },
    infants: (q) => {
      if ((q === -1 && guestList.i > 0) || q === 1) {
        setGuestList({ a: guestList.a, c: guestList.c, i: guestList.i + q });
        setGuest({ adults: guests.adults, children: guests.children, infants: guests.infants + q });
      }
    },
  };

  return (
    <div className={styles.guests}>
      <div className={styles.guestsContent}>
        <div>
          <div className={styles.guestType}>
            <div>Adults</div>
            <div className={styles.guestTypeForm}>
              <button className={guests.adults === 0 ? `${styles.zero} ${styles.guestFormBut}` : `${styles.nonZero} ${styles.guestFormBut}`} type="button" onClick={() => add.adults(-1)}>-</button>
              <div data-testid="totAdults">{guestList.a}</div>
              <button data-testid="addAdults" className={max === 4 ? `${styles.zero} ${styles.guestFormBut}` : `${styles.nonZero} ${styles.guestFormBut}`} type="button" onClick={() => add.adults(1)}>+</button>
            </div>
          </div>
          <div className={styles.guestType}>
            <div>
              <div>Children</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Ages 2–12</div>
            </div>
            <div className={styles.guestTypeForm}>
              <button className={guests.children === 0 ? `${styles.zero} ${styles.guestFormBut}` : `${styles.nonZero} ${styles.guestFormBut}`} type="button" onClick={() => add.children(-1)}>-</button>
              <div>{guestList.c}</div>
              <button data-testid="addChildren" className={max === 4 ? `${styles.zero} ${styles.guestFormBut}` : `${styles.nonZero} ${styles.guestFormBut}`} type="button" onClick={() => add.children(1)}>+</button>
            </div>
          </div>
          <div className={styles.guestType}>
            <div>
              <div>Infants</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Under 2</div>
            </div>
            <div className={styles.guestTypeForm}>
              <button className={guests.infants === 0 ? `${styles.zero} ${styles.guestFormBut}` : `${styles.nonZero} ${styles.guestFormBut}`} type="button" onClick={() => add.infants(-1)}>-</button>
              <div>{guestList.i}</div>
              <button className={`${styles.nonZero} ${styles.guestFormBut}`} type="button" onClick={() => add.infants(1)}>+</button>
            </div>
          </div>
          <div style={{ fontSize: '13px', lineHeight: '20px' }}>
            4 guests maximum. Infants don’t count toward the number of guests.
          </div>
        </div>
        <button className={`${styles.clearCalendar} ${styles.closeGuests}`} type="button" onClick={() => toggleGuests()}>Close</button>
      </div>
    </div>
  );
};

Guests.defaultProps = {
  guests: { adults: 2, children: 0, infants: 0 },
  setGuest: () => null,
  toggleGuests: () => null,
};

Guests.propTypes = {
  guests: PropTypes.shape({ adults: 2, children: 0, infants: 0 }),
  setGuest: PropTypes.func,
  toggleGuests: PropTypes.func,
};

export default Guests;
