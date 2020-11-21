/* eslint-disable import/extensions */
import React, { useState } from 'react';
import Form from './Form.jsx';
import styles from '../../styles.css';

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
      <div className={styles.box}>
        <div className={styles.nightlyFee}>
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
