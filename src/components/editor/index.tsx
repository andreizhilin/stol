import { KeyboardEvent, useCallback, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { createReactEditorJS } from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import Link from '@editorjs/link';

const ReactEditorJS = createReactEditorJS();

type Props = {
  value?: string;

  onChange?: (value: string) => void;
  onPressCtrlS?: () => void;
};

export function Editor({ value, onChange, onPressCtrlS }: Props) {
  const editorCore = useRef<EditorJS>();

  const handleInitialize = useCallback((instance: EditorJS) => {
    editorCore.current = instance;
  }, []);

  const handleChange = useCallback(() => {
    editorCore.current?.save().then((data: OutputData) => {
      onChange?.(JSON.stringify(data));
    });
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'ы')) {
        e.preventDefault();
        onPressCtrlS?.();
      }
    },
    [onPressCtrlS],
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <ReactEditorJS
        tools={{ checkList: CheckList, link: Link }}
        defaultValue={value ? JSON.parse(value) : undefined}
        onInitialize={handleInitialize}
        onChange={handleChange}
      />
    </div>
  );
}
