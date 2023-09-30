import {
   Affliate,
   Cards,
   Customer,
   MerchantProduct,
   MerchantProductsResponse,
   Payout,
   Product
} from '@/lib/types';
import { endpoints } from '../constants';
import { appServerFetch } from './server-fetcher';

export function getUserProducts() {
   return appServerFetch<{ products: Product[]; cards: Omit<Cards, 'members'> }>({
      endpoint: endpoints.product,
      cache: 'no-cache',
      type: 'token'
   });
}

export function getUserAffiliates() {
   return appServerFetch<{ affiliates: Omit<Affliate, 'email'>[]; cards: Omit<Cards, 'members'> }>({
      endpoint: endpoints['affliate-list-own'],
      type: 'token'
   });
}

export function getCustomerInfo() {
   return appServerFetch<Customer>({
      endpoint: endpoints.customer,
      type: 'token'
   });
}

export function getMerchantIdList() {
   return appServerFetch<{ list: string[] }>({
      endpoint: endpoints['merchant-list'],
      type: 'basic-auth'
   });
}

export function getUserAffiliateList() {
   return appServerFetch<{ affiliates: Affliate[]; cards: Omit<Cards, 'members'> }>({
      endpoint: endpoints['affliate-list'],
      type: 'token'
   });
}

export function getMerchantProducts(id: string) {
   return appServerFetch<MerchantProductsResponse>({
      endpoint: endpoints['merchant-product-list'] + '/' + id,
      type: 'basic-auth'
   });
}

export function getProductById(id: string) {
   return appServerFetch<{ product: MerchantProduct }>({
      endpoint: endpoints['product-get-by-id'] + '/' + id,
      type: 'basic-auth'
   });
}

export function getPayouts() {
   return appServerFetch<Payout>({
      endpoint: endpoints['payouts'],
      type: 'token'
   });
}
