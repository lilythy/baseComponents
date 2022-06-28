/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/base16-light.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/properties/properties.js';
import 'codemirror/mode/sql/sql';
// ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint.js'; // 错误校验
// import 'codemirror/addon/lint/javascript-lint.js';  // js错误校验
import 'codemirror/addon/selection/active-line.js'; // 当前行高亮
// 折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/display/placeholder.js';
import './index.less';

interface IProps {
  className?: string;
  value?: string;
  mode?: string | any;
  onChange?: (_value: any) => void;
  onBlur?: (editor: any, e: any) => void;
  placeholder?: string;
}

const Editor = (props: IProps) => {
  const { className, value, mode, onChange, onBlur, placeholder } = props;

  return (
    <CodeMirror
      className={className}
      value={value}
      options={{
        // mode: { name: "javascript", json: true },
        mode,
        theme: 'base16-light',
        autofocus: false, // 自动获取焦点
        styleActiveLine: true, // 光标代码高亮
        lineNumbers: true, // 显示行号
        smartIndent: true, // 自动缩进
        // start-设置支持代码折叠
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        lint: false,
        indentUnit: 2,
        // extraKeys: {
        //   Ctrl: 'autocomplete',
        //   // 'Ctrl-S': (editor) => {
        //   //   this.codeSave(editor);
        //   // },
        //   'Ctrl-Z': (editor) => {
        //     editor.undo();
        //   }, // undo
        //   F8(editor) {
        //     editor.redo();
        //   }, // Redo
        // },
        matchBrackets: true, // 括号匹配，光标旁边的括号都高亮显示
        autoCloseBrackets: true, // 键入时将自动关闭()[]{}''""
        // extraKeys: {                    // 配置按键
        //   "Alt": "autocomplete",      // 按下`alt`时出现代码提示
        // },
        placeholder: placeholder || '请输入',
      }}
      // onBeforeChange={(editor: any, data: any, _value: any, next: any) => {
      //   console.log("onBeforeChange--", data )
      // }}
      // onChange={(editor: any, data: any, _value: any) => {
      //   // editor.blur();
      //   onChange && onChange(_value);
      // }}
      onBlur={(editor: any) => {
        const _value = editor.valueOf().getValue();
        onChange && onChange(_value);
      }}
    />
  );
};

export default Editor;
