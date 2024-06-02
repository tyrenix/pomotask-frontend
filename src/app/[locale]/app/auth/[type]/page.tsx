import {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getTranslations} from 'next-intl/server'
import {seoConstants} from '@/constants/seo.constant'
import AuthComponent from '@/app/[locale]/app/auth/[type]/components/Auth/auth.component'

export const generateMetadata = async ({
    params
}: {
    params: {locale: string}
}): Promise<Metadata> => {
    const t = await getTranslations({
        locale: params.locale,
        namespace: 'Auth'
    })

    return {
        title: t('title'),
        ...seoConstants.NO_INDEX_PAGE
    }
}

export default async function AuthPage({
    params
}: {
    params: {type: 'register' | 'login'}
}) {
    if (params.type !== 'register' && params.type !== 'login') {
        notFound()
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full'>
            <AuthComponent type={params.type} />
        </div>
    )
}
