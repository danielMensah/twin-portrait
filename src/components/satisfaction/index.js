import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './style.css';
import {resultInfo } from '../../actions/result-actions';

class Satisfaction extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { showModal: false }
  // }

  render() {

    return (
      <div style={{marginTop: '30px'}}>
        <label>Are you satisfied with the result?</label>
        <div style={{justifyContent: 'center'}} className={styles.satisfactionButtons}>
          <div style={{marginRight: '50px', fontSize: '30px', cursor: 'pointer'}}>👎</div>
          <div style={{fontSize: '30px', cursor: 'pointer'}}>👍</div>
        </div>
      </div>
    )
  }

}

const mapStateProps = ({user}) => ({
  matchData: user
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ resultInfo }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Satisfaction);
