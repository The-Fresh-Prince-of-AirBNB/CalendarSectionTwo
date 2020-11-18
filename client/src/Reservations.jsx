import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form.jsx';

const Reservations = () => {
  const [fees, setFees] = useState(
    {
      nightlyFee: 0,
      cleaningFee: 0,
      serviceFee: 0,
      taxes: 0,
      minNights: 0,
    },
  );
  const [dates, setDates] = useState({ reservations: {} });

  return (
    <div>
      <div className="box">
        <div className="nightlyFee">
          <div style={{ display: 'inline', fontSize: '24px', fontWeight: '500' }}>
            $
            {' '}
            {fees.nightlyFee}
            </div>
          <div style={{ display: 'inline' }}> / night</div>
        </div>
        <Form setFees={setFees} setDates={setDates} dates={dates} fees={fees} />
      </div>
    </div>
  );
};

export default Reservations;
