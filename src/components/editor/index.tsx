import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
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

const EMPTY_EDITOR_VALUE = {
  time: 1654922109475,
  blocks: [{ id: 'blQR-e8Du6', type: 'paragraph', data: { text: '' } }],
  version: '2.24.3',
};

export function Editor({ value, onChange, onPressCtrlS }: Props) {
  const [isReady, setIsReady] = useState(false);
  const editorCore = useRef<EditorJS>();

  const handleInitialize = useCallback((instance: EditorJS) => {
    editorCore.current = instance;
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
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

  useEffect(() => {
    if (isReady) {
      editorCore.current?.render(value ? JSON.parse(value) : EMPTY_EDITOR_VALUE);
    }
  }, [value, isReady]);

  return (
    <div onKeyDown={handleKeyDown}>
      <ReactEditorJS
        tools={{ checkList: CheckList, link: Link }}
        onInitialize={handleInitialize}
        onReady={handleReady}
        onChange={handleChange}
      />
    </div>
  );
}
