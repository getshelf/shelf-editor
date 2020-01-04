import { Editor, Node } from 'slate';

type TitleChangeHandler = (title: string) => void

export const withTitle = (onTitleChange: TitleChangeHandler) =>
  (editor: Editor) => {
    const { onChange } = editor;
    // const [node] = Editor.node(editor, [0])
    let prevText = '';
    
    editor.onChange = () => {
      const [node] = Editor.node(editor, [0])
      const text = Node.string(node);
      if (prevText !== text) {
        onTitleChange(text);
        prevText = text;
      }
      return onChange();
    }
    return editor;
  }
