import { Editor, Transforms } from 'slate';
import { isBlockActive } from '~/utils/isBlockActive';

export const toggleBlock = (editor: Editor, format) => {
  const isActive = isBlockActive(editor, format);

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : format
  });
};
