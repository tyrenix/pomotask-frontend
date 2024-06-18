import {IPomodoroSession} from '@/types/pomodoro-session.types'
import styles from './upcoming.module.css'
import clsx from 'clsx'

interface IProps {
    ptSessionsTypes: IPomodoroSession['type'][]
}

export const UpcomingComponent = ({ptSessionsTypes}: IProps) => {
    return (
        <div className={styles.wrapper}>
            {ptSessionsTypes.map((ptSessionType, index) => (
                <div
                    key={index}
                    className={clsx(
                        styles.item,
                        ptSessionType === 'shortBreak'
                            ? 'bg-green'
                            : ptSessionType === 'longBreak'
                            ? 'bg-blue'
                            : ptSessionType === 'work'
                            ? 'bg-accent'
                            : ''
                    )}
                />
            ))}
        </div>
    )
}
