/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
import 'monaco-editor/esm/vs/editor/editor.worker.js';
import 'monaco-editor/esm/vs/language/typescript/ts.worker';
import 'monaco-editor/esm/vs/language/json/json.worker';
import 'monaco-editor/esm/vs/language/html/html.worker';
import 'monaco-editor/esm/vs/basic-languages/apex/apex.contribution';

import './index.less';

interface IProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  value?: string;
  language?: string | any;
  onBlur?: (editor: any, e: any) => void;
  placeholder?: string;
}

const Editor = (props: IProps) => {
  const { className = '', width, height, value, language, onBlur } = props;

  return (
    <MonacoEditor
      className={className}
      width={width || '100%'}
      height={height || '600'}
      language={language || 'typescript'}
      theme="vs-light"
      value={value}
      options={{
        selectOnLineNumbers: true,
        lineNumbersMinChars: 1,
        contextmenu: false,
        cursorStyle: 'line',
        readOnly: true,
        showUnused: false,
        showDeprecated: false,
        minimap: {
          enabled: false,
        },
        mouseStyle: 'default',
        quickSuggestions: false,
        renderLineHighlight: 'none',
        wordWrap: 'on',
      }}
    />
  );
};

export default Editor;
