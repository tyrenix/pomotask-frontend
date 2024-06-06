'use client'

import {PropsWithChildren, useEffect, useState} from 'react'
import clsx from 'clsx'

import styles from './menu-full.module.css'

interface IProps extends PropsWithChildren {
    isOpen: boolean
    onClose: () => any
}

export const PopUpMenuFullComponent = ({children, isOpen, onClose}: IProps) => {
    const [status, setStatus] = useState<
        'open' | 'opening' | 'close' | 'closing'
    >('close')

    useEffect(() => {
        if (isOpen && status !== 'opening' && status !== 'open') {
            setStatus('opening')
            setTimeout(() => {
                setStatus('open')
            }, 1)
        } else if (!isOpen && status !== 'closing' && status !== 'close') {
            setStatus('closing')
            setTimeout(() => {
                setStatus('close')
            }, 1)
        }
    }, [isOpen])

    const handlerCancelButton = () => {
        onClose()
    }

    const handlerDoneButton = () => {
        onClose()
    }

    if (status === 'close') {
        return null
    }

    return (
        <div
            className={clsx(
                styles.wrapper,
                status === 'opening' || status === 'closing'
                    ? 'opacity-100'
                    : status === 'open' || status === 'close'
                    ? ''
                    : ''
            )}
        >
            <div
                className={clsx(
                    styles.wrapperContainer,
                    status === 'opening' || status === 'closing'
                        ? 'translate-y-full'
                        : status === 'open' || status === 'close'
                        ? ''
                        : ''
                )}
            >
                <div className={styles.header}>
                    <div
                        className={styles.headerButtons}
                        onClick={handlerCancelButton}
                    >
                        Отмена
                    </div>
                    <div className={styles.headerTitle}>Title</div>
                    <div
                        className={styles.headerButtons}
                        onClick={handlerDoneButton}
                    >
                        Готово
                    </div>
                </div>
                <div className={styles.wrapperContent}>{children}</div>
            </div>
        </div>
    )
}
