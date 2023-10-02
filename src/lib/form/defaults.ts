import { TAddAffliate, TAddProduct } from './types';

export const addProductDefaults: TAddProduct = {
   storeName: '',
   title: '',
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
         duration: '1',
         type: 'month',
         enabled: false
      },
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

export const addAffliateDefaults: TAddAffliate = {
   email: '',
   list: [
      {
         productId: '',
         enabled: false,
         commission: 0
      }
   ]
};
