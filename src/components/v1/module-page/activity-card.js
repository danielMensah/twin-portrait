import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Collapse } from 'react-bootstrap/lib';
import { connect } from 'react-redux';
import styles from './activity-card.css';
import getHeader from './activity-card-header';
import CommentSection from './comment-section';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { uniqueId } from 'lodash';
import moment from 'moment';

class Announcement extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    module: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    comments: PropTypes.array,
  };

  constructor(prop) {
    super(prop);
    this.state = {
      editorState: EditorState.createEmpty(),
      commentText: '',
      open: false,
      commentList: null
    };
    this.onChange = (editorState) => {
      this.setState({editorState});
      this.setState({commentText: this.getContent(editorState.getCurrentContent())});
    }
  }

  componentWillMount() {
    this.setState({ commentList: this.props.comments})
  }

  render() {
    const { editorState, commentText, commentList } = this.state;
    const { content, date, type, author, module } = this.props;

    const header = (
      <span className={styles.activityHeader}>
        <a href="#" className={styles.activityAuthor}>{author} </a>
        {getHeader(type)}
        <a href="#" className={styles.activityAuthor}> {module}</a> • {date}
      </span>
    );

    const footer = (
      <div onClick={() => this.setState({ open: !this.state.open })}
           className={styles.commentExpander}>
        {commentList.length} comments
      </div>
    );

    return (
      <div className={styles.container}>
        <Panel footer={footer} header={header} className={styles.activityContainer}>
          {content}
        </Panel>
        <Collapse className={styles.collapse} in={this.state.open}>
          <Panel className={styles.commentList}>
            <div className={styles.editor}>
              {commentText.length ? null : <span className={styles.commentLabel}>Write your comment...</span>}
              <Editor
                editorState={editorState}
                handleReturn={this.handleReturn}
                onChange={this.onChange} />
            </div>
            {commentList.map(comment => {
              return <CommentSection {...comment} key={uniqueId('hello')} />
            })}
          </Panel>
        </Collapse>
      </div>
    )
  }

  handleReturn = () => {
    const { commentList, commentText } = this.state;

    if (commentText.replace(/\s/g, '').length) {
      this.setState({ editorState: EditorState.createEmpty() });
      var _comments = commentList.map((comment) => {
        return comment
      });

      _comments.push({
        author: "Daniel",
        comment: commentText,
        date: moment().fromNow()
      });

      this.setState({ commentList: _comments, commentText: ''});
    }
    return true;
  };

  getContent(state) {
    const html = stateToHTML(state);
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
}

export default connect()(Announcement);