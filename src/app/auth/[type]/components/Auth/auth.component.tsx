'use client'

import {toast} from 'sonner'
import {useEffect, useState} from 'react'
import {useTranslations} from 'next-intl'
import {useRouter} from 'next/navigation'
import {SubmitHandler, useForm, useWatch} from 'react-hook-form'
import {useMutation} from '@tanstack/react-query'
import type {IAuthForm} from '@/types/auth.types'
import InputComponent from '@/components/Input/input.component'
import FillButtonComponent from '@/components/Button/fill-button.component'
import LogoComponent from '@/components/Logo/logo.component'
import LinkComponent from '@/components/Link/link.component'
import {authService} from '@/services/auth.service'
import {dashboardConstant} from '@/constants/dashboard.constant'

import styles from './styles.module.css'

export interface IAuthProps {
    type: 'register' | 'login'
}

export const AuthComponent = ({type}: IAuthProps) => {
    const t = useTranslations('Auth')
    const router = useRouter()

    const {register, handleSubmit, control, formState} = useForm<IAuthForm>()
    const watchFields = useWatch({control})

    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        setIsError(false)
    }, [watchFields])

    const {mutate, isPending} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IAuthForm) => authService.main(type, data),
        onError(err: string) {
            toast.error(err)
            setIsError(true)
        },
        onSuccess() {
            toast.success(t('success'))
            router.replace(
                type === 'login'
                    ? dashboardConstant.APP_PAGE
                    : dashboardConstant.WELCOME_PAGE
            )
        }
    })

    const onSubmit: SubmitHandler<IAuthForm> = async (data: IAuthForm) => {
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
                        error={isError}
                        {...register('email', {required: true})}
                    />
                    <InputComponent
                        id='passwordForm'
                        type='password'
                        label={t('form.enter-password')}
                        disabled={isPending}
                        error={
                            isError ||
                            (formState.errors?.password &&
                                t(
                                    `form.errors.password.${formState.errors?.password?.type}`
                                ))
                        }
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
                        disabled={
                            isError || !!Object.keys(formState.errors).length
                        }
                    />
                    <div className={styles.changeMethodWrapper}>
                        <span>
                            {t(
                                `form.${
                                    type === 'register'
                                        ? 'change-to-login'
                                        : 'change-to-register'
                                }`
                            )}
                        </span>
                        <LinkComponent
                            href={
                                type === 'register'
                                    ? dashboardConstant.LOGIN_PAGE
                                    : dashboardConstant.REGISTER_PAGE
                            }
                            label={t(
                                `form.${
                                    type === 'register' ? 'login' : 'register'
                                }`
                            )}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
