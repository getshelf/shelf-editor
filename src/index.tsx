import React, { useCallback, useMemo, useState } from 'react';
import compose from 'lodash/fp/compose';
import { Editable, withReact, Slate } from 'slate-react';
import {hotkeys} from '~/plugins/hotkeys';
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

const hotkeysList = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
}

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

  const onKeyDown = useCallback(hotkeys(editor, hotkeysList), []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <HoverMenu />
      <Editable
        spellCheck
        autoFocus
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
      />
    </Slate>
  );
};

export { Element } from 'slate';