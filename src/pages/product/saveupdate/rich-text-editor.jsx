import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
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