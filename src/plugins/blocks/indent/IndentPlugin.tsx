import React from 'react';
import { SlatePlugin } from '~/types/SlatePlugin';
import { Transforms } from 'slate';
import styles from './IndentPlugin.css';

export const IndentPlugin: () => SlatePlugin = () => {
  return {
    hotkeys: {
      'Tab': editor => {
        Transforms.wrapNodes(editor, { type: 'indent', children: []});
      },
      'Shift+Tab': editor => {
        Transforms.unwrapNodes(editor, {
          match: n => n.type === 'indent',
          split: true
        })
      }
    },
    renderElement: props => {
      const { attributes, children, element } = props;

      if (element.type === 'indent') {
        return <div className={styles.indent} {...attributes}>{children}</div>
      }

      return;
    }
  }
}