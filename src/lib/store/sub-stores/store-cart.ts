/* eslint-disable no-unused-vars */
import { MerchantProduct, Option } from '@/lib/types';
import { SliceType } from '..';

type State = {
   option?: Option;
   product?: MerchantProduct;
   affiliate?: string;
};

type Actions = {
   addProduct: (product: MerchantProduct, chosenOption: Option) => void;
   addAffiliate: (affiliate: string, chosenOption: Option) => void;
   removeAll: () => void;
};

export type CartSlice = State & Actions;

export const createCartSlice: SliceType<CartSlice> = (set) => ({
   addProduct: (product, option) => {
      set((state) => {
         state.product = product;
         state.option = option;
      });
   },

   addAffiliate: (affiliate, option) => {
      set((state) => {
         state.affiliate = affiliate;
         state.option = option;
      });
   },
   removeAll: () => {
      set((state) => {
         state.product = undefined;
         state.affiliate = undefined;
         state.option = undefined;
      });
   }
});
