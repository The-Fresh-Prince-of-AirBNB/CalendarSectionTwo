/* eslint-disable no-undef */

import React from 'react';
import renderer from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Form from './../client/src/Form.jsx';

configure({ adapter: new Adapter() });

describe('testing for jest', () => {
  it('test to see that jest runs', () => {
    // Common Matching
    const data = { one: 1 };
    data.two = 2;
    expect(data).toEqual({ one: 1, two: 2 });
    expect(1 + 2).toBe(3);

    // Truthiness
    const n = null;
    expect(n).toBeNull();
  });
});

describe('Snapshot in debug mode', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Form debug />);
    expect(component).toMatchSnapshot();
  });
});
