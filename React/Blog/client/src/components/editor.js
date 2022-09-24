import { useEffect, useState } from "react";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function MyEditor({ getValue, editorContent }) {
  // Default editor state
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // console.log(editorContent);

  // Setting the editor state
  useEffect(() => {
    const contentBlocks = convertFromHTML(editorContent);
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    setEditorState(EditorState.createWithContent(contentState));
  }, []);

  // Updating editor content
  const updateTextDescription = async (state) => {
    setEditorState(state);

    const data = convertToRaw(editorState.getCurrentContent());
    getValue(data);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={updateTextDescription}
      />

      {/* <div>{editorData}</div> */}
    </div>
  );
}
