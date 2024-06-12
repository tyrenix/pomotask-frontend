'use client'

import clsx from 'clsx'
import {useEffect, useState, type ReactNode} from 'react'
import styles from './button.module.css'
import {useStatusView} from '@/hooks/useStatusView.hook'

interface IProps {
    type: 'primary' | 'secondary'
    icon: ReactNode
    isShow: boolean
    isLoading: boolean
    isPending: boolean
    onClick: () => any
}

export const ButtonComponent = ({
    type,
    icon,
    isLoading,
    isShow,
    isPending,
    onClick
}: IProps) => {
    const [isClick, setIsClick] = useState<boolean>(false)
    const {setStatusShow, statusShow} = useStatusView()

    useEffect(() => {
        if (!isShow && statusShow === 'show') {
            setStatusShow('closing')
        } else if (isShow && statusShow === 'close') {
            setStatusShow('showing')
        }
    }, [isShow, setStatusShow, statusShow])

    const click = () => {
        setIsClick(true)
        setTimeout(() => {
            setIsClick(false)
            onClick()
        }, 100)
    }

    if (!isLoading && statusShow === 'close') return

    return (
        <button
            className={clsx(
                type === 'primary' ? styles.mainButton : styles.secondaryButton,
                isLoading ? 'skeletron-loader' : 'bg-accent',
                (statusShow === 'showing' || statusShow === 'closing') &&
                    !isLoading
                    ? 'scale-0'
                    : 'scale-100',
                isClick && 'animate-scale'
            )}
            onClick={click}
            disabled={isPending}
        >
            {icon}
        </button>
    )
}
