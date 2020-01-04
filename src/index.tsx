import React, { useCallback, useMemo, useState } from 'react';
import compose from 'lodash/fp/compose';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { HoverMenu } from '~/components/HoverMenu/HoverMenu';
import { Element, Leaf } from '~/plugins/RichTextEditor';
import { withChecklists } from '~/plugins/withChecklists';
import { withTitle } from '~/plugins/withTitle';
import { withLayout } from '~/plugins/withLayout';
import { withShortcuts } from '~/plugins/withShortcuts';

const noop = () => {};

type Props = {
  onTitleChange?(title: string): void;
  onChange(value): void;
  value: any;
};

export const ShelfEditor = (props: Props) => {
  const { 
    value,
    onChange,
    onTitleChange = noop
  } = props;

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const editor = useMemo(
    () =>
      compose(
        withChecklists,
        withShortcuts,
        withTitle(onTitleChange),
        withLayout,
        withReact,
        withHistory,
        createEditor
      )(),
    []
  );

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <HoverMenu />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
      />
    </Slate>
  );
};

export { Element } from 'slate';