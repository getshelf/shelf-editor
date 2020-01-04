import React from 'react';
import { useEditor, useReadOnly, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';

export const CheckListItem = props => {
  const { attributes, children, element } = props;
  const editor = useEditor();
  const readOnly = useReadOnly();
  const { checked } = element;

  return (
    <div {...attributes} className=''>
      <span contentEditable={false} className=''>
        <input
          type="checkbox"
          checked={checked}
          onChange={event => {
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(
              editor,
              { checked: event.target.checked },
              { at: path }
            );
          }}
        />
      </span>
      <span contentEditable={!readOnly} suppressContentEditableWarning className=''>
        {children}
      </span>
    </div>
  );
};
