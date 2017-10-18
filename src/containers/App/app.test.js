import React from 'react';
import App from './index';
import MatchPortrait from '../../components';
import styles from './app.css';
import { shallow } from 'enzyme';


describe('The main app', () => {
  it('the app should have text', () => {
    const app  = shallow(<App/>);
    expect(app.contains(
      <div id="app-container" className={styles.appContainer}>
        <MatchPortrait/>
      </div>
    )).toBe(true);
  })
});