import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './portrait-info-modal.css';
import { Image } from 'react-bootstrap/lib';
import { fetchPortraitInfo } from '../../actions/portrait-actions';
import loadingImg from '../../images/loading2.gif';
import Fab from '../floating-button';
import { Dialog, FlatButton } from 'material-ui';
import Satisfaction from '../satisfaction';

class PortraitInfoModal extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      loading: false,
      currentId: false
    }
  }

  startLoading = () => {
    this.setState({ loading: true})
  };

  stopLoading = () => {
    this.setState({ loading: false})
  };

  componentWillReceiveProps(prop) {
    if (prop.id !== this.state.currentId) {
      this.setState({currentId: prop.id}, () => {
        this._fetchData();
      })
    }
  }

  _fetchData() {
    const { id, fetchPortraitInfo } = this.props;

    this.startLoading();
    fetchPortraitInfo({ id }).then(() => {
      this.stopLoading();
    });
  }

  render() {
    const { show, onHide, infoList, url, id } = this.props;
    const { title, creator, date_created, physical_dimensions, external_link, external_link_text } = infoList;
    const { loading } = this.state;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={onHide}
      />
    ];

    return (
      <Dialog title={title}
              actions={actions}
              modal={false}
              open={show}
              onRequestClose={onHide}
              autoScrollBodyContent={true}>
        { loading ? <Image className={styles.loading} src={loadingImg}/> :
          <div className={styles.detailsContainer}>
            <div className={styles.extras}>
              <div>
                <div className={styles.more}>
                  <a href={url} target="blank"><Fab size="2x" icon="external-link"/></a>
                </div>
                <Image src={url} responsive/>
              </div>
              <div className={styles.details}>
                <div className={styles.subDetails}>
                  <div className={styles.title}>
                    <label>Title: </label>
                    <span> {title}</span>
                  </div>
                  <div className={styles.creator}>
                    <label>Creator: </label>
                    <span> {creator}</span>
                  </div>
                  <div className={styles.date}>
                    <label>Date Created: </label>
                    <span> {date_created}</span>
                  </div>
                  <div className={styles.dimensions}>
                    <label>Physical Dimensions: </label>
                    <span> {physical_dimensions}</span>
                  </div>
                  {external_link === "Unknown" ? null :
                    <div className={styles.externalLink}>
                      <label>Link: </label>
                      <a target="blank" href={external_link}>
                        {external_link_text === "Unknown" ? 'Click here for more information' : external_link_text}</a>
                    </div>
                  }
                  <div className={styles.externalLink}>
                    <label>Link: </label>
                    <a target="blank" href={`https://www.google.com/culturalinstitute/beta/asset/${id}`}>
                      Click here for more information
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Satisfaction />
          </div>
        }
      </Dialog>
    )
  }
}

const mapStateProps = ({result, portraitInfo}) => ({
  infoList: portraitInfo,
  url: result.url,
  id: result.id
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchPortraitInfo }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(PortraitInfoModal);