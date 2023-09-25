import { MerchantProduct, Option } from '@/lib/types';
import { SliceType } from '..';

type State = {
   option?: Option;
   product?: MerchantProduct;
};

type Actions = {
   // eslint-disable-next-line no-unused-vars
   addProduct: (product: MerchantProduct, chosenOption: Option) => void;
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
   removeAll: () => {
      set((state) => {
         state.product = undefined;
         state.option = undefined;
      });
   }
});
