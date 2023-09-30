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

export default function Upload({ helperText, file, className, ...other }: UploadProps) {
   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: { 'image/*': [] },
      onDrop: (acceptedFiles) => console.log(acceptedFiles),
      ...other
   });

   const files = acceptedFiles.map((file: FileWithPath) => (
      <li key={file.path} className="mt-2">
         {file.path} - {file.size} bytes
      </li>
   ));

   return (
      <section className={cn('container rounded-md border p-3 text-xs', className)}>
         <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {file && <Image src={file} alt="asdds" width={200} height={200} />}
            {!file && (
               <>
                  <CameraIcon className="h-6 w-6" />
                  <p>Drag drop some files here, or click to select files</p>
               </>
            )}
         </div>
         <aside>
            <ul>{files}</ul>
         </aside>
         {helperText}
      </section>
   );
}
