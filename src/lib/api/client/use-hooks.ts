import {
   APIResponse,
   AddAffiliatePayload,
   AddProductPayload,
   AddProductResponse,
   BuyProductPayload,
   BuyProductResponse,
   Customer,
   UploadResponse
} from '../../types';
import { endpoints } from '../constants';
import { useAppFetch, useAppMutation } from './client-fetcher';

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

export function useAddAffliate() {
   return useAppMutation<any, any, AddAffiliatePayload>({
      endpoint: endpoints.affiliate,
      queryKey: 'affiliate',
      type: 'token'
   });
}

export function useCreateInvoiceByProduct() {
   return useAppMutation<
      { qpay: BuyProductResponse; transaction: { id: string; uid: string }; expires_in: number },
      any,
      BuyProductPayload
   >({
      endpoint: endpoints['checkout-product'],
      queryKey: 'checkout-product',
      type: 'basic-auth'
   });
}

export function useCreateInvoiceByAffiliate() {
   return useAppMutation<
      { qpay: BuyProductResponse; transaction: { id: string; uid: string }; expires_in: number },
      any,
      BuyProductPayload
   >({
      endpoint: endpoints['checkout-affliate'],
      queryKey: 'checkout-product',
      type: 'basic-auth'
   });
}

export function useCheckInvoiceIsPaid({ invoiceId }: { invoiceId?: string }) {
   return useAppFetch<APIResponse<{ isPaid: boolean }>>(
      {
         endpoint: endpoints['check-invoice'] + `/${invoiceId}`,
         queryKey: `check-invoice/${invoiceId}`,
         type: 'basic-auth'
      },
      {
         enabled: !!invoiceId,
         refetchInterval: 5000
      }
   );
}

export function useGetCustomerInfo() {
   return useAppFetch<Customer>({
      endpoint: endpoints['customer'],
      queryKey: 'customer-info',
      type: 'token'
   });
}
