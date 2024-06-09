'use client'

import LoaderComponent from '@/components/Loader/loader.component'
import clsx from 'clsx'
import {HistoryIcon, PauseIcon, PlayIcon, StepForwardIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {useEffect, useRef} from 'react'
import {useActive} from '../hook/useActive.hook'
import styles from './timer.module.css'

interface IProps {
    taskId?: string
}

export const TimerComponent = ({taskId}: IProps) => {
    const t = useTranslations('Pomodoro.timer')

    const mainCircleRef = useRef<SVGCircleElement | null>(null)

    const {active, setActive, isPending, isLoading, ...restActive} = useActive()

    useEffect(() => {
        if (active && !active.isPaused) {
            const interval = setInterval(() => {
                setActive(active => {
                    if (!active) return
                    // console.log('ipdaye', new Date().getSeconds())

                    const newActive = {...active}
                    newActive.completedSeconds++

                    return newActive
                })
            }, 1e3)

            return () => {
                clearInterval(interval)
            }
        }
    }, [active])

    const startOrPause = () => {
        if (!active) {
            restActive.createMutation.mutate(taskId)
            return
        }

        setActive(active => {
            if (!active) return

            const newActive = {...active}
            newActive.isPaused = !newActive.isPaused

            return {...newActive}
        })

        restActive.startOrPauseMutation.mutate(active.id)
    }

    const reset = () => {
        if (!active) return
        restActive.deleteMutation.mutate(active.id)
    }

    const completion = () => {
        if (!active) return
        restActive.completionMutation.mutate(active.id)
    }

    const totalLengthCircle = mainCircleRef.current?.getTotalLength() || 9999999
    let remainingSeconds: number = active
        ? Math.floor(
              (active.isPaused
                  ? active.totalSeconds
                  : (new Date(active.completionTime).getTime() - Date.now()) /
                    1e3) - active.completedSeconds
          )
        : 0

    if (remainingSeconds < 0) remainingSeconds = 0
    const remainingMinutesText = Math.floor(remainingSeconds / 60)
    const remainingSecondsText = remainingSeconds - remainingMinutesText * 60

    return (
        <>
            <div className={styles.wrapperPomodoro}>
                <svg
                    className={clsx(
                        isLoading && 'skeletron-loader !rounded-full',
                        active && !active.isPaused && 'scale-110'
                    )}
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
                                cx='50%'
                                cy='50%'
                                r='120'
                                stroke='rgb(var(--accent-color))'
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
                        {active && <p>2 of 4 steps!</p>}
                    </div>
                )}
            </div>
            <div className={styles.wrapperAlert}>
                <p className={clsx(isLoading && 'skeletron-loader')}>
                    {active && 'Start and focus!'}
                </p>
            </div>
            <div className={styles.wrapperButtons}>
                {(isLoading || active) && (
                    <button
                        className={clsx(
                            styles.secondaryButton,
                            isLoading && 'skeletron-loader'
                        )}
                        onClick={reset}
                        disabled={isPending}
                    >
                        <HistoryIcon />
                    </button>
                )}
                <button
                    className={clsx(
                        styles.mainButton,
                        isLoading ? 'skeletron-loader' : 'bg-accent'
                    )}
                    onClick={startOrPause}
                    disabled={isPending}
                >
                    {!active || active?.isPaused ? <PlayIcon /> : <PauseIcon />}
                </button>
                {(isLoading || active) && (
                    <button
                        className={clsx(
                            styles.secondaryButton,
                            isLoading && 'skeletron-loader'
                        )}
                        onClick={completion}
                        disabled={isPending}
                    >
                        <StepForwardIcon />
                    </button>
                )}
            </div>
        </>
    )
}
