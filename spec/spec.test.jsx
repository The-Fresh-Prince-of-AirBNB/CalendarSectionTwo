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
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

// Sections for all components
describe('Reservations', () => {
  it('should render Reservations without crashing', () => {
    const res = shallow(<Reservations />);
    expect(res).toMatchSnapshot();
  });
});

describe('Form', () => {
  const date = {
    start: [2020, 11, 20],
    end: [2020, 11, 25],
  };

  it('should render Form without crashing', () => {
    const fo = shallow(<Form />);
    expect(fo).toMatchSnapshot();
  });

  it('accepts date props', () => {
    const wrapper = mount(<Form date={date} />);
    expect(wrapper.props().date).toEqual(date);
  });

  it('opens up calendar when calendar button is clicked on form', () => {
    const wrapper = mount(<Form />);
    const calButton = wrapper.find({ 'data-testid': 'formCalendarTest' });
    let cal = wrapper.find({ 'data-testid': 'openCalendarTest' });
    expect(cal.prop('style')).toHaveProperty('display', 'none');
    calButton.simulate('click');
    wrapper.update();

    cal = wrapper.find({ 'data-testid': 'openCalendarTest' });
    expect(cal.prop('style')).toHaveProperty('display', 'block');
  });

  it('closes the guest list when calendar button is clicked on form', () => {
    const wrapper = mount(<Form />);
    const calButton = wrapper.find({ 'data-testid': 'formCalendarTest' });
    const guestButton = wrapper.find({ 'data-testid': 'buttonGuestTest' });
    let guestList = wrapper.find({ 'data-testid': 'closeGuestTest' });
    // open up the guest list, expect style from none to block
    expect(guestList.prop('style')).toHaveProperty('display', 'none');
    guestButton.simulate('click');
    wrapper.update();
    guestList = wrapper.find({ 'data-testid': 'closeGuestTest' });
    expect(guestList.prop('style')).toHaveProperty('display', 'block');
    // open up the calendar, want the guest list to close when calendar opens
    calButton.simulate('click');
    wrapper.update();
    guestList = wrapper.find({ 'data-testid': 'closeGuestTest' });
    const cal = wrapper.find({ 'data-testid': 'openCalendarTest' });
    expect(guestList.prop('style')).toHaveProperty('display', 'none');
    expect(cal.prop('style')).toHaveProperty('display', 'block');
  });
});

describe('Guests', () => {
  const guests = { adults: 2, children: 2, infants: 0 };

  it('should render Guests without crashing', () => {
    const gu = shallow(<Guests />);
    expect(gu).toMatchSnapshot();
  });

  it('accepts guests props', () => {
    const wrapper = mount(<Guests guests={guests} />);
    expect(wrapper.props().guests.adults).toEqual(2);
    expect(wrapper.props().guests.adults).not.toEqual(3);
  });

  it('adds no more than 4 guests', async () => {
    const formWrapper = mount(<Form />);
    const guestWrapper = mount(<Guests />);

    let totAdults = guestWrapper.find({ 'data-testid': 'totAdults' });
    const addAdultsBut = guestWrapper.find({ 'data-testid': 'addAdults' });
    const addChildrenBut = guestWrapper.find({ 'data-testid': 'addChildren' });
    // Start off with 2 guests
    expect(totAdults.text()).toBe('2');
    // Simulate two clicks on the add buttons
    addAdultsBut.simulate('click');
    addAdultsBut.simulate('click');
    guestWrapper.update();
    formWrapper.update();

    totAdults = guestWrapper.find({ 'data-testid': 'totAdults' });
    expect(totAdults.text()).toBe('4');

    addAdultsBut.simulate('click');
    guestWrapper.update();
    totAdults = guestWrapper.find({ 'data-testid': 'totAdults' });
    expect(totAdults.text()).toBe('4');
  });

  it('calls a function in Form that renders the form', () => {
    const mock = jest.fn();
    const wrapper = shallow(<Guests setGuest={mock} />);
    const addAdultBut = wrapper.find({ 'data-testid': 'addAdults' });

    addAdultBut.simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});

describe('Calendar', () => {
  const reserve = false;

  it('should render Calendar without crashing', () => {
    const ca = shallow(<Calendar />);
    expect(ca).toMatchSnapshot();
  });

  it('accepts reserve props', () => {
    const wrapper = mount(<Calendar reserve={reserve} />);
    expect(wrapper.props().reserve).toBeFalsy();
  });
});

describe('Carousel', () => {
  const testFunc = (x, y) => x + y;

  it('should render Carousel without crashing', () => {
    const car = shallow(<Carousel />);
    expect(car).toMatchSnapshot();
  });

  it('accepts function props', () => {
    const wrapper = mount(<Carousel testFunc={testFunc} />);
    expect(wrapper.props().testFunc(2, 3)).toEqual(5);
  });

  it('Calls the API call function on page load', () => {
    const spy = jest.spyOn(Carousel.prototype, 'getExisting');
    const wrapper = mount(<Carousel />);
    wrapper.instance().getExisting();
    expect(spy).toHaveBeenCalled();

    afterEach(() => {
      spy.mockClear();
    });
  });
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
    const su = shallow(<Summary />);
    expect(su).toMatchSnapshot();
  });

  it('accepts a form (object) props', () => {
    const wrapper = mount(<Summary form={form} />);
    expect(wrapper.props().form.in).toEqual('11/23/2020');
  });
});
