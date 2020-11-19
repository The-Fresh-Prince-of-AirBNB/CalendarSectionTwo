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
import Summary from '../client/src/Summary.jsx';

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
  it('should render correctly in "debug" mode', () => {
    // shallow(<Form />);
    const component = shallow(<Form debug />);
    expect(component).toMatchSnapshot();
  });
});

// Sections for all components
describe('Reservations', () => {
  it('should render Reservations without crashing', () => {
    const res = shallow(<Reservations />);
    const resJson = JSON.stringify(res);
    expect(res).toMatchSnapshot();
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
  const guests = { adults: 2, children: 2, infants: 0 };

  it('should render Guests without crashing', () => {
    shallow(<Guests />);
  });

  it('accepts guests props', () => {
    const wrapper = mount(<Guests guests={guests} />);
    expect(wrapper.props().guests.adults).toEqual(2);
    expect(wrapper.props().guests.adults).not.toEqual(3);
  });
});

describe('Calendar', () => {
  const reserve = false;

  it('should render Calendar without crashing', () => {
    shallow(<Calendar />);
  });

  it('accepts reserve props', () => {
    const wrapper = mount(<Calendar reserve={reserve} />);
    expect(wrapper.props().reserve).toBeFalsy();
  });
});

describe('Carousel', () => {
  const testFunc = (x, y) => x + y;

  it('should render Carousel without crashing', () => {
    shallow(<Carousel />);
  });

  it('accepts function props', () => {
    const wrapper = mount(<Carousel testFunc={testFunc} />);
    expect(wrapper.props().testFunc(2, 3)).toEqual(5);
  });

  // it('', () => {

  // });
});

describe('Summary', () => {
  const form = { in: '11/23/2020', out: '11/27/2020', days: 4 };
  const fees = {
    nightlyFee: 150,
    cleaningFee: 30,
    serviceFee: 20,
    taxes: 15,
    minNights: 4,
  };

  it('should render Summary without crashing', () => {
    shallow(<Summary />);
  });

  it('accepts a form (object) props', () => {
    const wrapper = mount(<Summary form={form} />);
    expect(wrapper.props().form.in).toEqual('11/23/2020');
  });
});
