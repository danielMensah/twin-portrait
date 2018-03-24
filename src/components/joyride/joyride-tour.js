import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { Steps } from './joyride-steps';
import LocalStorage from '../../util/local-storage';

require("./styles.scss");

class JoyrideTour extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    stepType: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state ={
      startTourText: false
    }
  }

  tourCompleted = () => {
    LocalStorage.setItem(this.props.type, true);
  };

  render() {
    const { startTourText } = this.state;
    const { stepType } = this.props;

    return (
      <Joyride
        ref={(joyride) => this.joyride = joyride}
        steps={Steps[stepType]}
        locale={{last: 'Start now', next: startTourText ? 'Start tour' : 'Next', skip: 'Skip'}}
        autoStart={true}
        run={!LocalStorage.getItem(this.props.type)} // or some other boolean for when you want to start it
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
