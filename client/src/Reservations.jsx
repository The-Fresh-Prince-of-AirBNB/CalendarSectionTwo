/* eslint-disable import/extensions */
import React from 'react';
import Box from './Box.jsx';
import styles from '../../styles.css';

const Reservations = () => (
  <div className={styles.container}>
    <picture>
      <source className={styles.header} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_header.webp" type="image/webp" />
      <source className={styles.header} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_header.jp2" type="image/jp2" />
      <img className={styles.header} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_header.png" alt="header" />
    </picture>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '52%' }}>
        <picture>
          <source className={styles.airbnbsummary} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_summary.webp" type="image/webp" />
          <source className={styles.airbnbsummary} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_summary.jp2" type="image/jp2" />
          <img className={styles.airbnbsummary} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_summary.png" alt="header" />
        </picture>
        <picture>
          <source className={styles.description} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_description.webp" type="image/webp" />
          <source className={styles.description} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_description.jp2" type="image/jp2" />
          <img className={styles.description} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_description.png" alt="header" />
        </picture>
        <picture>
          <source className={styles.description} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_amenities.webp" type="image/webp" />
          <source className={styles.description} srcSet="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_amenities.jp2" type="image/jp2" />
          <img className={styles.description} src="https://airbnb-fec-reservations.s3-us-west-1.amazonaws.com/airbnb_amenities.png" alt="header" />
        </picture>
      </div>
      <Box />
    </div>
  </div>
);

export default Reservations;
