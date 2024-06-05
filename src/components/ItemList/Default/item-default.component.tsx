import {MouseEvent, ReactNode} from 'react'
import {clsx} from 'clsx'

import styles from './item-deafult.module.css'

export interface IProps {
    title?: string
    description?: string
    size?: 'ultra-big' | 'big' | 'medium' | 'small'
    leftComponent?: ReactNode
    rightComponent?: ReactNode
    onClick?: (e: MouseEvent<HTMLDivElement>) => any
    isLoading?: boolean
}

export const ItemDefaultComponent = ({
    title,
    description,
    leftComponent,
    rightComponent,
    size = 'big',
    onClick,
    isLoading
}: IProps) => {
    return (
        <div
            className={clsx(
                styles.wrapper,
                size === 'ultra-big'
                    ? 'h-20'
                    : size === 'big'
                      ? 'h-16'
                      : size === 'medium'
                        ? 'h-14'
                        : 'h-12'
            )}
            onClick={onClick}
        >
            {leftComponent && (
                <div className={styles.wrapperLeftIcon}>{leftComponent}</div>
            )}
            <div
                className={clsx(
                    styles.wrapperMainContent,
                    leftComponent ? 'ml-3' : 'ml-standard'
                )}
            >
                <div
                    className={clsx(
                        styles.wrapperDescription,
                        isLoading && 'skeletron-loader'
                    )}
                >
                    <h4 className={clsx(rightComponent && 'mr-standard')}>
                        {title}
                    </h4>
                    {description && (
                        <p className={clsx(rightComponent && 'mr-standard')}>
                            {description}
                        </p>
                    )}
                </div>
                {rightComponent && <div>{rightComponent}</div>}
            </div>
        </div>
    )
}
