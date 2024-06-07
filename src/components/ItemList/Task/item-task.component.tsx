'use client'

import {ITask} from '@/types/task.types'
import clsx from 'clsx'
import {BadgeCheckIcon, BadgeIcon} from 'lucide-react'
import {useState, type MouseEvent} from 'react'
import {
    ItemDefaultComponent,
    IProps as ItemDefaultProps
} from '../Default/item-default.component'

import styles from './item-task.module.css'

interface IPropsWithoutLoading extends Pick<ItemDefaultProps, 'onClick'> {
    task: ITask
    isLoading?: false
    changeCompleted: () => any
}

interface IPropsWithLoading
    extends Partial<Omit<IPropsWithoutLoading, 'isLoading'>> {
    isLoading: true
}

type TProps = IPropsWithLoading | IPropsWithoutLoading

export const ItemTaskComponent = ({
    task,
    onClick,
    isLoading,
    changeCompleted
}: TProps) => {
    const [toChangeIsCompleted, setToChangeIsCompleted] =
        useState<boolean>(false)

    const handleClickToComplete = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setToChangeIsCompleted(true)
        setTimeout(() => setToChangeIsCompleted(false), 300)
        changeCompleted && changeCompleted()
    }

    const leftComponent = (
        <div
            className={clsx(
                styles.wrapperCompletedBox,
                isLoading
                    ? 'skeletron-loader'
                    : styles.wrapperCompletedBoxLoaded,
                toChangeIsCompleted && styles.wrapperCompletedBoxScale
            )}
            onClick={handleClickToComplete}
        >
            {task?.isCompleted ? <BadgeCheckIcon /> : <BadgeIcon />}
        </div>
    )

    return (
        <ItemDefaultComponent
            title={task?.title}
            size='big'
            onClick={onClick}
            isLoading={isLoading}
            leftComponent={leftComponent}
        />
    )
}
