import {cookies} from 'next/headers'
import {useTranslations} from 'next-intl'
import {notFound} from 'next/navigation'
import LogoComponent from '@/components/Logo/logo.component'
import LoadingComponent from '@/components/Loading/loading.component'
import HeaderComponent from '@/app/wait/components/Header/header.component'

const WaitPage = () => {
    notFound()

    const cookieStore = cookies()
    const t = useTranslations('Wait')

    return (
        <>
            <HeaderComponent
                theme={(cookieStore.get('theme')?.value as any) || 'system'}
            />
            <div className='w-full h-full relative flex justify-center items-center flex-col'>
                <LogoComponent
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 w-80 h-80'
                    backgroundColor='transparent'
                />
                <div className='mt-auto flex flex-col justify-center items-center'>
                    <p className='text-lg-bold whitespace-pre text-center'>
                        {t('text')}
                    </p>
                    <LoadingComponent className='mt-8' />
                </div>
            </div>
        </>
    )
}

export default WaitPage
