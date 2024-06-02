import {MouseEvent} from 'react'
import styles from './fill-button.module.css'
import LoaderComponent from '@/components/Loader/loader.component'

interface IFillButtonProps {
    label: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => any
    loading?: boolean
    disabled?: boolean
}

export default function FillButtonComponent({
    onClick,
    label,
    loading,
    disabled
}: IFillButtonProps) {
    return (
        <button
            className={`${styles.button} ${disabled ? styles.buttonDisabled : ''} ${loading ? styles.buttonLoading : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {loading ? (
                <LoaderComponent
                    mainColor='border-white'
                    size={{h: 'h-8', w: 'w-8'}}
                />
            ) : (
                label
            )}
        </button>
    )
}
