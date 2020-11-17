import React from 'react';
import axios from 'axios';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const clickDay = { color: 'white', background: 'black' };

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
    axios.get('/api/homes/21/calendar')
      .then((response) => {
        this.props.setFees({
          nightlyFee: response.data.nightlyFee,
          cleaningFee: response.data.cleaningFee,
          serviceFee: response.data.serviceFee,
          taxes: response.data.taxes,
          minNights: response.data.minNights,
        });
        this.props.setDates({
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
    const { date, next } = this.state;
    if (dir === 'f' && date[0] === 10) {
      this.setState({
        date: [date[0] + 1, date[1]],
        next: [0, next[1] + 1],
      });
    } else if (dir === 'f' && date[0] === 11) {
      this.setState({
        date: [0, date[1] + 1],
        next: [next[0] + 1, next[1]],
      });
    } else if (dir === 'f') {
      this.setState({
        date: [date[0] + 1, date[1]],
        next: [next[0] + 1, next[1]],
      });
    } else if (dir === 'b' && date[0] === 0) {
      this.setState({
        date: [11, date[1] - 1],
        next: [next[0] - 1, next[1]],
      });
    } else if (dir === 'b' && next[0] === 0) {
      this.setState({
        date: [date[0] - 1, date[1]],
        next: [11, next[1] - 1],
      });
    } else {
      this.setState({
        date: [date[0] - 1, date[1]],
        next: [next[0] - 1, next[1]],
      });
    }
  }

  generateCal(y, m, d, bool) {
    const { dates, fees } = this.props;
    const res = dates.reservations[0][months[m]];
    // Create an array of the empty days on the first week of the month
    const emptyDays = [];
    for (let i = 0; i < (new Date(y, m)).getDay(); i += 1) {
      emptyDays.push(<td className="day"> </td>);
    }
    // Create an array of all the other days in the month
    const today = [new Date().getDate(), new Date().getMonth()];
    const daysInTheMonth = [];
    let daysAfter = false || bool;
    let minDays = [false, 0];
    for (let i = 1; i <= (new Date(y, m + 1, 0).getDate()); i += 1) {
      if (res) {
        if (res.start[2] <= i && res.end[2] >= i) {
          daysAfter = false;
          daysInTheMonth.push(<td className="day resDay">{i}</td>);
          continue;
        }
      }
      if (minDays[0]) {
        daysInTheMonth.push(<td className="day passDay">{i}</td>);
        minDays[1] += 1;
        if (minDays[1] === fees.minNights - 1) {
          daysAfter = true;
          minDays[0] = false;
        }
      } else if ((today[0] > i && today[1] === m)) {
        daysInTheMonth.push(<td className="day passDay">{i}</td>);
      } else {
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        // eslint-disable-next-line no-lonely-if
        if (d === i) {
          daysInTheMonth.push(<td onMouseDown={() => this.makeReservation(i, m, y)} className="day bookDay">{i}</td>);
          minDays[0] = true;
        } else {
          daysInTheMonth.push(<td onMouseDown={() => this.makeReservation(i, m, y)} className={daysAfter ? 'day calDay afterDay' : 'day calDay'}>{i}</td>);
        }
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
    const newCarousel = this.state.carousel;
    newCarousel[months[m]] = calendar;
    this.setState({
      carousel: newCarousel,
    });
  }

  makeReservation(d, m, y) {
    if (this.state.checkIn.length === 0) {
      this.setState({
        checkIn: [d, m, y],
      });
    } else if (this.state.checkOut.length === 0) {
      this.setState({
        checkOut: [d, m, y],
      });
    }
    this.generateCal(y, m, d);
    this.generateCal(y, m + 1, undefined, true);
  }

  clearReservation() {
    this.setState({
      checkIn: [],
      checkOut: [],
    });
    this.getExisting();
  }

  render() {
    const { date, next, carousel } = this.state;
    return (
      <div className="carousel">
        <div style={{ marginRight: '4.5%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button
              className="moveButton"
              onClick={() => this.changeDates('b')}
              type="button"
            >
              &#60;
            </button>
            <div style={{ marginRight: '40%', fontSize: '18px' }}>{months[date[0]]}</div>
          </div>
          <table className="table">
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
              {carousel[months[date[0]]]}
            </tbody>
          </table>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div style={{ marginLeft: '40%', fontSize: '18px', verticalAlign: 'bottom' }}>{months[next[0]]}</div>
            <button
              className="moveButton"
              onClick={() => this.changeDates('f')}
              type="button"
            >
              &#62;
            </button>
          </div>
          <table className="table">
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
              {carousel[months[next[0]]]}
            </tbody>
          </table>
        </div>
        <div>
          <button className="clearCalendar" type="button" onClick={() => this.clearReservation()}>Clear dates</button>
          <button className="closeCalendar" type="button" onClick={this.props.close}>Close</button>
        </div>
      </div>
    );
  }
}

export default Carousel;
