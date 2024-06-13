'use client'

import {soundConstant} from '@/constants/sound.constant'
import {Howl} from 'howler'
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useRef
} from 'react'

interface ISoundContext {
    playTaskClick(): void
    playTimerCompletion(): void
}

const SoundContext = createContext<ISoundContext | null>(null)

export const SoundProvider = ({children}: PropsWithChildren) => {
    const taskClickRef = useRef<Howl | null>(null)
    const timerCompletionRef = useRef<Howl | null>(null)

    useEffect(() => {
        taskClickRef.current = new Howl({src: soundConstant.TASK_CLICK})
        timerCompletionRef.current = new Howl({
            src: soundConstant.TIMER_COMPLETION
        })

        return () => {
            taskClickRef.current?.unload()
            timerCompletionRef.current?.unload()
        }
    }, [])

    const playTaskClick = useCallback(() => taskClickRef.current?.play(), [])

    const playTimerCompletion = useCallback(
        () => timerCompletionRef.current?.play(),
        []
    )

    return (
        <SoundContext.Provider
            value={{
                playTaskClick,
                playTimerCompletion
            }}
        >
            {children}
        </SoundContext.Provider>
    )
}

export const useSound = () => useContext(SoundContext) as ISoundContext
