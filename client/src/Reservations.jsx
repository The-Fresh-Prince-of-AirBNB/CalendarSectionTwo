/* eslint-disable import/extensions */
import React from 'react';
import Box from './Box.jsx';
import styles from '../../styles.css';

const Reservations = () => (
  <div>
    <img className={styles.header} src="../dist/photos/airbnb_header.png" alt="header" />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '52%' }}>
        <img className={styles.airbnbsummary} src="../dist/photos/airbnb_summary.png" alt="summary" />
        <img className={styles.description} src="../dist/photos/airbnb_description.png" alt="description" />
        <img className={styles.description} src="../dist/photos/airbnb_amenities.png" alt="amenities" />
      </div>
      <Box />
    </div>
  </div>
);

export default Reservations;
