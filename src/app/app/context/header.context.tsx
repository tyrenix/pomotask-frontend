'use client'

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState
} from 'react'

interface IContext {
    isPressed: boolean
    handleClick: () => any
}

const HeaderContext = createContext<IContext>({
    isPressed: false,
    handleClick: () => {}
})

export const HeaderProvider = ({children}: PropsWithChildren) => {
    const [isPressed, setIsPressed] = useState<boolean>(false)

    const handleClick = useCallback(() => setIsPressed(prev => !prev), [])

    return (
        <HeaderContext.Provider value={{isPressed, handleClick}}>
            {children}
        </HeaderContext.Provider>
    )
}

export const useHeaderContext = () => useContext(HeaderContext)
