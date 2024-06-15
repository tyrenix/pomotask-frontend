'use client'

import {createContext, PropsWithChildren, useContext} from 'react'

export interface IContext {
    theme: 'dark' | 'light' | 'system'
    language: string
}

const SystemSettingsContext = createContext<IContext | null>(null)

export const SystemSettingsContextProvider = ({
    children,
    ...props
}: PropsWithChildren & IContext) => {
    return (
        <SystemSettingsContext.Provider value={props}>
            {children}
        </SystemSettingsContext.Provider>
    )
}

export const useSystemSettingsContext = () =>
    useContext(SystemSettingsContext) as IContext
