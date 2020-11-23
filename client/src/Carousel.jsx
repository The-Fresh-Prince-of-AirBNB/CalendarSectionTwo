/* eslint-disable no-continue */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from '../../styles.css';
import CalTable from './CalTable.jsx';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: [0, 0],
      next: [1, 0],
      carousel: {},
      checkIn: [],
      checkOut: [],
      range: 0,
      position: 0,
    };
    this.generateCal = this.generateCal.bind(this);
    this.changeDates = this.changeDates.bind(this);
    this.makeReservation = this.makeReservation.bind(this);
    this.clearReservation = this.clearReservation.bind(this);
    this.getExisting = this.getExisting.bind(this);
  }

  componentDidMount() {
    this.getExisting();
  }

  getExisting() {
    const { setFees, setDates } = this.props;
    axios.get(`${window.location.pathname}reservations`)
      .then((response) => {
        setFees({
          nightlyFee: response.data.nightlyFee,
          cleaningFee: response.data.cleaningFee,
          serviceFee: response.data.serviceFee,
          taxes: response.data.taxes,
          minNights: response.data.minNights,
        });
        setDates({
          reservations: response.data.reservations,
        });
      })
      .then(() => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        this.setState({
          date: [month, year],
          next: [month + 1, year],
        });
        for (let i = 0; i < 12; i += 1) {
          if (month === 12) {
            year += 1;
            month = 0;
            this.generateCal(year, month);
            month += 1;
          } else {
            this.generateCal(year, month);
            month += 1;
          }
        }
      });
  }

  changeDates(dir) {
    const { dates } = this.props;
    const { date, next, range } = this.state;
    const lastMonthYear = dates.reservations[months[date[0]]].start[0];
    const nextMonthYear = dates.reservations[months[next[0]]].start[0];

    if (dir === 'f') {
      this.setState({
        range: range + 1,
      });
    } else {
      this.setState({
        range: range - 1,
      });
    }
  }

  generateCal(y, m, d, first, trail, lead) {
    const { dates, fees } = this.props;
    const { checkIn, carousel } = this.state;
    const res = dates.reservations[months[m]];
    // Create an array of the empty days on the first week of the month
    const emptyDays = [];
    for (let i = 0; i < (new Date(y, m)).getDay(); i += 1) {
      emptyDays.push(<td className={styles.day}> </td>);
    }
    // Create an array of all the other days in the month
    const today = [new Date().getDate(), new Date().getMonth()];
    const daysInTheMonth = [];
    let daysUntilNextReservation = false || first;
    let daysAfterNextReservation = false;
    let daysBetween = false;
    let daysBefore = false;
    if (d) {
      daysBefore = true;
    }
    const minDays = [false, 0];
    for (let i = 1; i <= (new Date(y, m + 1, 0).getDate()); i += 1) {
      const key = y.toString() + m.toString() + i.toString();
      if (lead) {
        daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.resDay}`}>{i}</td>);
        continue;
      // greys out all previous days until the current day
      }
      if (res) {
        if (res.start[2] <= i && res.end[2] >= i && res.start[0] === y) {
          daysUntilNextReservation = false;
          daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.resDay}`}>{i}</td>);
          if (d) {
            daysAfterNextReservation = true;
          }
          continue;
        }
      }
      // greys out all previous days until the current day
      if ((today[0] > i && today[1] === m)) {
        daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.passDay}`}>{i}</td>);
      // greys out the next n days correlating to the minumum stay
      } else if (minDays[0]) {
        daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.passDay}`}>{i}</td>);
        minDays[1] += 1;
        if (minDays[1] >= fees.minNights - 1) {
          daysUntilNextReservation = true;
          minDays[0] = false;
        }
      // if theres a day passed in the first time, make that day a checkin reservation day
      } else if (d === i && !first) {
        daysBefore = false;
        daysInTheMonth.push(<td key={key} role="presentation" onMouseDown={() => this.makeReservation(i, m, y)} className={`${styles.day} ${styles.bookDay}`}>{i}</td>);
        minDays[0] = true;
      // the final booking
      } else if (d === i && trail) {
        daysInTheMonth.push(<td key={key} role="presentation" onMouseDown={() => this.makeReservation(i, m, y)} className={`${styles.day} ${styles.bookDay}`}>{i}</td>);
        daysBetween = false;
      // if there is already a check in date
      } else if (checkIn[0] === i && checkIn[1] === m && checkIn[2] === y) {
        daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.bookDay}`}>{i}</td>);
        daysBetween = true;
      // marks the days between the two checkin dates
      } else if (daysBetween) {
        daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.betweenDay}`}>{i}</td>);
        daysBetween = true;
      // if the days are before the next reservation, push available calendar days
      } else if (!daysAfterNextReservation) {
        if (daysBefore && !first) {
          daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.resDay}`}>{i}</td>);
        } else {
          daysInTheMonth.push(<td key={key} role="presentation" onMouseDown={() => this.makeReservation(i, m, y)} className={daysUntilNextReservation ? `${styles.day} ${styles.calDay} ${styles.afterDay}` : `${styles.day} ${styles.calDay}`}>{i}</td>);
        }
      // else push non-available days
      } else {
        daysInTheMonth.push(<td key={key} className={`${styles.day} ${styles.resDay}`}>{i}</td>);
      }
    }
    const total = emptyDays.concat(daysInTheMonth);
    // Define a rows array to add your 'row' of 7 <td> cells elements into
    const rows = [];
    let row = [];
    // Iterate through the complete array
    for (let i = 0; i < total.length; i += 1) {
      // If the day is not divisible by 7, add it to the row
      if (i % 7 !== 0) {
        row.push(total[i]);
      // Or, push the entire row into [rows], empty out the row, and add the next cell into the row
      } else {
        rows.push(row);
        row = [];
        row.push(total[i]);
      }
      // At the end, push the last row into the rows array
      if (i === total.length - 1) {
        rows.push(row);
      }
    }
    const calendar = rows.map((r) => <tr>{r}</tr>);
    const newCarousel = carousel;
    newCarousel[months[m]] = calendar;
    this.setState({
      carousel: newCarousel,
    });
  }

  makeReservation(d, m, y) {
    const { handleBook, close } = this.props;
    const { checkIn, checkOut } = this.state;
    if (checkIn.length === 0) {
      handleBook(m, d, y);
      this.setState({
        checkIn: [d, m, y],
      });
      if (m === 0) {
        this.generateCal(y - 1, 11, d, false, false, true);
        this.generateCal(y, m, d, false);
        this.generateCal(y, m + 1, d, true);
      } else if (m < 11) {
        this.generateCal(y, m - 1, d, false, false, true);
        this.generateCal(y, m, d, false);
        this.generateCal(y, m + 1, d, true);
      } else if (m === 11) {
        this.generateCal(y, m - 1, d, false, false, true);
        this.generateCal(y, m, d, false);
        this.generateCal(y + 1, 0, d, true);
      }
    } else if (checkOut.length === 0) {
      handleBook(m, d, y, true);
      this.setState({
        checkOut: [d, m, y],
      });
      this.generateCal(y, m, d, true, true);
      close();
    }
  }

  clearReservation() {
    const { handleBook } = this.props;
    this.setState({
      date: [0, 0],
      next: [1, 0],
      checkIn: [],
      checkOut: [],
      range: 0,
    });
    this.getExisting();
    handleBook(null);
  }

  render() {
    const { close } = this.props;
    const {
      date, carousel, range,
    } = this.state;
    const carArray = Object.values(carousel);
    let i = -1;
    const list = carArray.map(() => {
      i += 1;
      // if (date[0] + i === 12) {
      //   this.setState({ date: [0, date[1] + 1] });
      // }
      return (
        <CalTable
          range={range}
          changeDates={this.changeDates}
          months={months}
          date={[date[0] + i, date[1]]}
          carousel={carousel}
          carArray={carArray[i]}
        />
      );
    });

    return (
      <div style={{ overflow: 'hidden' }}>
        <div className={styles.moveButtonCont}>
          {range === 0 ? (<div style={{ height: '32px', width: '32px' }}> </div>)
            : (
              <button
                className={styles.moveButton}
                onClick={() => this.changeDates('b')}
                type="button"
              >
                &lt;
              </button>
            )}
          {range === 10 ? ''
            : (
              <button
                className={styles.moveButton}
                onClick={() => this.changeDates('f')}
                type="button"
              >
                &gt;
              </button>
            )}
        </div>
        <br />
        <div className={styles.carousel}>
          <div style={
            {
              display: 'flex',
              overflow: 'hidden',
              marginLeft: `${-345 * range}px`,
              position: 'relative',
              transition: 'all .3s ease',
            }
          }
          >
            {list}
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <button className={styles.clearCalendar} type="button" onClick={() => this.clearReservation()}>Clear dates</button>
          <button className={styles.closeCalendar} type="button" onClick={close}>Close</button>
        </div>
      </div>
    );
  }
}

Carousel.defaultProps = {
  dates: { reservations: {} },
  fees: {
    nightlyFee: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    minNights: 0,
  },
  close: () => null,
  setFees: () => null,
  setDates: () => null,
  handleBook: () => null,
};

Carousel.propTypes = {
  dates: PropTypes.shape({ reservations: {} }),
  fees: PropTypes.shape({
    nightlyFee: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    minNights: 0,
  }),
  close: PropTypes.func,
  setFees: PropTypes.func,
  setDates: PropTypes.func,
  handleBook: PropTypes.func,
};

export default Carousel;

// style={{ marginRight: '4.5%' }}
