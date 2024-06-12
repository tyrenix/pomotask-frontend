'use client'

import {ITask} from '@/types/task.types'
import {
    ItemDefaultComponent,
    IProps as ItemDefaultProps
} from '../Default/item-default.component'
import {CheckBoxTaskComponent} from '@/components/CheckBox'
import {Divide, ListStartIcon} from 'lucide-react'

interface IPropsWithoutLoading extends Pick<ItemDefaultProps, 'onClick'> {
    task: ITask
    isLoading?: false
    type?: 'task' | 'select'
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
    changeCompleted,
    type
}: TProps) => {
    return (
        <ItemDefaultComponent
            title={task?.title}
            size='big'
            onClick={onClick}
            isLoading={isLoading}
            leftComponent={
                type === 'select' ? (
                    <ListStartIcon className='w-7 h-7 text-primaryInvert-70' />
                ) : (
                    <CheckBoxTaskComponent
                        changeCompleted={changeCompleted}
                        isCompleted={task?.isCompleted}
                        isLoading={isLoading}
                    />
                )
            }
        />
    )
}
