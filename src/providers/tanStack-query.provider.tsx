'use client'

import {PropsWithChildren, useState} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {envConstant} from '@/constants/env.constant'

export function TanStackQueryProvider({children}: PropsWithChildren) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false
                }
            }
        })
    )

    return (
        <QueryClientProvider client={client}>
            {children}
            {envConstant.NEXT_PUBLIC_IS_DEV === 'YES' && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    )
}
