import { TAddProduct } from './types';

export const addProductDefaults: TAddProduct = {
  storeName: '',
  title: '',
  price: '',
  description: '',
  term: '',
  summary: '',
  additionalInformation: [
    {
      attribute: '',
      value: ''
    }
  ],
  options: [
    {
      price: '',
      duration: '3',
      type: 'month',
      enabled: false
    },
    {
      price: '',
      duration: '6',
      type: 'month',
      enabled: false
    },
    {
      price: '',
      duration: '9',
      type: 'month',
      enabled: false
    },
    {
      price: '',
      duration: '12',
      type: 'month',
      enabled: false
    }
  ]
};
