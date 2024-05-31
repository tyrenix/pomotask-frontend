import {useTranslations} from 'next-intl'
import LogoComponent from '@components/Logo/logo.component'
import LoadingComponent from '@components/Loading/loading.component'

const WaitPage = () => {
    const t = useTranslations('Wait')

    return (
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
    )
}

export default WaitPage
