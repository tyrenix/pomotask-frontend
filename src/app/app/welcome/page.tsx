import {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {WelcomeComponent} from '@/app/app/welcome/components/Welcome/welcome.component'

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale()
    const t = await getTranslations({
        locale,
        namespace: 'Welcome'
    })

    return {title: t('title')}
}

export default function WelcomePage() {
    return (
        <div className='fixed top-0 left-0 z-50 p-standard bg-content flex justify-center items-center'>
            <WelcomeComponent />
        </div>
    )
}
