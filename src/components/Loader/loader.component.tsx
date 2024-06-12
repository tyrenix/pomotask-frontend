import styles from './loader.module.css'

export interface ILoaderProps {
    mainColor?: string
    secondaryColor?: string
    size?: {
        w: string
        h: string
    }
}

export default function LoaderComponent({
    mainColor = 'border-accent',
    secondaryColor = 'border-b-transparent',
    size = {w: 'w-12', h: 'h-12'}
}: ILoaderProps) {
    return (
        <div
            className={`${styles.wrapper} ${mainColor} ${secondaryColor} ${size?.w} ${size?.h}`}
        />
    )
}
