import React from 'react';
import { toggleBlock } from '~/utils/toggleBlock';
import { SlatePlugin } from '~/types/SlatePlugin';

import './QuotePlugin.css';

export const QuotePlugin: () => SlatePlugin = () => {
  return {
    hotkeys: {
      'mod+.': editor => toggleBlock(editor, 'block-quote')
    },
    renderElement: props => {
      const { attributes, children, element } = props;

      if (element.type === 'block-quote') {
        return <blockquote {...attributes}>{children}</blockquote>;
      }

      return;
    }
  };
};
