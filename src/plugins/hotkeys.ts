import {Editor} from 'slate';
import isHotkey from 'is-hotkey';
import {toggleMark} from '~/utils/toggleMark';

export const hotkeys = (editor: Editor, hotkeysList) => (event) => {
  for (const hotkey in hotkeysList) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      const format = hotkeysList[hotkey];
      toggleMark(editor, format);
    }
  }
}