import React from 'react';
import { Editor, Transforms, Text, Range, Point } from 'slate';
import { toggleMark } from '~/utils/toggleMark';
import { toggleBlock } from '~/utils/toggleBlock';

import { CheckListItem } from '~/components/elements/CheckListItem';

const LIST_TYPES = ['numbered-list', 'bulleted-list', 'checklist'];

export const RichTextEditor = {
  toggleMark: toggleMark,

  // toggleBlock: toggleBlock(LIST_TYPES)
};

export const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'title':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'check-list-item':
      return <CheckListItem {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
