import { createReactEditorJS } from 'react-editor-js';

const ReactEditorJS = createReactEditorJS();

export function Notepad() {
  return (
    <div data-test='notepad'>
      <ReactEditorJS />
    </div>
  );
}
