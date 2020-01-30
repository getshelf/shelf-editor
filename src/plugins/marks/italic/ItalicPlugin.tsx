import React from 'react';
import { toggleMark } from '~/utils/toggleMark';
import { SlatePlugin } from '~/types/SlatePlugin';

export const ItalicPlugin: () => SlatePlugin = () => {
  return {
    hotkeys: {
      'mod+i': editor => toggleMark(editor, 'italic')
    },
    renderLeaf: props => {
      let { attributes, children, leaf } = props;
      if (leaf.italic) {
        return <em>{children}</em>;
      }

      return;
    }
  };
};
