'use client';

import {createContext, ReactNode, useContext} from 'react';
import {Dictionary} from "@/types/dictionary";

export const DictionaryContext = createContext<Dictionary | null>(null);

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
    dict: Dictionary;
    children: ReactNode;
}) => {
    return (
        <DictionaryContext.Provider value={dict}>
            {children}
        </DictionaryContext.Provider>
    );
};
