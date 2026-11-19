'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import './ax-input-rich-text.css';
import 'react-quill/dist/quill.snow.css';
import AXInputLabel from '../ax-input-label/ax-input-label';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export interface InputRichTextProps {
  propsLabel?: string;
  propsValue?: string;
  propsPlaceholder?: string;
  propsMandatory?: boolean;
  propsHasError?: boolean;
  propsErrorMessage?: string;
  propsClassName?: string;
  propsOnChange?: (value: string) => void;
  propsReadOnly?: boolean;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ header: [1, 2, 3, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
};

export const AXInputRichText = ({
  propsLabel,
  propsValue = '',
  propsPlaceholder = 'Start typing...',
  propsMandatory = false,
  propsReadOnly = false,
  propsHasError = false,
  propsErrorMessage = '',
  propsClassName = '',
  propsOnChange,
}: InputRichTextProps) => {
  return (
    <div
      className={`ax-input-rich-text ${propsReadOnly ? 'ax-input-rich-text-readonly' : ''} ${propsHasError ? 'ax-input-rich-text-error' : ''} ${propsClassName}`.trim()}
    >
      {propsLabel && (
        <AXInputLabel propsLabel={propsLabel} propsMandatory={propsMandatory} />
      )}

      <ReactQuill
        theme="snow"
        value={propsValue}
        onChange={propsOnChange}
        placeholder={propsPlaceholder}
        modules={modules}
        readOnly={propsReadOnly}
      />

      {propsHasError && propsErrorMessage && (
        <span className="ax-text-xs ax-font-semibold ax-text-red ax-mt-1">
          {propsErrorMessage}
        </span>
      )}
    </div>
  );
};

export default AXInputRichText;
