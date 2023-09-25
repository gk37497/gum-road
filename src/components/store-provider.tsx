'use client';

import { Provider, StoreType, initializeStore } from '@/lib/store';
import { useRef, type PropsWithChildren } from 'react';

const StoreProvider = ({ children, ...props }: PropsWithChildren) => {
   const storeRef = useRef<StoreType>();

   if (!storeRef.current) {
      storeRef.current = initializeStore(props);
   }

   return <Provider value={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
