'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import AXInputLabel from '../ax-input-label/ax-input-label';
import './ax-input-rich-text.css';

const ReactQuill = dynamic(
  () => import('react-quill-new'),
  { ssr: false }
);

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
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'link',
  'image',
];

export const AXInputRichText = ({
  propsLabel,
  propsValue = '',
  propsPlaceholder = 'Start typing...',
  propsMandatory = false,
  propsHasError = false,
  propsErrorMessage = '',
  propsClassName = '',
  propsOnChange,
  propsReadOnly = false,
}: InputRichTextProps) => {
  return (
    <div className={`ax-rich-text ${propsClassName}`.trim()}>
      {propsLabel && (
        <AXInputLabel propsLabel={propsLabel} propsMandatory={propsMandatory} />
      )}

      <div
        className={`ax-rich-text-editor ${
          propsHasError ? 'ax-rich-text-error-border' : ''
        }`.trim()}
      >
        <ReactQuill
          theme="snow"
          value={propsValue}
          onChange={propsOnChange}
          placeholder={propsPlaceholder}
          modules={modules}
          formats={formats}
          readOnly={propsReadOnly}
        />
      </div>

      {propsHasError && propsErrorMessage && (
        <span className="ax-text-xs ax-font-semibold ax-text-red ax-mt-1">
          {propsErrorMessage}
        </span>
      )}
    </div>
  );
};

export default AXInputRichText;
