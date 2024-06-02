'use client'

import {type ChangeEvent, useState} from 'react'
import {useLocale} from 'next-intl'
import {CgMoon, CgSun} from 'react-icons/cg'
import {setCookie} from 'cookies-next'
import {usePathname, useRouter} from '@/navigation'
import styles from './style.module.css'

type Theme = 'light' | 'dark' | 'system'
interface IProps {
    theme: Theme
}

const HeaderComponent = (props: IProps) => {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

    const themeChange = () => {
        const setCookieTheme = (theme: Theme) =>
            setCookie('theme', theme, {
                expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 30 * 356)
            })

        if (props.theme === 'light') {
            setCookieTheme('dark')
        } else if (props.theme === 'dark') {
            setCookieTheme('system')
        } else {
            setCookieTheme('light')
        }

        router.refresh()
    }

    const languageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        router.replace(pathname, {locale: e.target.value})
    }

    return (
        <header className={styles.wrapper}>
            <div className={styles.buttonWrapper} onClick={themeChange}>
                {props.theme === 'light' ? (
                    <CgMoon />
                ) : props.theme === 'dark' ? (
                    'A'
                ) : (
                    <CgSun />
                )}
            </div>
            <div className={styles.buttonWrapper}>
                <select value={locale} onChange={languageChange}>
                    <option value='ru'>RU</option>
                    <option value='en'>EN</option>
                </select>
            </div>
        </header>
    )
}

export default HeaderComponent
