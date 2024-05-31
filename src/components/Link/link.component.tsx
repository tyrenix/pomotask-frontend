import Link from 'next/link'
import styles from './style.module.css'

interface IProps {
    className?: string
    href: string
    locale?: string
    label: string
}

const LinkComponent = (props: IProps) => {
    return (
        <Link
            className={`${props.className || ''} ${styles.link}`}
            href={props.href}
            locale={props.locale}
        >
            {props.label}
        </Link>
    )
}

export default LinkComponent
