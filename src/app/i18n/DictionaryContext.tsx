'use client';

import {createContext, ReactNode, useContext} from 'react';
import {AppDictionary} from "@/types/dictionary";

export const DictionaryContext = createContext<AppDictionary | null>(null);

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
    dict: AppDictionary;
    children: ReactNode;
}) => {
    return (
        <DictionaryContext.Provider value={dict}>
            {children}
        </DictionaryContext.Provider>
    );
};
