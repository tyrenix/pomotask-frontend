'use client'

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState
} from 'react'

interface IContext {
    isPressed?: boolean
    resetIsPressed: () => any
    handleClick: () => any
}

const HeaderContext = createContext<IContext>({
    isPressed: undefined,
    handleClick: () => {},
    resetIsPressed: () => {}
})

export const HeaderProvider = ({children}: PropsWithChildren) => {
    const [isPressed, setIsPressed] = useState<boolean | undefined>(undefined)
    const handleClick = useCallback(() => setIsPressed(prev => !prev), [])

    return (
        <HeaderContext.Provider
            value={{
                isPressed,
                handleClick,
                resetIsPressed: () => setIsPressed(undefined)
            }}
        >
            {children}
        </HeaderContext.Provider>
    )
}

export const useHeaderContext = () => useContext(HeaderContext)
