'use client'

import {SwitchComponent} from '@/components/Input/switch.component'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {useSystemSettingsContext} from '@/context/system-settings.context'
import {setLanguage} from '@/services/system-settings.service'
import {useTranslations} from 'next-intl'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'

interface IProps {
    isOpen: boolean
    onClose(): void
}

export const SettingsLanguageComponent = ({isOpen, onClose}: IProps) => {
    const router = useRouter()
    const t = useTranslations('Settings.language')

    const {language: languageActive} = useSystemSettingsContext()
    const {watch, control, register, getValues} = useForm<{language: string}>({
        defaultValues: {language: languageActive}
    })

    const language = watch('language')

    useEffect(() => {
        const {language} = getValues()
        setLanguage(language)
        router.refresh()
    }, [language, getValues, router])

    return (
        <PopUpMenuComponent
            title={t('title')}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ListComponent>
                <Controller
                    name='language'
                    control={control}
                    render={({field}) => (
                        <>
                            <SwitchComponent
                                title={t('list.ru')}
                                isActive={field.value === 'ru'}
                                onClick={() => field.onChange('ru')}
                                value=''
                                {...register('language')}
                            />
                            <SwitchComponent
                                title={t('list.en')}
                                isActive={field.value === 'en'}
                                onClick={() => field.onChange('en')}
                                value=''
                                {...register('language')}
                            />
                        </>
                    )}
                />
            </ListComponent>
        </PopUpMenuComponent>
    )
}
