/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import {
  configure, shallow, mount,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import 'jsdom-global/register';

// Import all components for testing
import Guests from '../client/src/Guests.jsx';
import Form from '../client/src/Form.jsx';
import Carousel from '../client/src/Carousel.jsx';
import Calendar from '../client/src/Calendar.jsx';
import Reservations from '../client/src/Reservations.jsx';

configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('testing for jest', () => {
  it('test to see that jest runs', () => {
    const data = { one: 1 };
    data.two = 2;
    expect(data).toEqual({ one: 1, two: 2 });
    expect(1 + 2).toBe(3);
    const n = null;
    expect(n).toBeNull();
  });
});

describe('Snapshots', () => {
  it('should have class "day" for the calendar carousel', () => {
    expect(shallow(<Carousel />).is('.carousel')).toBe(true);
  });

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Form debug />);
    expect(component).toMatchSnapshot();
  });
});

// Sections for all components
describe('Reservations', () => {
  it('should render Reservations without crashing', () => {
    shallow(<Reservations />);
  });
});

describe('Form', () => {
  const date = {
    start: [2020, 11, 20],
    end: [2020, 11, 25],
  };

  it('should render Form without crashing', () => {
    shallow(<Form />);
  });

  it('accepts date props', () => {
    const wrapper = mount(<Form date={date} />);
    expect(wrapper.props().date).toEqual(date);
  });
});

describe('Guests', () => {
  it('should render Guests without crashing', () => {
    shallow(<Guests />);
  });
});

describe('Calendar', () => {
  it('should render Calendar without crashing', () => {
    shallow(<Calendar />);
  });
});

describe('Carousel', () => {
  it('should render Carousel without crashing', () => {
    shallow(<Carousel />);
  });
});
