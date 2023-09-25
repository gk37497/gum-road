/* eslint-disable import/no-cycle */
import { createContext, useContext } from 'react';
import { StateCreator, createStore, useStore as useZustandStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { CartSlice, createCartSlice } from './sub-stores/store-cart';

export type AppStoreInterface = CartSlice;

export type SliceType<T> = StateCreator<
   AppStoreInterface,
   [['zustand/immer', never], ['zustand/persist', unknown], ['zustand/devtools', never]],
   [],
   T
>;

export type StoreInterface = CartSlice;

export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<StoreType | null>(null);

export const { Provider } = zustandContext;

// eslint-disable-next-line no-unused-vars
export const useAppStore = <T>(selector: (state: StoreInterface) => T) => {
   const store = useContext(zustandContext);

   if (!store) throw new Error('Store is missing the provider');

   return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState: Partial<StoreInterface> = {}) =>
   createStore<
      StoreInterface,
      [['zustand/immer', never], ['zustand/persist', unknown], ['zustand/devtools', never]]
   >(
      immer(
         persist(
            devtools((...a) => ({
               ...preloadedState,
               ...createCartSlice(...a)
            })),
            {
               name: 'app-store',
               partialize: (state) => ({
                  option: state.option
               })
            }
         )
      )
   );
