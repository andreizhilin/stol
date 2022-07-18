import React, { KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import CheckList from '@editorjs/checklist';
import Link from '@editorjs/link';
import ImageTool from '@editorjs/image';
import Strikethrough from 'editorjs-strikethrough';

type Props = {
  value?: string;

  onChange?: (value: string) => void;
  onReady?: () => void;
  onPressCtrlS?: () => void;
};

const EDITOR_ID = 'editor';
const EDITOR_TOOLS = {
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
  strikethrough: {
    class: Strikethrough,
    shortcut: 'CTRL+SHIFT+X',
  },
};

export function Editor({ value, onChange, onReady, onPressCtrlS }: Props) {
  const editorRef = useRef<EditorJS>();

  const handleChange = useCallback(async () => {
    const data = await editorRef.current?.save();
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
      holder: EDITOR_ID,
      data: value ? JSON.parse(value) : undefined,
      onReady: () => {
        editorRef.current = editor;
        onReady?.();
      },
      onChange: handleChange,
      tools: EDITOR_TOOLS,
    });
  }, [value, handleChange, onReady]);

  useEffect(() => {
    if (!editorRef.current) {
      init();
    }

    return () => {
      editorRef.current?.isReady
        .then(() => editorRef.current?.destroy?.())
        .then(() => {
          editorRef.current = undefined;
        });
    };
  }, [init]);

  return <div onKeyDown={handleKeyDown} id='editor' />;
}
