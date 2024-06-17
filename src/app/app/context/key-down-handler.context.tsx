'use client'

import {createContext, PropsWithChildren, useContext, useState} from 'react'

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
