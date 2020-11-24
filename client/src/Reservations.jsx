/* eslint-disable import/extensions */
import React from 'react';
import Box from './Box.jsx';
import styles from '../../styles.css';

const Reservations = () => (
  <div className={styles.container}>
    <img className={styles.header} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_header.png" alt="header" />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '52%' }}>
        <img className={styles.airbnbsummary} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_summary.png" alt="summary" />
        <img className={styles.description} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_description.png" alt="description" />
        <img className={styles.description} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_amenities.png" alt="amenities" />
      </div>
      <Box />
    </div>
  </div>
);

export default Reservations;
