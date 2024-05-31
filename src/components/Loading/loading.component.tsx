import styles from './style.module.css'

interface IProps {
    className?: string
}

const LoadingComponent = (props: IProps) => {
    return (
        <div className={`${styles.wrapper} ${props.className}`}>
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}

export default LoadingComponent
