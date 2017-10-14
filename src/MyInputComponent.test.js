import React from 'react';
import MyInputComponent from './MyInputComponent';
import { shallow } from 'enzyme';


describe('The main app', () => {
  it('the app should have text', () => {
    const app  = shallow(<MyInputComponent/>);
    expect(app.contains(<div>Hello jest from react</div>)).toBe(true);
  })
});