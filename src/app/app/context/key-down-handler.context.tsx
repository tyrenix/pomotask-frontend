'use client'

import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState
} from 'react'

export interface IKeyDownContext {
    addHandler(listItem: IListItem): void
    removeHandler(id: string): void
}

interface IListItem {
    id: string
    onKeyDown(): void
}

const KeyDownHandlerContext = createContext<IKeyDownContext | null>(null)

export const KeyDownHandlerContextProvider = ({
    children
}: PropsWithChildren) => {
    const [list, setList] = useState<IListItem[]>([])

    useEffect(() => {
        const handlerKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                list[0] && list[0].onKeyDown()
            }
        }

        window.addEventListener('keydown', handlerKeyDown)
        return () => window.removeEventListener('keydown', handlerKeyDown)
    }, [list])

    return (
        <KeyDownHandlerContext.Provider
            value={{
                addHandler(listItem) {
                    setList(list => {
                        const newList = [...list]
                        newList.unshift(listItem)
                        return newList
                    })
                },
                removeHandler(id) {
                    setList(list => {
                        const newList = [...list]

                        const index = newList.findIndex(item => item.id === id)
                        if (index === -1) {
                            return list
                        }

                        newList.splice(index, 1)
                        return newList
                    })
                }
            }}
        >
            {children}
        </KeyDownHandlerContext.Provider>
    )
}

export const useKeyDownHandlerContext = () =>
    useContext(KeyDownHandlerContext) as IKeyDownContext
