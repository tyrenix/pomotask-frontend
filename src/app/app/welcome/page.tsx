import {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {WelcomeComponent} from '@/app/app/welcome/components/Welcome/welcome.component'
import {seoConstants} from '@/constants/seo.constant'

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale()
    const t = await getTranslations({
        locale,
        namespace: 'Welcome'
    })

    return {
        title: t('title'),
        ...seoConstants.NO_INDEX_PAGE
    }
}

export default function WelcomePage() {
    return <WelcomeComponent />
}
