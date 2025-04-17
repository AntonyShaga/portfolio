'use client';

import {createContext, ReactNode, useContext} from 'react';

export const DictionaryContext = createContext<any | null>(null);

export const useDictionary = () => {
    const context = useContext(DictionaryContext);
    if (!context) {
        throw new Error('useDictionary must be used within DictionaryProvider');
    }
    return context;
};

export const DictionaryProvider = ({
dict,
children,
  }: {
    dict: any;
    children: ReactNode;
}) => {
    return (
        <DictionaryContext.Provider value={dict}>
            {children}
        </DictionaryContext.Provider>
    );
};
