'use client'

import {
    DialogComponent,
    IDialogData
} from '@/components/Dialog/dialog.component'
import LoaderComponent from '@/components/Loader/loader.component'
import {useQueryClient} from '@tanstack/react-query'
import clsx from 'clsx'
import {
    HistoryIcon,
    PauseCircleIcon,
    PlayCircleIcon,
    StepForwardIcon
} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useCallback, useEffect, useRef, useState} from 'react'
import {toast} from 'sonner'
import {PtSettingsComponent} from '../../components/PtSettings/pt-settings.component'
import {useHeaderContext} from '../../context/header.context'
import {useSound} from '../../context/sound.context'
import {useActive} from '../hook/useActive.hook'
import {ButtonComponent} from './button.component'
import styles from './timer.module.css'
import {UpcomingComponent} from './upcoming.component'

interface IProps {
    taskId?: string
}

export const TimerComponent = ({taskId}: IProps) => {
    const queryClient = useQueryClient()

    const t = useTranslations('Pomodoro.timer')

    const mainCircleRef = useRef<SVGCircleElement | null>(null)

    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
    const [dialog, setDialog] = useState<IDialogData | null>(null)
    const [isClickAnimation, setIsClickAnimation] = useState<boolean>(false)

    const {upcoming, active, setActive, isPending, isLoading, ...restActive} =
        useActive()
    const {isPressed, resetIsPressed} = useHeaderContext()
    const {playTimerCompletion, playTaskClick} = useSound()

    const startOrPause = () => {
        if (!active) {
            restActive.createMutation.mutate(taskId)
            return
        }

        restActive.startOrPauseMutation.mutate(active.id)
    }

    const reset = () => {
        if (!active) return
        setActive(undefined)
        restActive.deleteMutation.mutate(active.id)
    }

    const completion = useCallback(() => {
        if (!active) return
        playTimerCompletion()
        setActive(undefined)
        toast.success(t('completion'))
        restActive.completionMutation.mutate(active.id)
    }, [
        restActive.completionMutation,
        setActive,
        t,
        active,
        playTimerCompletion
    ])

    useEffect(() => {
        if (active && !active.isPaused) {
            const timeout = setTimeout(() => {
                if (active.completedSeconds + 1 >= active.totalSeconds) {
                    completion()
                } else {
                    queryClient.setQueryData(['pomodoro-session'], {
                        ...active,
                        completedSeconds: active.completedSeconds + 1
                    })

                    if ((active.completedSeconds + 1) % 10 === 0) {
                        queryClient.invalidateQueries({
                            queryKey: ['pomodoro-session']
                        })
                    }
                }
            }, 1e3)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [active, completion, queryClient])

    useEffect(() => {
        if (typeof isPressed === 'boolean' && !isOpenSettings) {
            setIsOpenSettings(true)
            resetIsPressed()
        }
    }, [isPressed, setIsOpenSettings, isOpenSettings, resetIsPressed])

    const totalLengthCircle = mainCircleRef.current?.getTotalLength() || 9999999
    let remainingSeconds: number = active
        ? Math.floor(active.totalSeconds - active.completedSeconds)
        : 9999999

    if (remainingSeconds < 0) remainingSeconds = 0
    const remainingMinutesText = Math.floor(remainingSeconds / 60)
    const remainingSecondsText = remainingSeconds - remainingMinutesText * 60

    return (
        <>
            <div
                className={clsx(
                    styles.wrapperPomodoro,
                    isClickAnimation && 'animate-scale'
                )}
                onClick={() => {
                    setIsClickAnimation(true)
                    setTimeout(() => setIsClickAnimation(false), 150)
                    playTaskClick()
                }}
            >
                <svg
                    className={clsx(
                        isLoading && 'skeletron-loader !rounded-full',
                        active && !active.isPaused && 'scale-110'
                    )}
                    style={
                        {
                            '--color': `rgba(${
                                !active || !totalLengthCircle
                                    ? '0, 0, 0, 0'
                                    : active.type === 'longBreak'
                                    ? 'var(--blue-color)'
                                    : active.type === 'shortBreak'
                                    ? 'var(--green-color)'
                                    : 'var(--accent-color)'
                            })`
                        } as any
                    }
                >
                    {!isLoading && (
                        <>
                            <circle
                                ref={mainCircleRef}
                                cx='50%'
                                cy='50%'
                                r='120'
                                stroke='currentColor'
                                strokeWidth={35}
                                fill='transparent'
                            />
                            <circle
                                className={styles.circleAnimated}
                                cx='50%'
                                cy='50%'
                                r='120'
                                stroke='var(--color)'
                                strokeWidth={35}
                                fill='transparent'
                                strokeDasharray={totalLengthCircle}
                                strokeDashoffset={
                                    active
                                        ? totalLengthCircle -
                                          (remainingSeconds /
                                              active.totalSeconds) *
                                              totalLengthCircle
                                        : totalLengthCircle
                                }
                                strokeLinecap='round'
                            />
                        </>
                    )}
                </svg>
                {!isLoading && (
                    <div>
                        <h4>
                            {!active
                                ? t('time-to-start')
                                : `${remainingMinutesText
                                      .toString()
                                      .padStart(2, '0')}:${remainingSecondsText
                                      .toString()
                                      .padStart(2, '0')}`}
                        </h4>
                        <UpcomingComponent
                            ptSessionsTypes={upcoming.data || []}
                        />
                    </div>
                )}
            </div>
            <div className={styles.wrapperAlert}>
                <p className={clsx(isLoading && 'skeletron-loader')}>
                    {active &&
                        (active.isPaused
                            ? t('slogan.pause')
                            : active.type === 'longBreak'
                            ? t('slogan.longBreak')
                            : active.type === 'shortBreak'
                            ? t('slogan.shortBreak')
                            : active.type === 'work'
                            ? t('slogan.work')
                            : '')}
                </p>
            </div>
            <div className={styles.wrapperButtons}>
                <ButtonComponent
                    icon={<HistoryIcon />}
                    onClick={() =>
                        setDialog({
                            title: t('ask.reset.title'),
                            description: t('ask.reset.description'),
                            button: t('ask.reset.button'),
                            onClick: reset
                        })
                    }
                    isLoading={isLoading}
                    isPending={false}
                    isShow={!!active}
                    type='secondary'
                />
                <ButtonComponent
                    icon={
                        isPending ? (
                            <LoaderComponent mainColor='white' />
                        ) : !active || active?.isPaused ? (
                            <PlayCircleIcon />
                        ) : (
                            <PauseCircleIcon />
                        )
                    }
                    isShow={true}
                    isLoading={isLoading}
                    isPending={isPending}
                    onClick={startOrPause}
                    type='primary'
                />
                <ButtonComponent
                    icon={<StepForwardIcon />}
                    onClick={() =>
                        setDialog({
                            title: t('ask.completion.title'),
                            description: t('ask.completion.description'),
                            button: t('ask.completion.button'),
                            onClick: completion
                        })
                    }
                    isShow={!!active}
                    isLoading={isLoading}
                    isPending={false}
                    type='secondary'
                />
            </div>
            <DialogComponent
                isOpen={!!dialog}
                onClose={() => setDialog(null)}
                dialog={dialog}
            />
            <PtSettingsComponent
                isOpen={isOpenSettings}
                onClose={() => setIsOpenSettings(false)}
            />
        </>
    )
}
