'use client'

import clsx from 'clsx'
import {X as XIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import {MouseEvent, PropsWithChildren, useEffect, useState} from 'react'
import styles from './popup-menu.module.css'

interface IPropsForFull extends PropsWithChildren {
    className?: string
    title: string
    isOpen: boolean
    onClose: () => any
    onDone?: () => any
    showDone?: boolean
    type?: 'full'
}

interface IPropsForSmall
    extends Partial<Omit<IPropsForFull, 'type' | 'onClose' | 'isOpen'>> {
    isOpen: boolean
    onClose: () => any
    type: 'small'
}

export type PropsPopUpMenu = IPropsForFull | IPropsForSmall

export const PopUpMenuComponent = ({
    className,
    title,
    children,
    isOpen,
    showDone,
    onDone,
    onClose,
    type = 'full'
}: PropsPopUpMenu) => {
    const t = useTranslations('PopUpMenu')

    const [status, setStatus] = useState<
        'open' | 'opening' | 'close' | 'closing'
    >('close')

    useEffect(() => {
        if (
            isOpen &&
            status !== 'opening' &&
            status !== 'open' &&
            status !== 'closing'
        ) {
            setStatus('opening')
            setTimeout(() => {
                setStatus('open')
            }, 10)
        } else if (status === 'closing') {
            setTimeout(() => {
                onClose()
                setTimeout(() => setStatus('close'), 10)
            }, 300)
        } else if (!isOpen && status === 'open') {
            setStatus('closing')
        }
    }, [isOpen, status])

    const handlerCancelButton = () => {
        setStatus('closing')
    }

    const handlerDoneButton = () => {
        setStatus('closing')
        onDone && onDone()
    }

    const onWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement | undefined
        if (target && target.classList.contains('popup-window')) {
            setStatus('closing')
        }
    }

    if (status === 'close') {
        return null
    }

    return (
        <div
            className={clsx(
                'popup-window',
                styles.wrapper,
                status === 'opening' || status === 'closing'
                    ? 'bg-black bg-opacity-0'
                    : status === 'open'
                    ? 'bg-black bg-opacity-50'
                    : ''
            )}
            onClick={onWrapperClick}
        >
            <div
                className={clsx(
                    styles.wrapperContainer,
                    type === 'full'
                        ? styles.wrapperContainerFull
                        : styles.wrapperContainerSmall,
                    status === 'opening' || status === 'closing'
                        ? 'translate-y-full'
                        : status === 'open' || status === 'close'
                        ? ''
                        : ''
                )}
            >
                <div className={styles.header}>
                    {type === 'full' ? (
                        <>
                            <div
                                className={styles.headerButtons}
                                onClick={handlerCancelButton}
                            >
                                {t('close')}
                            </div>
                            <div className={styles.headerTitle}>{title}</div>
                            {showDone ? (
                                <div
                                    className={styles.headerButtons}
                                    onClick={handlerDoneButton}
                                >
                                    {t('done')}
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <>
                            <div className={styles.headerTitle}>{title}</div>
                            <div
                                className={styles.headerCloseButton}
                                onClick={handlerCancelButton}
                            >
                                <XIcon />
                            </div>
                        </>
                    )}
                </div>
                <div className={clsx(className, styles.wrapperContent)}>
                    {children}
                </div>
            </div>
        </div>
    )
}
