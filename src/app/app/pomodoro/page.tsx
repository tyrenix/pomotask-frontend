'use server'

import {seoConstants} from '@/constants/seo.constant'
import type {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {PomodoroView} from './pomodoro-view'

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale()
    const t = await getTranslations({
        locale,
        namespace: 'Pomodoro'
    })

    return {
        title: t('title'),
        ...seoConstants.NO_INDEX_PAGE
    }
}

export default async function MainPage() {
    return <PomodoroView />
}
