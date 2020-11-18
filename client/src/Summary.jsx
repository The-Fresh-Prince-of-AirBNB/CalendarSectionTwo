import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// eslint-disable-next-line arrow-body-style
const Summary = (props) => {
  const {
    fees,
    hovering,
    form,
    max,
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
      + Number.parseInt(max, 10) * 15,
    taxes:
      Number.parseInt(fees.taxes, 10)
      * Number.parseInt(form.days, 10)
      + Number.parseInt(max, 10) * 10,
  };
  const total = tots.nightly + Number.parseInt(fees.cleaningFee, 10) + tots.service + tots.taxes;

  const bookReservation = () => {
    axios.post('/api/homes/21/reservation', {
      days: 'testerrr',
    });
  };

  return (
    <div>
      <button
        className="checkAvailabilityAndReserve"
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
      <div className="summaryItems">
        <div className="summaryItem">
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
        <div className="summaryItem">
          <div style={lineStyle}>Cleaning fee</div>
          <div>
            $
            {fees.cleaningFee}
          </div>
        </div>
        <div className="summaryItem">
          <div style={lineStyle}>Service fee</div>
          <div>
            $
            {tots.service}
          </div>
        </div>
        <div className="summaryItem">
          <div style={lineStyle}>Occupancy taxes and fees</div>
          <div>
            $
            {tots.taxes}
          </div>
        </div>
      </div>
      <div className="total">
        <div>Total</div>
        <div>
          $
          {total}
        </div>
      </div>
    </div>
  );
};

Summary.propTypes = {
  fees: PropTypes.shape.isRequired,
  hovering: PropTypes.bool.isRequired,
  form: PropTypes.shape.isRequired,
  max: PropTypes.shape.isRequired,
  styling: PropTypes.shape.isRequired,
  mousePosition: PropTypes.func.isRequired,
  setHover: PropTypes.func.isRequired,
  setX: PropTypes.func.isRequired,
  setY: PropTypes.func.isRequired,
};

export default Summary;
