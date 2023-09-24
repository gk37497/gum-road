import { Affliate, MerchantProduct, MerchantProductsResponse, Product } from '@/lib/types';
import { endpoints } from '../constants';
import { appServerFetch } from './server-fetcher';

export function getUserProducts() {
  return appServerFetch<{ product: Product[] }>({
    endpoint: endpoints.product,
    cache: 'no-cache',
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
  return appServerFetch<{ affiliates: Affliate[] }>({
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
    type: 'basic-auth',
    cache: 'no-cache'
  });
}
