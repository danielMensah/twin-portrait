import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormControl } from 'react-bootstrap/lib';
import styles from './style.css';
import FontAwesome from 'react-fontawesome';
import ContactList from './contact-list';
import Conversation from './conversation';
import { fetchMessengerInfo } from '../../../actions/chat-actions';
import Status from './status';

class Chat extends Component {

  componentWillMount() {
    this.props.fetchMessengerInfo()
  }

  constructor(props) {
    super(props);
    this.state = {
      openChat: false,
    }
  }

  render() {
    const { openChat } = this.state;
    const { status, contacts } = this.props.messenger;
    const containerClassName = `${styles.chatContainer} ${openChat ? styles.active : ''}`;
    const headerClassName = `${styles.header} ${openChat ? styles.active : ''}`;

    return (
      <div className={containerClassName}>
        <div className={headerClassName}>
          <div onClick={this.handleChatBar} className={styles.leftSide}>
            <Status className={styles.status} status={status} />
            <span className={styles.text}>Messenger</span>
          </div>
          <div className={styles.rightSide}>
            <FontAwesome onClick={this.handleNewConversation} className={styles.pencil} name="pencil-square-o" />
            <FontAwesome className={styles.settings} name="cog" />
          </div>
        </div>
        <div className={styles.main}>
          <FormControl className={styles.searchBar} bsSize="small" type="text" placeholder="Search contact" />
          <Conversation />
          <ContactList contacts={contacts} />
        </div>
      </div>
    )
  }

  handleNewConversation = () => {

  };

  handleChatBar = () => {
    this.setState({ openChat: !this.state.openChat })
  }
}

const mapStateProps = ({messenger}) => ({
  messenger
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchMessengerInfo }, dispatch);

export default connect(mapStateProps, mapDispatchToProps)(Chat);