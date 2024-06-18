'use client'

import {useKeyDownHandlerContext} from '@/app/app/context/key-down-handler.context'
import clsx from 'clsx'
import {XIcon} from 'lucide-react'
import {nanoid} from 'nanoid'
import {useTranslations} from 'next-intl'
import {MouseEvent, PropsWithChildren, useEffect, useRef, useState} from 'react'
import styles from './popup-menu.module.css'

interface IPropsForFull extends PropsWithChildren {
    className?: string
    title: string
    isOpen: boolean
    onClose: () => any
    onDone?: () => any
    showDone?: boolean
    activeDone?: boolean
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
    activeDone,
    onDone,
    onClose,
    type = 'full'
}: PropsPopUpMenu) => {
    const componentId = useRef(nanoid())
    const t = useTranslations('PopUpMenu')

    const [status, setStatus] = useState<
        'open' | 'opening' | 'close' | 'closing'
    >('close')

    const keyDownHandler = useKeyDownHandlerContext()

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
                keyDownHandler.addHandler({
                    id: componentId.current,
                    onKeyDown: handlerCancelButton
                })
            }, 10)
        } else if (status === 'closing') {
            setTimeout(() => {
                onClose()
                setTimeout(() => setStatus('close'), 10)
                keyDownHandler.removeHandler(componentId.current)
            }, 300)
        } else if (!isOpen && status === 'open') {
            setStatus('closing')
        }
    }, [isOpen, status, onClose, keyDownHandler])

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
                        ? 'translate-y-full md:translate-y-0 md:scale-0'
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
                                    className={clsx(
                                        styles.headerButtons,
                                        !activeDone && '!text-accent-30'
                                    )}
                                    onClick={
                                        activeDone
                                            ? handlerDoneButton
                                            : undefined
                                    }
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
