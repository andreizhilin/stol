import { KeyboardEvent, useCallback, useMemo, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import CheckList from '@editorjs/checklist';
import Link from '@editorjs/link';

const ReactEditorJS = createReactEditorJS();

type Props = {
  value?: string;

  onChange?: (value: string) => void;
  onReady?: () => void;
  onPressCtrlS?: () => void;
};

const EMPTY_EDITOR_BLOCK = { id: 'blQR-e8Du6', type: 'paragraph', data: { text: '' } };
const EMPTY_EDITOR_VALUE = {
  time: new Date().getTime(),
  blocks: [EMPTY_EDITOR_BLOCK],
  version: '2.24.3',
};

export function Editor({ value, onChange, onReady, onPressCtrlS }: Props) {
  const editorCore = useRef<EditorJS>();
  const content = useMemo(() => {
    const content = value ? JSON.parse(value) : EMPTY_EDITOR_VALUE;
    // Editor.js behaves weird with empty array as an initial value
    if (content?.blocks?.length === 0) {
      content.blocks.push(EMPTY_EDITOR_BLOCK);
    }

    return content;
  }, [value]);

  const handleInitialize = useCallback((instance: EditorJS) => {
    editorCore.current = instance;
  }, []);

  const handleReady = useCallback(() => {
    onReady?.();
  }, [onReady]);

  const handleChange = useCallback(async () => {
    const data = (await editorCore.current?.save()) as OutputData;
    onChange?.(JSON.stringify(data));
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'ы' || e.key === 'S' || e.key === 'Ы')) {
        e.preventDefault();
        onPressCtrlS?.();
      }
    },
    [onPressCtrlS],
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <ReactEditorJS
        defaultValue={content}
        tools={{ checkList: CheckList, link: Link }}
        onInitialize={handleInitialize}
        onReady={handleReady}
        onChange={handleChange}
      />
    </div>
  );
}
