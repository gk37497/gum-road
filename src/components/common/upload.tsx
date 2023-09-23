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
}

import Image from 'next/image';

export default function Upload({ helperText, file, ...other }: UploadProps) {
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
    <section className="container rounded-md border p-3 text-xs">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {file && <Image src={file} alt="asdds" width={200} height={200} />}
        {!file && <p>Drag drop some files here, or click to select files</p>}
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
      {helperText}
    </section>
  );
}
