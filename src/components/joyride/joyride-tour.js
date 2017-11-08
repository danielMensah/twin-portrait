import React, { Component } from 'react';
import { connect } from 'react-redux';
import Joyride from 'react-joyride';
import { Steps } from './joyride-steps';
import LocalStorage from '../../util/local-storage';

require("./styles.scss");

class JoyrideTour extends Component {

  constructor(props) {
    super(props);
    this.state ={
      startTourText: false
    }
  }

  tourCompleted = () => {
    LocalStorage.setItem('tourCompleted', true);
  };

  render() {
    const { startTourText } = this.state;

    return (
      <Joyride
        ref={(joyride) => this.joyride = joyride}
        steps={Steps}
        locale={{last: 'Start now', next: startTourText ? 'Start tour' : 'Next', skip: 'Skip'}}
        autoStart={true}
        run={!LocalStorage.getItem('tourCompleted')} // or some other boolean for when you want to start it
        showStepsProgress={!startTourText}
        type="continuous"
        debug={false}
        showSkipButton={true}
        scrollToSteps={true}
        callback={(callback) => {
          if ( callback.type === 'finished' || callback.action === 'skip') this.tourCompleted();
          if (  callback.index === 0 ) {
            this.setState({ startTourText: true })
          } else {
            this.setState({ startTourText: false })
          }
        }}
      />
    )
  }

}

export default connect()(JoyrideTour);
