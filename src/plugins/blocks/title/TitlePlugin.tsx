import React from 'react';
import { SlatePlugin } from '~/types/SlatePlugin';
import { Editor, Node, Transforms } from 'slate';

import styles from './TitlePlugin.css';

type TitleChangeHandler = (title: string) => void;

export const TitlePlugin: (onTitleChange: TitleChangeHandler) => SlatePlugin = (
  onTitleChange: TitleChangeHandler
) => {
  return {
    enhancement: (editor: Editor) => {
      const { onChange, normalizeNode } = editor;
      let prevText = '';

      editor.onChange = () => {
        const [node] = Editor.node(editor, [0]);
        const text = Node.string(node);

        if (prevText !== text) {
          onTitleChange(text);
          prevText = text;
        }

        return onChange();
      };


      editor.normalizeNode = ([node, path]) => {
        if (path.length === 0) {
          if (editor.children.length < 1) {
            const title = { type: 'title', children: [{ text: 'New note' }] };
            Transforms.insertNodes(editor, title, { at: path.concat(0) });
          }

          if (editor.children.length < 2) {
            const paragraph = { type: 'paragraph', children: [{ text: '' }] };
            Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
          }

          for (const [child, childPath] of Node.children(editor, path)) {
            const type = childPath[0] === 0 ? 'title' : child.type;

            if (child.type !== type) {
              Transforms.setNodes(editor, { type }, { at: childPath });
            }
          }
        }

        if (path[0] !== 0 && node.type === 'title') {
          Transforms.setNodes(editor, { type: 'paragraph' });
        }

        return normalizeNode([node, path]);
      }

      return editor;
    },
    renderElement: props => {
      const { attributes, children, element } = props;

      if (element.type === 'title') {
        return (
          <div className={styles.title} {...attributes}>
            {children}
          </div>
        );
      }

      return;
    }
  };
};
