import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      dates: {
        months: [],
        years: [],
      },
      carousel: [],
    };
    this.generateCal = this.generateCal.bind(this);
    this.changeDates = this.changeDates.bind(this);
  }

  componentDidMount() {
    this.generateCal(new Date().getFullYear(), new Date().getMonth(), 'f');
    this.generateCal(new Date().getFullYear(), new Date().getMonth() + 1, 'f');
  }

  changeDates(direction) {
    const dates = this.state.dates;
    const newCarousel = this.state.carousel;
    if (direction === 'f') {
      newCarousel.shift();
      if (dates.months[1] === 11) {
        this.generateCal(dates.years[1] + 1, 0, direction);
      } else {
        this.generateCal(dates.years[1], dates.months[1] + 1, direction);
      }
      dates.months.shift();
      dates.years.shift();
    } else {
      newCarousel.pop();
      if (dates.months[1] === 0) {
        this.generateCal(dates.years[1] - 1, 11, direction);
      } else {
        this.generateCal(dates.years[1], dates.months[1] - 1, direction);
      }
      dates.months.pop();
      dates.years.pop();
    }
    this.setState({
      dates: dates,
      carousel: newCarousel,
    });
  }

  generateCal(y, m, dir) {
    // Create an array of the empty days on the first week of the month
    const emptyDays = [];
    for (let i = 0; i < (new Date(y, m)).getDay(); i += 1) {
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
    const newDates = this.state.dates;
    if (dir === 'f') {
      newDates.months.push(m);
      newDates.years.push(y);
    } else {
      newDates.months.unshift(m);
      newDates.years.unshift(y);
    }
    this.setState({
      dates: newDates,
      carousel: newCarousel,
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.changeDates('b')} type="button">
          Before
        </button>
        <button onClick={() => this.changeDates('f')} type="button">
          Next
        </button>
        <div className="carousel">
          <div>
            <div>November, 2020</div>
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
                {this.state.carousel[0]}
              </tbody>
            </table>
          </div>
          <div>
            <div>December, 2020</div>
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
                {this.state.carousel[1]}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default Carousel;
