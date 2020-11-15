import React from 'react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      date: 0,
      carousel: [],
    };
    this.generateCal = this.generateCal.bind(this);
    this.changeDates = this.changeDates.bind(this);
  }

  componentDidMount() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    for (let i = 0; i < 12; i += 1) {
      if (month === 11) {
        year += 1;
        month = 0;
        this.generateCal(year, month);
      } else {
        month += 1;
        this.generateCal(year, month);
      }
    }
  }

  changeDates(dir) {
    if (dir === 'f') {
      this.setState({ date: this.state.date + 1 });
    } else {
      this.setState({ date: this.state.date - 1 });
    }
  }

  generateCal(y, m) {
    // Create an array of the empty days on the first week of the month
    const emptyDays = [];
    for (let i = 0; i < (new Date(y, m - 1)).getDay(); i += 1) {
      console.log(new Date(y, m).getDay());
      emptyDays.push(<td className="day">{''}</td>);
    }
    // Create an array of all the other days in the month
    const daysInTheMonth = [];
    for (let i = 1; i <= (new Date(y, m, 0).getDate()); i += 1) {
      daysInTheMonth.push(<td className="day calDay">{i}</td>);
    }
    // Concat the two together to get an array showing all empty days and days in the month
    const total = emptyDays.concat(daysInTheMonth);
    // Define a rows array to add your 'row' of 7 <td> cells elements into
    const rows = [];
    let row = [];
    // Iterate through the complete array
    for (let i = 0; i < total.length; i += 1) {
      // If the day is not divisible by 7, add it to the row
      if (i % 7 !== 0) {
        row.push(total[i]);
      // Otherwise, push the entire row into the rows array,
      // empty out the row, and add the next cell into the row
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
    // Create the table for the entire month
    const calendar = rows.map((r) => <tr>{r}</tr>);
    const newCarousel = this.state.carousel;
    newCarousel.push(calendar);
    this.setState({
      carousel: newCarousel,
    });
  }

  render() {
    return (
      <div>
        <div className="carousel">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <button
                className="moveButton"
                onClick={() => {
                  if (this.state.date > 0) {
                    this.changeDates('b');
                  }
                }}
                type="button"
              >
                &#60;
              </button>
              <div style={{ marginRight: '40%', fontSize: '20px' }}>{months[this.state.date]}</div>
            </div>
            <table className="table">
              <thead>
                <tr>
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
                {this.state.carousel[this.state.date]}
              </tbody>
            </table>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
              <div style={{ marginLeft: '40%', fontSize: '20px' }}>{months[this.state.date + 1]}</div>
              <button
                className="moveButton"
                onClick={() => {
                  if (this.state.date < 10) {
                    this.changeDates('f');
                  }
                }}
                type="button"
              >
                &#62;
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
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
                {this.state.carousel[this.state.date + 1]}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default Carousel;
