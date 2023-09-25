'use client';

import dynamic from 'next/dynamic';
import { ReactQuillProps } from 'react-quill';

const ReactQuill = dynamic(() => import('react-quill'), {
   ssr: false,
   loading: () => <div>Loading</div>
});

export const formats = [
   'align',
   'background',
   'blockquote',
   'bold',
   'bullet',
   'code',
   'code-block',
   'color',
   'direction',
   'font',
   'formula',
   'header',
   'image',
   'indent',
   'italic',
   'link',
   'list',
   'script',
   'size',
   'strike',
   'table',
   'underline',
   'video'
];

export interface EditorProps extends ReactQuillProps {
   error?: boolean;
   simple?: boolean;
   helperText?: React.ReactNode;
}

export default function Editor({ helperText, ...rest }: EditorProps) {
   const modules = {
      history: {
         delay: 500,
         maxStack: 100,
         userOnly: true
      },
      syntax: false,
      clipboard: {
         matchVisual: false
      }
   };

   return (
      <div className="relative">
         <ReactQuill
            modules={modules}
            formats={formats}
            placeholder="Write something awesome..."
            {...rest}
         />
         {helperText && helperText}
      </div>
   );
}
