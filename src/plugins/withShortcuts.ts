import { Editor, Range, Transforms, Point } from "slate";

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '*[]': 'check-list-item'
}

export const withShortcuts = (editor: Editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text: string) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(
          editor,
          { type },
          { match: n => Editor.isBlock(editor, n) }
        );

        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }

          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text);
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);
        console.log(path);
        if (block.type !== 'paragraph' && Point.equals(selection.anchor, start)) {
          let type = block.type;

          if (path.length <= 2) {
            Transforms.setNodes(editor, { type: 'paragraph' });
            type = 'paragraph'
          }

          if (block.type === 'list-item') {
            Transforms.liftNodes(editor, {
              match: n => n.type === type
            });
          }
        // }
          return
        }
      }
      deleteBackward(...args);

    }

  }

  return editor;
}