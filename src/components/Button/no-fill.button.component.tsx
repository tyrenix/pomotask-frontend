import {clsx} from 'clsx'
import {MouseEvent} from 'react'
import styles from './no-fill-button.module.css'
import LoaderComponent from '@/components/Loader/loader.component'

interface IFillButtonProps {
    label: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => any
    loading?: boolean
    disabled?: boolean
    size?: 'big' | 'medium' | 'small'
}

export default function NoFillButtonComponent({
    onClick,
    label,
    loading,
    disabled,
    size = 'big'
}: IFillButtonProps) {
    return (
        <button
            className={clsx(
                styles.button,
                disabled && styles.buttonDisabled,
                loading && styles.buttonLoading,
                size === 'big' ? 'h-16' : size === 'medium' ? 'h-12' : 'h-10'
            )}
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
