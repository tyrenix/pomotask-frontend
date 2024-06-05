import {PropsWithChildren} from 'react'

import styles from './list.module.css'

interface IProps extends PropsWithChildren {
    title?: string
    description?: string
}

export const ListComponent = ({title, description, children}: IProps) => {
    return (
        <div className={styles.wrapper}>
            {title && <h3>{title}</h3>}
            <div className={styles.wrapperList}>{children}</div>
            {description && <p>{description}</p>}
        </div>
    )
}
