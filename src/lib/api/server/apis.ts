import { Product } from '@/lib/types';
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
