import React, { Component } from 'react';
import styles from './conversation-list-item.css';
import { FormControl } from 'react-bootstrap/lib';
// import FontAwesome from 'react-fontawesome';
import Status from './status';

class Conversation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openChat: false,
      convoText: ''
    }
  }

  render() {
    const { openChat, convoText } = this.state;
    const conversationClassName = `${styles.conversationContainer} ${openChat ? styles.active : ''}`;
    const headerClassName = `${styles.header} ${openChat ? styles.active : ''}`;
    const leftSideClassName = `${styles.leftSide} ${openChat ? styles.active : ''}`;

    return (
      <div className={conversationClassName}>
        <div className={headerClassName}>
          <div onClick={this.handleConversation} className={leftSideClassName}>
            <Status className={styles.status} status={'online'}/>
            <span className={styles.text}>User</span>
          </div>
          <div className={styles.rightSide}>

          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.conversation}>Conversation</div>
          <FormControl onKeyPress={this.handleKeyPress} onChange={this.handleOnChange} value={convoText} componentClass="textarea" className={styles.input} type="text" placeholder="Type a message..." />
        </div>
      </div>
    )
  }

  handleOnChange = (event) => {
    this.setState({ convoText: event.target.value || '' });
  };

  handleKeyPress = (event) => {
    if (event.charCode === 13) {
      this.setState({ convoText: '' });
    }
  };

  handleConversation = () => {
    this.setState({ openChat: !this.state.openChat })
  }
}

export default (Conversation);