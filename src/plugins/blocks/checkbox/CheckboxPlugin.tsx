import React from 'react';
import { SlatePlugin } from '~/types/SlatePlugin';
import { useEditor, useReadOnly, ReactEditor } from 'slate-react';
import { Transforms, Editor, Range, Point } from 'slate';
import { toggleBlock } from '~/utils/toggleBlock';

import styles from './CheckboxPlugin.css';

const ELEMENT_TYPE = 'checklist-item';

export const CheckboxPlugin: () => SlatePlugin = () => {
  return {
    hotkeys: {
      'mod+shift+c': editor => toggleBlock(editor, ELEMENT_TYPE),
      'mod+enter': editor => {
        const [match] = Editor.nodes(editor, {
          match: n => n.type === ELEMENT_TYPE
        });
        
        Transforms.setNodes(editor, {
          checked: !match[0].checked
        })
      }
    },
    enhancement: (editor: Editor) => {
      const { deleteBackward } = editor;

      editor.deleteBackward = (...args) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [match] = Editor.nodes(editor, {
            match: n => n.type === ELEMENT_TYPE
          });

          if (match) {
            const [, path] = match;
            const start = Editor.start(editor, path);

            if (Point.equals(selection.anchor, start)) {
              Transforms.setNodes(
                editor,
                { type: 'paragraph' },
                { match: n => n.type === ELEMENT_TYPE }
              );
              return;
            }
          }
        }

        deleteBackward(...args);
      };

      return editor;
    },
    renderElement: props => {
      const editor = useEditor();
      const readOnly = useReadOnly();
      const { attributes, children, element } = props;

      if (element.type === ELEMENT_TYPE) {
        const { checked } = element;

        return (
          <div {...attributes}>
            <span contentEditable={false} className={styles.wrapper}>
              <input
                className={styles.input}
                type="checkbox"
                checked={checked}
                onChange={event => {
                  const path = ReactEditor.findPath(editor, element);
                  Transforms.setNodes(
                    editor,
                    { checked: event.target.checked },
                    { at: path }
                  );
                }}
              />
            </span>
            <span contentEditable={!readOnly} className={checked ? styles.isChecked : ''} suppressContentEditableWarning>
              {children}
            </span>
          </div>
        );
      }

      return;
    }
  }
}