import React, { Component } from 'react';
import { connect } from 'react-redux';
import Joyride from 'react-joyride';
import { Steps } from './joyride-steps';
import LocalStorage from '../../util/local-storage';

require("./styles.scss");

class JoyrideTour extends Component {

  tourCompleted = () => {
    LocalStorage.setItem('tourCompleted', true);
  };

  render() {

    return (
      <Joyride
        ref={(joyride) => this.joyride = joyride}
        steps={Steps}
        locale={{last: 'Start now'}}
        autoStart={true}
        run={!LocalStorage.getItem('tourCompleted')} // or some other boolean for when you want to start it
        showStepsProgress={true}
        type="continuous"
        callback={(callback) => callback.type === 'finished' ? this.tourCompleted : null}
      />
    )
  }

}

export default connect()(JoyrideTour);
