'use client'

import {toast} from 'sonner'
import {useTranslations} from 'next-intl'
import {useEffect, useState} from 'react'
import {SubmitHandler, useForm, useWatch} from 'react-hook-form'
import {useMutation} from '@tanstack/react-query'
import FillButtonComponent from '@/components/Button/fill-button.component'
import InputComponent from '@/components/Input/input.component'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {userService} from '@/services/user.service'
import {IUpdateUser} from '@/types/user.types'

import styles from './password.module.css'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const PasswordComponent = ({onClose, isOpen}: IProps) => {
    const t = useTranslations('Settings.password')
    const tAuth = useTranslations('Auth')

    const {register, handleSubmit, control, formState, reset} = useForm<{
        password: string
    }>()

    const [isError, setIsError] = useState<boolean>(false)
    const watcher = useWatch({control})

    useEffect(() => {
        setIsError(false)
    }, [watcher])

    const {mutate, isPending} = useMutation({
        mutationKey: ['auth'],
        mutationFn: (data: IUpdateUser) => userService.update(data),
        onError(err: string) {
            toast.error(err)
            setIsError(true)
        },
        onSuccess() {
            toast.success(t('passwordChange'))
            reset()
            onClose()
        }
    })

    const onSubmit: SubmitHandler<IUpdateUser> = async (data: IUpdateUser) => {
        mutate(data)
    }

    return (
        <PopUpMenuComponent
            isOpen={isOpen}
            onClose={onClose}
            type='full'
            title=''
        >
            <ListComponent>
                <form
                    className={styles.wrapperForm}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h4 className={styles.title}>{t('title')}</h4>
                    <div className={styles.wrapperInputs}>
                        <InputComponent
                            id='oldPassword'
                            label={t('enterOldPassword')}
                            type='password'
                        />
                        <InputComponent
                            id='newPassword'
                            label={t('enterNewPassword')}
                            type='password'
                            error={
                                isError ||
                                (formState.errors.password &&
                                    tAuth(
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
                    <FillButtonComponent
                        label={t('text')}
                        loading={isPending}
                        disabled={isError || !!formState.errors.password}
                    />
                </form>
            </ListComponent>
        </PopUpMenuComponent>
    )
}
