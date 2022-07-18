import { createReactEditorJS } from 'react-editor-js';

const ReactEditorJS = createReactEditorJS();

export function Notepad() {
  return (
    <div data-test='notepad' className='flex justify-center p-5'>
      <div
        className={`
          max-w-screen-md
          w-full
          shadow
          bg-white
          px-5
          py-5
          
          sm:px-20
          
          md:px-0
        `}
      >
        <ReactEditorJS />
      </div>
    </div>
  );
}
