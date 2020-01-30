import React, {useRef, useEffect, useCallback} from 'react';
import { createPortal } from 'react-dom';
import { useSlate, ReactEditor } from 'slate-react';
import { Range, Editor } from 'slate';
import { RichTextEditor } from '~/plugins/RichTextEditor';
import { isMarkActive } from '~/utils/isMarkActive';
import { isBlockActive } from '~/utils/isBlockActive';

import styles from './HoverMenu.css';

type HoverButtonProps = {
  type: string;
  icon: string;
  isInline?: boolean;
}

export const HoverMenu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();

  useEffect(() => {
    const el: HTMLDivElement | null = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection
      || !ReactEditor.isFocused(editor) 
      || Range.isCollapsed(selection) || Editor.string(editor, selection) === ''
    ) { 
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) {
      return;
    }

    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
  });

  return (
    <Portal>
      <div className={styles.root} ref={ref}>
        <HoverButton type="bold" icon="b" isInline />
        <HoverButton type="italic" icon="i" isInline />
        <HoverButton type="underline" icon="u" isInline />
        <HoverButton type="bulleted-list" icon="*" />
        <HoverButton type="numbered-list" icon="1" />
        <HoverButton type="check-list-item" icon="C" />
      </div>
    </Portal>
  );
};

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

const HoverButton = (props: HoverButtonProps) => {
  const { type, icon, isInline } = props;
  const editor = useSlate();
  const isActive = isInline 
    ? isMarkActive(editor, type)
    : isBlockActive(editor, type);

  const handleMouseDown = useCallback((event) => {
    event.preventDefault();
    // if (isInline) {
    //   RichTextEditor.toggleMark(editor, type)
    // } else {
    //   RichTextEditor.toggleBlock(editor, type);
    // }
  }, [type, isInline])

  return (
    <button 
      style={{fontWeight: isActive ? 'bold' : 'normal'}}
      onMouseDown={handleMouseDown}>
        {icon}
    </button>
  );
}
