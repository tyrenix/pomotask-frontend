import {seoConstants} from '@/constants/seo.constant'
import {CloudCogIcon} from 'lucide-react'
import {Metadata} from 'next'
import {useTranslations} from 'next-intl'
import {getLocale, getTranslations} from 'next-intl/server'
import styles from './page.module.css'

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale()
    const t = await getTranslations({locale, namespace: 'Offline'})

    return {
        title: t('title'),
        ...seoConstants.NO_INDEX_PAGE
    }
}

export default function OfflinePage() {
    const t = useTranslations('Offline')

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperContent}>
                <CloudCogIcon />
                <p>{t('text')}</p>
            </div>
        </div>
    )
}
