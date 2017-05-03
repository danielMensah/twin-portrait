import React, { Component } from 'react';
import styles from './conversation.css';
import ConversationListItem from './conversation-list-item'
import { uniqueId } from 'lodash';

class Conversation extends Component {

  render() {
    const openChat = [1,2];

    return (
      <div className={styles.conversationList}>
        {openChat.map((convo) => {
          return <ConversationListItem active={convo.open} key={uniqueId('test')} />
        })}
      </div>
    )
  }
}

export default (Conversation);