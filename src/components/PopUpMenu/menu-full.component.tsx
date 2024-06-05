import styles from './menu-full.module.css'

export const PopUpMenuFullComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperContainer}>
                <div className={styles.header}>
                    <div>Отмена</div>
                    <div>Title</div>
                    <div>Готово</div>
                </div>
            </div>
        </div>
    )
}
