'use client'

import {
    DialogComponent,
    IDialogData
} from '@/components/Dialog/dialog.component'
import LoaderComponent from '@/components/Loader/loader.component'
import clsx from 'clsx'
import {HistoryIcon, PauseIcon, PlayIcon, StepForwardIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useEffect, useRef, useState} from 'react'
import {toast} from 'sonner'
import {useHeaderContext} from '../../context/header.context'
import {useActive} from '../hook/useActive.hook'
import {ButtonComponent} from './button.component'
import styles from './timer.module.css'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {PtSettingsComponent} from '../../components/PtSettings/pt-settings.component'

interface IProps {
    taskId?: string
}

export const TimerComponent = ({taskId}: IProps) => {
    const t = useTranslations('Pomodoro.timer')

    const mainCircleRef = useRef<SVGCircleElement | null>(null)

    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
    const [dialog, setDialog] = useState<IDialogData | null>(null)
    const [isClickAnimation, setIsClickAnimation] = useState<boolean>(false)

    const {active, setActive, isPending, isLoading, ...restActive} = useActive()
    const {isPressed} = useHeaderContext()

    useEffect(() => {
        if (active && !active.isPaused) {
            const interval = setInterval(() => {
                if (active.completedSeconds + 1 >= active.totalSeconds) {
                    completion()
                } else {
                    setActive(active => {
                        if (!active) return

                        const newActive = {...active}
                        newActive.completedSeconds++

                        return newActive
                    })
                }
            }, 1e3)

            return () => {
                clearInterval(interval)
            }
        }
    }, [active])

    useEffect(() => {
        if (!isOpenSettings) {
            setIsOpenSettings(true)
        }
    }, [isPressed])

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

    const completion = () => {
        if (!active) return
        setActive(undefined)
        toast.success(t('completion'))
        restActive.completionMutation.mutate(active.id)
    }

    const totalLengthCircle = mainCircleRef.current?.getTotalLength() || 9999999
    let remainingSeconds: number = active
        ? Math.floor(active.totalSeconds - active.completedSeconds)
        : 0

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
                                !active
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
                        {
                            <h4>
                                {!active
                                    ? t('time-to-start')
                                    : `${remainingMinutesText
                                          .toString()
                                          .padStart(
                                              2,
                                              '0'
                                          )}:${remainingSecondsText
                                          .toString()
                                          .padStart(2, '0')}`}
                            </h4>
                        }
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
                            <PlayIcon />
                        ) : (
                            <PauseIcon />
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
