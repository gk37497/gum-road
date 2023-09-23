import { AddProductPayload, AddProductResponse, UploadResponse } from '../../types';
import { endpoints } from '../constants';
import { useAppMutation } from './client-fetcher';

export function useUploadImage() {
  return useAppMutation<UploadResponse, any, FormData>({
    endpoint: endpoints.upload,
    queryKey: 'upload',
    type: 'token',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function useAddProduct() {
  return useAppMutation<AddProductResponse, any, AddProductPayload>({
    endpoint: endpoints.product,
    queryKey: 'product',
    type: 'token'
  });
}
