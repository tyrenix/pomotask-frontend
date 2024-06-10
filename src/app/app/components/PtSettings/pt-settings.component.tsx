'use active'

import {ItemDefaultComponent} from '@/components/ItemList'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {usePtSettings} from '@/hooks/usePtSettings.hook'
import {IUpdatePomodoroSettings} from '@/types/pomodoro-settings.types'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {InputNumberComponent} from '../../pomodoro/components/input-number.component'
import {ptSettingsService} from '@/services/pt-settings.service'
import {toast} from 'sonner'

const getMinutes = (seconds: number): number => Math.floor(seconds / 60)

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const PtSettingsComponent = ({isOpen, onClose}: IProps) => {
    const queryClient = useQueryClient()

    const t = useTranslations('Pomodoro.settings')

    const [isActiveDone, setIsActiveDone] = useState<boolean>(false)

    const {ptSettings, isLoading} = usePtSettings()
    const {register, watch, getValues} = useForm<IUpdatePomodoroSettings>()
    const {mutate} = useMutation({
        mutationKey: ['pomodoro-settings'],
        mutationFn: (data: IUpdatePomodoroSettings) =>
            ptSettingsService.update(data),
        onError(error) {
            console.log(error)
            toast.error(t('status-update.failure'))
        },
        onSuccess() {
            toast.error(t('status-update.success'))
            queryClient.invalidateQueries({queryKey: ['pomodoro-settings']})
        }
    })

    useEffect(() => {
        const form = getValues()

        let isAllEmpty: boolean = true
        let isNull: boolean = false
        for (const key of Object.keys(form)) {
            // @ts-ignore
            const field = form[key]
            if (field && Number(field) <= 0) {
                isNull = true
            }

            if (field) {
                isAllEmpty = false
            }
        }

        if (!isNull && !isAllEmpty) {
            setIsActiveDone(true)
        } else {
            setIsActiveDone(false)
        }
    }, [watch()])

    const onDone = () => {
        const fields = getValues()
        const data: any = {}
        for (const key of Object.keys(fields)) {
            // @ts-ignore
            const field = fields[key]
            if (field && Number(field) > 0) {
                data[key] = Number(
                    field * (key !== 'longBreakFrequency' ? 60 : 1)
                )
            }
        }

        mutate(data)
    }

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-5 pb-20'
            title={t('title')}
            isOpen={isOpen}
            onClose={onClose}
            activeDone={isActiveDone}
            onDone={onDone}
            showDone={true}
        >
            {isLoading ? (
                <>
                    <ListComponent
                        title={t('work-time.title')}
                        description={t('work-time.description')}
                    >
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                    <ListComponent title={t('break.title')}>
                        <ItemDefaultComponent isLoading={true} />
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                    <ListComponent title={t('frequency.title')}>
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                    <ListComponent title={t('session.title')}>
                        <ItemDefaultComponent isLoading={true} />
                    </ListComponent>
                </>
            ) : ptSettings ? (
                <>
                    <ListComponent
                        title={t('work-time.title')}
                        description={t('work-time.description')}
                    >
                        <ItemDefaultComponent
                            title={t('work-time.text')}
                            rightComponent={
                                <InputNumberComponent
                                    id='input-pomodoro-work'
                                    placeholder={getMinutes(
                                        ptSettings.pomodoro
                                    ).toString()}
                                    {...register('pomodoro')}
                                />
                            }
                        />
                    </ListComponent>
                    <ListComponent title={t('break.title')}>
                        <ItemDefaultComponent
                            title={t('break.text-short-break')}
                            rightComponent={
                                <InputNumberComponent
                                    id='input-short-break'
                                    placeholder={getMinutes(
                                        ptSettings.shortBreak
                                    ).toString()}
                                    {...register('shortBreak')}
                                />
                            }
                        />
                        <ItemDefaultComponent
                            title={t('break.text-long-break')}
                            rightComponent={
                                <InputNumberComponent
                                    id='input-long-break'
                                    placeholder={getMinutes(
                                        ptSettings.longBreak
                                    ).toString()}
                                    {...register('longBreak')}
                                />
                            }
                        />
                    </ListComponent>
                    <ListComponent
                        title={t('frequency.title')}
                        description={t('frequency.description')}
                    >
                        <ItemDefaultComponent
                            title={t('frequency.text')}
                            rightComponent={
                                <InputNumberComponent
                                    id='input-long-break-frequency'
                                    type='times'
                                    placeholder={getMinutes(
                                        ptSettings.longBreakFrequency
                                    ).toString()}
                                    {...register('longBreakFrequency')}
                                />
                            }
                        />
                    </ListComponent>
                    <ListComponent title={t('session.title')}>
                        <ItemDefaultComponent
                            title={t('session.text')}
                            rightComponent={
                                <InputNumberComponent
                                    id='input-working-time'
                                    placeholder={getMinutes(
                                        ptSettings.workingTime
                                    ).toString()}
                                    {...register('workingTime')}
                                />
                            }
                        />
                    </ListComponent>
                </>
            ) : (
                <div>Error loading...</div>
            )}
        </PopUpMenuComponent>
    )
}
