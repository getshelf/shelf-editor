import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { Editor } from 'slate';

export type SlatePlugin = {
  enhancement?: (editor: Editor) => Editor;
  hotkeys?: {
    [hotkey: string]: (editor: Editor) => void;
  };
  renderElement?: (props: RenderElementProps) => JSX.Element | undefined;
  renderLeaf?: (props: RenderLeafProps) => JSX.Element | undefined;
};
