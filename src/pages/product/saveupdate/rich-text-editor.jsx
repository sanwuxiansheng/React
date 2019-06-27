import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {ContentState, EditorState} from "draft-js";
import htmlToDraft from "html-to-draftjs";
// import draftToHtml from 'draftjs-to-html';
export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string.isRequired
  };
  constructor(props) {
    // 不传props函数内部就不能使用props，传了才能使用
    super(props)
    const blocksFromHtml = htmlToDraft(this.props.detail);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    this.state = {
      editorState
    };
  };
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const {editorState} = this.state;
    return <div>
      <Editor
        editorState={editorState}
        /*toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"*/
        editorClassName="editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    </div>;
  }
}