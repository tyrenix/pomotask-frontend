import FillButtonComponent from '@/components/Button/fill-button.component'
import {CheckBoxTaskComponent} from '@/components/CheckBox'
import {ListComponent} from '@/components/List/list.component'
import {PopUpMenuComponent} from '@/components/PopUpMenu/popup-menu.component'
import {taskService} from '@/services/task.service'
import {ICreateTask} from '@/types/task.types'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import clsx from 'clsx'
import {useTranslations} from 'next-intl'
import {useEffect} from 'react'
import Textarea from 'react-expanding-textarea'
import {useForm} from 'react-hook-form'

import styles from './add-task.module.css'
import {toast} from 'sonner'

interface IProps {
    isOpen: boolean
    onClose: () => any
}

export const AddTaskComponent = ({isOpen, ...props}: IProps) => {
    const queryClient = useQueryClient()

    const t = useTranslations('Task')

    const {register, getValues, watch, reset} = useForm<ICreateTask>()
    const {mutate, isPending} = useMutation({
        mutationKey: ['create-task'],
        mutationFn: (data: ICreateTask) => taskService.createTask(data),
        onSuccess() {
            onClose()
            toast.success(t('create.success'))
            queryClient.invalidateQueries({queryKey: ['tasks']})
        },
        onError() {
            toast.error(t('create.error'))
        }
    })

    useEffect(() => {
        if (isOpen) {
            watch()
        }
    }, [isOpen])

    const onClose = () => {
        reset({description: '', title: ''})
        props.onClose()
    }

    const addTask = () => {
        const data = getValues()
        mutate(data)
    }

    return (
        <PopUpMenuComponent
            className='flex flex-col gap-8 pb-standard'
            isOpen={isOpen}
            onClose={onClose}
            title={t('create.title')}
            type='small'
        >
            <ListComponent>
                <div className={styles.wrapperTitle}>
                    <div className={styles.wrapperCompletedBox}>
                        <CheckBoxTaskComponent isCompleted={false} />
                    </div>
                    <div className={styles.wrapperTitleDescription}>
                        <Textarea
                            placeholder={t('enterDescription')}
                            {...register('title')}
                        />
                    </div>
                </div>
                <div className={styles.wrapperDescription}>
                    <Textarea
                        placeholder={t('enterDescription')}
                        {...register('description')}
                    />
                    <span
                        className={clsx(
                            (getValues('description')?.length || 0) > 1500
                                ? 'text-red-500'
                                : 'text-primaryInvert-50'
                        )}
                    >
                        {getValues('description')?.length || 0}/1500
                    </span>
                </div>
            </ListComponent>
            <FillButtonComponent
                label={t('create.createButton')}
                loading={isPending}
                disabled={(getValues('title')?.length || 0) === 0}
                onClick={addTask}
            />
        </PopUpMenuComponent>
    )
}
