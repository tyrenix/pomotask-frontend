import {forwardRef, useState} from 'react'
import styles from './input.module.css'

export interface IInputProps {
    id?: string
    placeholder?: string
    label?: string
    disabled?: boolean
    error?: boolean
    type?: string
}

const InputComponent = forwardRef<HTMLInputElement, IInputProps>(
    ({error, placeholder, id, disabled, label, type, ...rest}, ref) => {
        const [isFocus, setIsFocus] = useState<boolean>(false)

        return (
            <div
                className={`${styles.wrapper} ${isFocus ? styles.wrapperFocus : ''} ${error ? styles.wrapperError : ''} ${disabled ? styles.wrapperDisabled : ''}`}
            >
                {label && (
                    <label htmlFor={id} className={styles.label}>
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={styles.input}
                    placeholder={placeholder}
                    type={type}
                    disabled={disabled}
                    {...rest}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => {
                        setIsFocus(false)
                        console.log('asdfas')
                    }}
                />
            </div>
        )
    }
)

InputComponent.displayName = 'input'
export default InputComponent
