/* eslint-disable import/extensions */
import React from 'react';
import styles from '../../styles.css';

// eslint-disable-next-line arrow-body-style
const CalTable = (props) => {
  const {
    range,
    changeDates,
    months,
    date,
    carousel,
    carArray,
  } = props;

  // date[0] + i >= 12 ? [date[0] - 12, date[1] + 1] : [date[0] + i, date[1]]

  return (
    <div className={styles.calendarTable} style={{ marginTop: '0px', marginRight: '24px' }}>
      <div data-testid="firstMonth" style={{ textAlign: 'center', fontSize: '18px', marginBottom: '5px' }}>
        {date[0] >= 12 ? months[date[0] - 12] : months[date[0]]}
        {' '}
        {date[0] >= 12 ? date[1] + 1 : date[1]}
      </div>
      <table className={`${styles.table} ${styles.slide}`}>
        <thead>
          <tr style={{ color: 'rgb(129, 129, 129)' }}>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody>
          {carArray}
        </tbody>
      </table>
    </div>
  );
};

export default CalTable;

// months[date[0]]
// date[1]
