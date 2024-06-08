'use client'

import {ITask} from '@/types/task.types'
import {
    ItemDefaultComponent,
    IProps as ItemDefaultProps
} from '../Default/item-default.component'
import {CheckBoxTaskComponent} from '@/components/CheckBox'

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
    return (
        <ItemDefaultComponent
            title={task?.title}
            size='big'
            onClick={onClick}
            isLoading={isLoading}
            leftComponent={
                <CheckBoxTaskComponent
                    changeCompleted={changeCompleted}
                    isCompleted={task?.isCompleted}
                    isLoading={isLoading}
                />
            }
        />
    )
}
