'use client';

import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { FileWithPath } from 'react-dropzone';

export interface UploadProps extends DropzoneOptions {
   error?: boolean;
   thumbnail?: boolean;
   placeholder?: React.ReactNode;
   helperText?: React.ReactNode;
   file?: string;
   onDelete?: VoidFunction;
   onUpload?: VoidFunction;
   onRemove?: () => void;
   onRemoveAll?: VoidFunction;
   className?: string;
}

import { cn } from '@/lib/utils';
import { CameraIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useState } from 'react';

export default function Upload({ helperText, file, className, ...other }: UploadProps) {
   const [dragEntered, setDragEntered] = useState(false);
   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: { 'image/*': [] },
      onDragEnter: () => setDragEntered(true),
      onDragLeave: () => setDragEntered(false),
      ...other
   });

   const files = acceptedFiles.map((file: FileWithPath) => (
      <li key={file.path} className="mt-2">
         {file.path} - {file.size} bytes
      </li>
   ));

   return (
      <section
         className={cn(
            'container cursor-pointer rounded-md border p-3 text-xs',
            className,
            dragEntered ? 'border-blue-500' : 'border-gray-300',
            file && 'border-brand'
         )}
      >
         <div {...getRootProps({ className: 'dropzone min-h-[150px]' })}>
            <input {...getInputProps()} />
            <div className="relative flex h-32 w-full flex-col items-center justify-around text-center">
               {file && <Image src={file} alt="asdds" fill />}
               {!file && (
                  <>
                     <CameraIcon className="h-6 w-6" />
                     <p>Drag drop some files here, or click to select files</p>
                  </>
               )}
            </div>
         </div>
         <aside>
            <ul>{files}</ul>
         </aside>
         {helperText}
      </section>
   );
}
