import React, { useCallback, useMemo, useState } from 'react';
import compose from 'lodash/fp/compose';
import { Editable, withReact, Slate } from 'slate-react';
import { hotkeys } from '~/plugins/hotkeys';
import isHotkey from 'is-hotkey';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { HoverMenu } from '~/components/HoverMenu/HoverMenu';
import { withTitle } from '~/plugins/withTitle';
import { withLayout } from '~/plugins/withLayout';
import { withShortcuts } from '~/plugins/withShortcuts';

import { BoldPlugin } from '~/plugins/marks/bold';
import { ItalicPlugin } from '~/plugins/marks/italic';
import { QuotePlugin } from '~/plugins/blocks/quote';
import { IndentPlugin } from '~/plugins/blocks/indent';
import { CheckboxPlugin } from '~/plugins/blocks/checkbox';
import { TitlePlugin } from '~/plugins/blocks/title';

import { SlatePlugin } from './types/SlatePlugin';

const noop = () => {};

type Props = {
  onTitleChange?(title: string): void;
  onChange(value): void;
  value: any;
};

export const ShelfEditor = (props: Props) => {
  const { value, onChange, onTitleChange = noop } = props;

  const plugins = useMemo(() => {
    return [
      ItalicPlugin(),
      BoldPlugin(),
      QuotePlugin(),
      IndentPlugin(),
      CheckboxPlugin(),
      TitlePlugin(onTitleChange),
    ];
  }, []);

  const renderLeaf = useCallback(props => {
    let { children, attributes } = props;
    plugins.forEach(plugin => {
      if (plugin.renderLeaf) {
        children = plugin.renderLeaf({ ...props, children }) || children;
      }
    });

    return <span {...attributes}>{children}</span>;
  }, []);

  const renderElement = useCallback(props => {
    let element;
    plugins.forEach(plugin => {
      if (plugin.renderElement) {
        element = plugin.renderElement(props) || element;
      }
    });

    if (!element) {
      element = <p {...props.attributes}>{props.children}</p>;
    }

    return element;
  }, []);

  const editor = useMemo(
    () =>
      compose(
        ...plugins
          .map((plugin: SlatePlugin) => plugin.enhancement)
          .filter(Boolean),
        withReact,
        withHistory,
        createEditor
      )(),
    []
  );

  const onKeyDown = useCallback(ev => {
    plugins.forEach(plugin => {
      if (plugin.hotkeys) {
        const hotkeys = Object.keys(plugin.hotkeys);

        for (const hotkey of hotkeys) {
          if (isHotkey(hotkey, ev)) {
            ev.preventDefault();
            plugin.hotkeys[hotkey](editor);
          }
        }
      }
    });
  }, []);

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
