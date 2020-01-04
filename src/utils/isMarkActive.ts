import { Editor } from 'slate';

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  const isActive = marks ? marks[format] === true : false;
  
  return isActive;
};
