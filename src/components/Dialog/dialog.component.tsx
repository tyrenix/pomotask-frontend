'use client'

import {useKeyDownHandlerContext} from '@/app/app/context/key-down-handler.context'
import clsx from 'clsx'
import {useTranslations} from 'next-intl'
import {useCallback, useEffect, useRef, useState, type MouseEvent} from 'react'
import FillButtonComponent from '../Button/fill-button.component'
import NoFillButtonComponent from '../Button/no-fill.button.component'
import {nanoid} from 'nanoid'
import styles from './dialog.module.css'

export interface IDialogData {
    title: string
    description: string
    button: string
    onClick: () => any
}

interface IOpened {
    dialog?: IDialogData | null
    isOpen: true
    onClose: () => any
}

interface INoOpened extends Omit<IOpened, 'isOpen'> {
    isOpen?: false
}

type IProps = IOpened | INoOpened

export const DialogComponent = ({isOpen, onClose, dialog}: IProps) => {
    const componentId = useRef(nanoid())
    const t = useTranslations('Dialog')

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
                keyDownHandler.addHandler({
                    id: componentId.current,
                    onKeyDown: handlerCancelButton
                })
                setStatus('open')
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
        dialog?.onClick && dialog.onClick()
    }

    const onWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement | undefined
        if (target && target.classList.contains('dialog-window')) {
            setStatus('closing')
        }
    }

    if (status === 'close') {
        return null
    }

    return (
        <div
            className={clsx(
                'dialog-window',
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
                    styles.window,
                    status === 'opening' || status === 'closing'
                        ? 'scale-0'
                        : status === 'open'
                        ? 'scale-100'
                        : ''
                )}
            >
                <div className={styles.content}>
                    <h2>{dialog?.title}</h2>
                    <p>{dialog?.description}</p>
                </div>
                <div className={styles.buttons}>
                    <FillButtonComponent
                        size='medium'
                        label={dialog?.button || t('perform')}
                        onClick={handlerDoneButton}
                    />
                    <NoFillButtonComponent
                        size='medium'
                        label={t('cancel')}
                        onClick={handlerCancelButton}
                    />
                </div>
            </div>
        </div>
    )
}
