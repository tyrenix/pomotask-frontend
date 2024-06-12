'use client'

import type {ChangeEvent} from 'react'
import {useRouter} from 'next/navigation'
import {useLocale} from 'next-intl'
import {Moon as MoonIcon, Sun as SunIcon} from 'lucide-react'
import {setCookie} from 'cookies-next'
import {cookieConstant} from '@/constants/cookie.constant'

import styles from './style.module.css'

type Theme = 'light' | 'dark' | 'system'
interface IProps {
    theme: Theme
}

const HeaderComponent = (props: IProps) => {
    const locale = useLocale()
    const router = useRouter()

    const themeChange = () => {
        const setCookieTheme = (theme: Theme) =>
            setCookie(cookieConstant.THEME, theme, {
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
        setCookie(cookieConstant.LOCALE, e.target.value, {
            expires: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 30 * 356)
        })
        router.refresh()
    }

    return (
        <header className={styles.wrapper}>
            <div className={styles.buttonWrapper} onClick={themeChange}>
                {props.theme === 'light' ? (
                    <MoonIcon />
                ) : props.theme === 'dark' ? (
                    'A'
                ) : (
                    <SunIcon />
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
