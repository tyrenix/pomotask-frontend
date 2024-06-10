import {Metadata} from 'next'
import {PropsWithChildren} from 'react'
import {HeaderComponent} from '@/components/Header/header.component'
import {NavigationComponent} from '@/components/Navigation/navigation.component'
import {seoConstants} from '@/constants/seo.constant'

import '@/styles/app.styles.css'
import {HeaderProvider} from './context/header.context'

export const metadata: Metadata = {
    ...seoConstants.NO_INDEX_PAGE
}

export default function AppLayout({children}: PropsWithChildren) {
    return (
        <HeaderProvider>
            <div className='w-full h-full p-standard text-primaryInvert flex flex-col gap-8 overflow-y-scroll'>
                <HeaderComponent />
                <main className='w-full h-auto flex flex-col gap-8 mb-20'>
                    {children}
                </main>
                <NavigationComponent />
            </div>
        </HeaderProvider>
    )
}
