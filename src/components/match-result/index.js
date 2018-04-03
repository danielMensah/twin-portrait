import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { MuiThemeProvider, RaisedButton } from 'material-ui';
import styles from './style.css';
import Header from '../header';
import {Image} from 'react-bootstrap';
import PortraitInfoModal from './portrait-info-modal';
import {resultInfo } from '../../actions/result-actions';
import Satisfaction from '../satisfaction';

class MatchResult extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false }
  }

  render() {
    const { matchData } = this.props;
    const { showModal } = this.state;
    const matchDataArr = Object.keys(matchData).map(function (key) { return matchData[key]; });

    const emptyBody = <div>Hello</div>;

    const resultBody = matchDataArr.map((item) =>  {
      return <div key={item.portrait_url} onClick={() => this.openModal(item.portraitId, item.portrait_url)} className={styles.item}>
        <Image className={styles.img} src={item.portrait_url}/>
        <span className={styles.similarity}>{item.similarity}%</span>
      </div>
    });

    const backButtonOptions = {
      label: "Back",
      primary: true,
      onClick: this.back
    };

    const headerOptions = {
      title: 'Here are your potential Doppelgangers ordered by similarity!',
    };

    return (
      <MuiThemeProvider>
        <div>
          <Header {...headerOptions}/>
          <RaisedButton {...backButtonOptions}/>
          <Satisfaction />
          <div className={styles.results}>
            {matchDataArr.length ? resultBody : emptyBody}
          </div>
          <PortraitInfoModal show={showModal} onHide={this.closeModal}/>
        </div>
      </MuiThemeProvider>
    )
  }

  back = () => {
    browserHistory.push('/match-user');
  };

  openModal = (portraitId, portraitUrl) => {
    this.setState({ showModal: true });
    this.props.resultInfo(portraitId, portraitUrl);
  };

  closeModal = () => {
    this.setState({ showModal : false });
  };

}

const mapStateProps = ({user}) => ({
  matchData: user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ resultInfo }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(MatchResult);
