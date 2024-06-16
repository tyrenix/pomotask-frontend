'use client'

import {useSound} from '@/app/app/context/sound.context'
import clsx from 'clsx'
import {CheckIcon} from 'lucide-react'
import {useState, type MouseEvent, type ReactNode} from 'react'
import styles from './check-box-task.module.css'

interface IProps {
    changeCompleted?: () => any
    isLoading?: boolean
    isCompleted?: boolean
}

export const CheckBoxTaskComponent = ({
    changeCompleted,
    isLoading,
    isCompleted
}: IProps): ReactNode => {
    const [toChangeIsCompleted, setToChangeIsCompleted] =
        useState<boolean>(false)

    const {playTaskClick} = useSound()

    const handleClickToComplete = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        playTaskClick()
        setToChangeIsCompleted(true)
        setTimeout(() => setToChangeIsCompleted(false), 300)
        changeCompleted && changeCompleted()
    }

    return (
        <div
            className={clsx(
                styles.wrapperCompletedBox,
                isLoading
                    ? 'skeletron-loader !border-transparent'
                    : styles.wrapperCompletedBoxLoaded
            )}
            onClick={handleClickToComplete}
        >
            {isCompleted && !isLoading && (
                <CheckIcon
                    className={clsx(
                        toChangeIsCompleted && styles.wrapperCompletedBoxScale
                    )}
                    strokeWidth={3}
                />
            )}
        </div>
    )
}
