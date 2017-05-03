import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './comment-section.css';

class CommentSection extends Component {

  static propTypes = {
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };

  render() {
    const { comment, date, author } = this.props;

    return (
      <div className={styles.comment}>
        <div className={styles.commentText}>
          {author}
          <span>{comment}</span>
        </div>
        <div className={styles.date}>{date ? date : `change`}</div>
      </div>
    )
  }
}

export default (CommentSection);