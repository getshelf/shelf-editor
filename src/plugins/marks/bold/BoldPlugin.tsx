import React from 'react';
import { toggleMark } from '~/utils/toggleMark';
import { SlatePlugin } from '~/types/SlatePlugin';

export const BoldPlugin: () => SlatePlugin = () => {
  return {
    hotkeys: {
      'mod+b': editor => toggleMark(editor, 'bold')
    },
    renderLeaf: props => {
      let { attributes, children, leaf } = props;
      if (leaf.bold) {
        return <strong>{children}</strong>;
      }

      return;
    }
  };
};
