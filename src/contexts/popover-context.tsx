"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface PopoverContextInterface {
    popoverCurrent: string | null;
    setPopoverCurrent: (value: string | null) => void;
}

export const PopoverContext = createContext<PopoverContextInterface>({
    popoverCurrent: null,
    setPopoverCurrent: () => { }
});

export const PopoverContextProvider = ({ children }: { children: ReactNode }) => {
    const [popoverCurrent, setPopoverCurrent] = useState<string | null>(null);

    return (
        <PopoverContext.Provider value={{ popoverCurrent, setPopoverCurrent }}>
            {children}
        </PopoverContext.Provider>
    );
};
