import {useTranslations} from 'next-intl'
import {forwardRef, KeyboardEvent} from 'react'
import styles from './input-number.module.css'

interface IProps {
    id: string
    placeholder: string
    type?: 'mins' | 'times'
}

export const InputNumberComponent = forwardRef<HTMLInputElement, IProps>(
    ({placeholder, id, type = 'mins', ...rest}, ref) => {
        const tUnits = useTranslations('Units')

        const filterNumber = (event: KeyboardEvent<HTMLInputElement>) => {
            if (
                !/[0-9]/.test(event.key) &&
                event.key !== 'Backspace' &&
                event.key !== 'Tab' &&
                event.key !== 'Enter' &&
                event.key !== 'ArrowLeft' &&
                event.key !== 'ArrowRight'
            ) {
                event.preventDefault()
            }
        }

        return (
            <div className={styles.wrapper}>
                <input
                    id={id}
                    ref={ref}
                    className={styles.input}
                    type='text'
                    placeholder={placeholder}
                    onKeyDown={filterNumber}
                    {...rest}
                />
                <label htmlFor={id} className={styles.label}>
                    {type === 'mins'
                        ? tUnits('shortMinutes')
                        : tUnits('shortTimes')}
                </label>
            </div>
        )
    }
)
