// context/AppProvider.tsx
'use client'

import { AppProvider } from "./AppContext";
import { ProduccionProvider } from "./AppContextProducc";



export const AppProviderPrincipal = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider>
      <ProduccionProvider>

            {children}
     
      </ProduccionProvider>
    </AppProvider>
       
  );
};
