'use client'

import {useTranslations} from 'next-intl'
import {SubmitHandler, useForm} from 'react-hook-form'
import InputComponent from '@/components/Input/input.component'
import type {IAuthForm} from '@/types/auth.types'
import LogoComponent from '@/components/Logo/logo.component'
import FillButtonComponent from '@/components/Button/fill-button.component'
import LinkComponent from '@/components/Link/link.component'
import styles from './styles.module.css'
import {useMutation} from '@tanstack/react-query'
import {authService} from '@/services/auth.service'

export interface IAuthProps {
    type: 'register' | 'login'
}

export default function AuthComponent({type}: IAuthProps) {
    const t = useTranslations('Auth')
    const {register, handleSubmit, reset, setError} = useForm<IAuthForm>()

    const {mutate, isPending} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) =>
            new Promise(async () =>
                setTimeout(() => authService.main(type, data), 1e3 * 5)
            ),
        onError(error) {
            console.log(error)
        },
        onSuccess() {
            console.log('Success!')
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = (data: IAuthForm) => {
        mutate(data)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.wrapper}>
                <LogoComponent
                    className='w-40 h-40'
                    backgroundColor='bg-transparent'
                />
                <h2 className={styles.formTitle}>{t(type)}</h2>
                <div className={styles.inputsWrapper}>
                    <InputComponent
                        id='emailForm'
                        type='email'
                        label={t('form.enter-email')}
                        disabled={isPending}
                        {...register('email', {required: true})}
                    />
                    <InputComponent
                        id='passwordForm'
                        type='password'
                        label={t('form.enter-password')}
                        disabled={isPending}
                        {...register('password', {
                            required: true,
                            minLength: 8,
                            maxLength: 16
                        })}
                    />
                </div>
                <div className={styles.buttonsWrapper}>
                    <FillButtonComponent
                        label={t(`form.${type}`)}
                        loading={isPending}
                    />
                    <div className={styles.changeMethodWrapper}>
                        <span>
                            {t(
                                `form.${type === 'register' ? 'change-to-login' : 'change-to-register'}`
                            )}
                        </span>
                        <LinkComponent
                            href={`/app/auth/${type === 'register' ? 'login' : 'register'}`}
                            label={t(
                                `form.${type === 'register' ? 'login' : 'register'}`
                            )}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
