import {forwardRef} from 'react'
import {ItemDefaultComponent} from '../ItemList'
import styles from './switch.module.css'
import clsx from 'clsx'
import {CheckIcon} from 'lucide-react'

interface IProps {
    title: string
    value: string
    isActive: boolean
    onClick(): void
}

export const SwitchComponent = forwardRef<HTMLDivElement, IProps>(
    ({title, value, onClick, isActive}, ref) => {
        const rightComponent = (
            <div
                className={clsx(
                    styles.wrapperStatus,
                    isActive && styles.wrapperStatusActive
                )}
            >
                {isActive && <CheckIcon strokeWidth={3} />}
            </div>
        )

        return (
            <div ref={ref}>
                <ItemDefaultComponent
                    title={title}
                    onClick={onClick}
                    rightComponent={rightComponent}
                />
            </div>
        )
    }
)

SwitchComponent.displayName = 'SwitchComponent'
