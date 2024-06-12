import {IUpdateTask} from '@/types/task.types'
import debounce from 'lodash.debounce'
import {useCallback, useEffect} from 'react'
import {UseFormWatch} from 'react-hook-form'
import {useUpdateTask} from './useUpdateTask.hook'

interface IUseTaskDebounce {
    watch: UseFormWatch<IUpdateTask>
    taskId: string
}

export function useTaskDebounce({watch, taskId}: IUseTaskDebounce) {
    const {mutate} = useUpdateTask()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedUpdateTask = useCallback(
        debounce(
            ({taskId, formData}: {taskId: string; formData: IUpdateTask}) => {
                mutate({taskId, data: formData})
            },
            444
        ),
        []
    )

    useEffect(() => {
        if (taskId) {
            const {unsubscribe} = watch(formData => {
                debouncedUpdateTask({
                    taskId,
                    formData
                })
            })

            return () => {
                unsubscribe()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId, watch(), debouncedUpdateTask])
}
