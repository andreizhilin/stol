import React, { KeyboardEvent, useCallback, useEffect, useId, useMemo, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import CheckList from '@editorjs/checklist';
import Link from '@editorjs/link';
import ImageTool from '@editorjs/image';

import './index.css';

type Props = {
  value?: string;

  onChange?: (value: string) => void;
  onReady?: () => void;
  onPressCtrlS?: () => void;
};

const EMPTY_EDITOR_BLOCK = { type: 'paragraph', data: { text: '' } };
const EMPTY_EDITOR_VALUE = {
  time: new Date().getTime(),
  blocks: [EMPTY_EDITOR_BLOCK],
  version: '2.24.3',
};

export function Editor({ value, onChange, onReady, onPressCtrlS }: Props) {
  const editorRef = useRef<EditorJS>();
  const id = useId();
  const content = useMemo(() => {
    const content = value ? JSON.parse(value) : EMPTY_EDITOR_VALUE;
    // Editor.js behaves weird with empty array as an initial value
    if (content?.blocks?.length === 0) {
      content.blocks.push(EMPTY_EDITOR_BLOCK);
    }

    return content;
  }, [value]);

  const handleChange = useCallback(async () => {
    const data = (await editorRef.current?.save()) as OutputData;
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

  const init = useCallback(() => {
    const editor = new EditorJS({
      holder: id,
      data: content,
      onReady: () => {
        editorRef.current = editor;
        onReady?.();
      },
      onChange: handleChange,
      autofocus: true,
      tools: {
        checkList: CheckList,
        link: Link,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: '/api/files',
            },
          },
        },
      },
    });
  }, [content, handleChange, id, onReady]);

  useEffect(() => {
    if (!editorRef.current) {
      init();
    }

    // TODO: Handle destroy error on navigate
    return () => {
      editorRef.current?.destroy();
      editorRef.current = undefined;
    };
  }, [init]);

  return <div onKeyDown={handleKeyDown} id={id} />;
}
