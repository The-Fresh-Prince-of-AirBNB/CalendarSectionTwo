import React, { useState } from 'react';

// eslint-disable-next-line arrow-body-style
const Summary = (props) => {
  const lineStyle = { textDecoration: 'underline' };

  return (
    <div>
      <button
        className="checkAvailabilityAndReserve"
        type="button"
        style={{ backgroundPosition: `${props.x - 80}px ${props.y}px`, backgroundImage: 'linear-gradient(to right, #d43974, #d43939, #d43974)' }}
        onMouseMove={(event) => props.mousePosition(event)}
        onMouseLeave={() => {
          props.setX(0);
          props.setY(0);
        }}
      >
        Reserve
      </button>
      <div style={{ fontSize: '13px', textAlign: 'center', margin: '20px 0px' }}>You won&apos;t be charged yet</div>
      <div className="summaryItems">
        <div className="summaryItem">
          <div style={lineStyle}>
            $
            {props.fees.nightlyFee}
            {' '}
            x 4 nights
          </div>
        </div>
        <div className="summaryItem">
          <div style={lineStyle}>Cleaning fee</div>
          <div>
            $
            {props.fees.cleaningFee}
          </div>
        </div>
        <div className="summaryItem">
          <div style={lineStyle}>Service fee</div>
          <div>
            $
            {props.fees.serviceFee}
          </div>
        </div>
        <div className="summaryItem">
          <div style={lineStyle}>Occupancy taxes and fees</div>
          <div>
            $
            {props.fees.taxes}
          </div>
        </div>
      </div>
      <div className="total">
        <div>Total</div>
        <div>$ x</div>
      </div>
    </div>
  );
};

export default Summary;
