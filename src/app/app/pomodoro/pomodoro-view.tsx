'use client'

import {
    Code2Icon,
    CircleFadingPlusIcon,
    PlayIcon,
    HistoryIcon,
    StepForwardIcon
} from 'lucide-react'
import styles from './pomodoro-view.module.css'

export const PomodoroView = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperSelectTask}>
                <div className={styles.wrapperSelectTaskIcon}>
                    <CircleFadingPlusIcon strokeWidth={3} />
                    {/* <Code2Icon strokeWidth={3} /> */}
                </div>
                <div className={styles.wrapperSelectTaskDescription}>
                    <h4>Title</h4>
                    <p>Description</p>
                </div>
            </div>
            <div className={styles.wrapperPomodoro}>
                <svg className={styles.pomodoro}>
                    <circle
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
                        strokeDasharray='754.08935546875'
                        strokeDashoffset='75'
                        strokeLinecap='round'
                    />
                </svg>
                <div>
                    <h4>25:00</h4>
                    <p>2 of 4 steps!</p>
                </div>
            </div>
            <div className={styles.wrapperAlert}>Start and focus!</div>
            <div className={styles.wrapperButtons}>
                <button className={styles.secondaryButton}>
                    <HistoryIcon />
                </button>
                <button className={styles.mainButton}>
                    <PlayIcon />
                </button>
                <button className={styles.secondaryButton}>
                    <StepForwardIcon />
                </button>
            </div>
        </div>
    )
}
