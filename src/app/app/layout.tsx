import {Metadata} from 'next'
import {PropsWithChildren} from 'react'
import {HeaderComponent} from '@/components/Header/header.component'
import {NavigationComponent} from '@/components/Navigation/navigation.component'
import {seoConstants} from '@/constants/seo.constant'

import '@/styles/app.styles.css'

export const metadata: Metadata = {
    ...seoConstants.NO_INDEX_PAGE
}

export default function AppLayout({children}: PropsWithChildren) {
    return (
        <>
            <div className='w-full h-full p-standard pb-28 text-primaryInvert flex flex-col gap-8 overflow-y-scroll'>
                <HeaderComponent />
                <main className='w-full h-full flex flex-col gap-8'>
                    {children}
                </main>
                <NavigationComponent />
            </div>
        </>
    )
}
