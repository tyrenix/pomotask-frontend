'use server'

import {useTranslations} from 'next-intl'
import LinkComponent from '@/components/Link/link.component'
import {dashboardConstant} from '@/constants/dashboard.constant'

const NotFoundPage = () => {
    const t = useTranslations('NotFound')

    return (
        <div className='w-full h-full flex items-center justify-center flex-col gap-2'>
            <h1 className='text-2xl-bold text-primaryInvert'>{t('title')}</h1>
            <p className='w-1/2 text-lg-regular text-primaryInvert-70 text-center'>
                {t('description')}
            </p>
            <LinkComponent
                className='text-lg-bold'
                href={dashboardConstant.APP_PAGE}
                label={t('to-main')}
            />
        </div>
    )
}

export default NotFoundPage
