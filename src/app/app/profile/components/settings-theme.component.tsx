'use client'

import {SwitchComponent} from '@/components/Input/switch.component'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {
    IContext,
    useSystemSettingsContext
} from '@/context/system-settings.context'
import {setLanguage, setTheme} from '@/services/system-settings.service'
import {useTranslations} from 'next-intl'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'

interface IProps {
    isOpen: boolean
    onClose(): void
}

export const SettingsThemeComponent = ({isOpen, onClose}: IProps) => {
    const router = useRouter()
    const t = useTranslations('Settings.theme')

    const {theme: themeActive} = useSystemSettingsContext()
    const {watch, control, register, getValues} = useForm<{
        theme: IContext['theme']
    }>({
        defaultValues: {theme: themeActive}
    })

    const theme = watch('theme')

    useEffect(() => {
        const {theme} = getValues()
        setTheme(theme)
        router.refresh()
    }, [theme, getValues, router])

    return (
        <PopUpMenuComponent
            title={t('title')}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ListComponent>
                <Controller
                    name='theme'
                    control={control}
                    render={({field}) => (
                        <>
                            <SwitchComponent
                                title={t('list.light')}
                                isActive={field.value === 'light'}
                                onClick={() => field.onChange('light')}
                                value=''
                                {...register('theme')}
                            />
                            <SwitchComponent
                                title={t('list.dark')}
                                isActive={field.value === 'dark'}
                                onClick={() => field.onChange('dark')}
                                value=''
                                {...register('theme')}
                            />
                            <SwitchComponent
                                title={t('list.system')}
                                isActive={field.value === 'system'}
                                onClick={() => field.onChange('system')}
                                value=''
                                {...register('theme')}
                            />
                        </>
                    )}
                />
            </ListComponent>
        </PopUpMenuComponent>
    )
}
