import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../../styles.css';

// eslint-disable-next-line arrow-body-style
const Summary = (props) => {
  const {
    fees,
    hovering,
    form,
    totalGuests,
    styling,
    mousePosition,
    setHover,
    setX,
    setY,
  } = props;

  const lineStyle = { textDecoration: 'underline' };
  const tots = {
    nightly: Number.parseInt(fees.nightlyFee, 10) * Number.parseInt(form.days, 10),
    service:
      Number.parseInt(fees.serviceFee, 10)
      * Number.parseInt(form.days, 10)
      + Number.parseInt(totalGuests, 10) * 15,
    taxes:
      Number.parseInt(fees.taxes, 10)
      * Number.parseInt(form.days, 10)
      + Number.parseInt(totalGuests, 10) * 10,
  };
  const total = tots.nightly + Number.parseInt(fees.cleaningFee, 10) + tots.service + tots.taxes;

  const bookReservation = () => {
    axios.post(`${window.location.pathname}reservations`, {
      in: form.in,
      out: form.out,
    });
  };

  return (
    <div>
      <button
        className={styles.checkAvailabilityAndReserve}
        type="button"
        style={hovering ? styling.hover : styling.static}
        onMouseMove={(event) => {
          mousePosition(event);
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
          setX(0);
          setY(0);
        }}
        onClick={() => {
          bookReservation();
        }}
      >
        Reserve
      </button>
      <div style={{ fontSize: '13px', textAlign: 'center', margin: '20px 0px' }}>You won&apos;t be charged yet</div>
      <div className={styles.summaryItems}>
        <div className={styles.summaryItem}>
          <div style={lineStyle}>
            $
            {fees.nightlyFee}
            {' '}
            x
            {' '}
            {form.days}
            {' '}
            nights
          </div>
          <div>
            $
            {tots.nightly}
          </div>
        </div>
        <div className={styles.summaryItem}>
          <div style={lineStyle}>Cleaning fee</div>
          <div>
            $
            {fees.cleaningFee}
          </div>
        </div>
        <div className={styles.summaryItem}>
          <div style={lineStyle}>Service fee</div>
          <div>
            $
            {tots.service}
          </div>
        </div>
        <div className={styles.summaryItem}>
          <div style={lineStyle}>Occupancy taxes and fees</div>
          <div>
            $
            {tots.taxes}
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <div>Total</div>
        <div>
          $
          {total}
        </div>
      </div>
    </div>
  );
};

Summary.defaultProps = {
  form: { in: 'Add date', out: 'Add date', days: 0 },
  fees: {
    nightlyFee: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    minNights: 0,
  },
  styling: {
    hover: {},
    static: {},
  },
  hovering: false,
  totalGuests: 2,
  mousePosition: () => null,
  setHover: () => null,
  setX: () => null,
  setY: () => null,
};

Summary.propTypes = {
  form: PropTypes.shape({ in: 'Add date', out: 'Add date', days: 0 }),
  fees: PropTypes.shape({
    nightlyFee: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    minNights: 0,
  }),
  styling: PropTypes.shape({
    hover: {},
    static: {},
  }),
  totalGuests: PropTypes.number,
  hovering: PropTypes.bool,
  mousePosition: PropTypes.func,
  setHover: PropTypes.func,
  setX: PropTypes.func,
  setY: PropTypes.func,
};

export default Summary;
