import {Metadata} from 'next'
import {getLocale, getTranslations} from 'next-intl/server'
import {ProfileComponent} from '@/app/app/profile/components/Profile/profile.component'

export const generateMetadata = async (): Promise<Metadata> => {
    const locale = await getLocale()
    const t = await getTranslations({
        locale,
        namespace: 'Profile'
    })

    return {
        title: t('title')
    }
}

export default function ProfilePage() {
    return <ProfileComponent />
}
