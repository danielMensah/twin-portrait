import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './facial-landmarks-generator.css';
import Image from 'react-bootstrap/lib/Image';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap/lib';
import { FACES, EYES, EYEBROWS, LIPS, NOSES } from '../../images/index';
import { selectLandmark } from '../../actions/landmark-select-actions';
import HelpImg from '../../images/help.png';
import HelpModal from '../modals/help-modal';

let newArr = [];

class Faces extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      objArr: [],
      showModalHelp: false
    }
  }

  componentDidMount() {
    if (!this.props.selectedLandmarks.length) newArr = [];
  }

  render() {
    const obj = {
      face: {
        prop: FACES,
        className: styles.face
      },
      eye: {
        prop: EYES,
        className: styles.eye
      },
      eyebrows: {
        prop: EYEBROWS,
        className: styles.eyebrows
      },
      lips: {
        prop: LIPS,
        className: styles.lips
      },
      nose: {
        prop: NOSES,
        className: styles.nose
      }
    };

    const { landmark } = this.props;
    const { showModalHelp } = this.state;
    const landmarkObj = obj[landmark];

    return (
      <ToggleButtonGroup onChange={(e) => this.handleSelection(landmarkObj.prop[e-1])} type="radio" name="options" className={styles.facesContainer}>
        {landmarkObj.prop.map((face, index) => {
          index++;
          return (
            <ToggleButton value={index} className={`${styles.box}`} key={face.name}>
              <Image className={styles.faceImg} src={face.img}/>
              <div className={styles.faceName}>{face.name}</div>
            </ToggleButton>
          )
        })}
        <Image id={`help-${landmark}`} onClick={this.openHelpModal} className={styles.help} src={HelpImg}/>
        <HelpModal id={`help-${landmark}`} show={showModalHelp} onHide={this.closeHelpModal} landmark={landmark}/>
      </ToggleButtonGroup>
    )
  }

  openHelpModal = () => {
    this.setState({ showModalHelp: true })
  };

  closeHelpModal = () => {
    this.setState({ showModalHelp: false });
  };

  handleSelection = (obj) => {
    const { selectLandmark, landmark } = this.props;

    let newObj = {...obj, landmark};

    newArr.forEach((e, index) => {
      if (e.landmark === landmark) {
        newArr.splice(index, 1);
      }
    });

    newArr.push(newObj);

    this.setState({ objArr: newArr }, () => selectLandmark(newArr));

  };
}

const mapStateProps = ({landmarkSelect}) => ({
  selectedLandmarks: landmarkSelect
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectLandmark }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Faces);