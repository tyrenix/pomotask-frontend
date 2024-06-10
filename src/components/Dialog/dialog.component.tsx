'use client'

import {useStatusView} from '@/hooks/useStatusView.hook'
import clsx from 'clsx'
import {useEffect, useState, type MouseEvent} from 'react'
import styles from './dialog.module.css'
import FillButtonComponent from '../Button/fill-button.component'
import NoFillButtonComponent from '../Button/no-fill.button.component'
import {useTranslations} from 'next-intl'

interface IOpened {
    title: string
    description: string
    isOpen: true
    onClose: () => any
}

interface INoOpened extends Omit<IOpened, 'isOpen'> {
    isOpen?: false
}

type IProps = IOpened | INoOpened

export const DialogComponent = ({
    isOpen,
    onClose,
    title,
    description
}: IProps) => {
    const t = useTranslations('Dialog')

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
            <div className={styles.window}>
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div className={styles.buttons}>
                    <FillButtonComponent size='medium' label={t('perform')} />
                    <NoFillButtonComponent size='medium' label={t('cancel')} />
                </div>
            </div>
        </div>
    )
}
