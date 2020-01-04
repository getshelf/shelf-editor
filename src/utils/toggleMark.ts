import { Editor, Transforms, Text } from 'slate';
import {isMarkActive} from '~/utils/isMarkActive';

export const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: n => Text.isText(n), split: true }
  );
};
