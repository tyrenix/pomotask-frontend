export interface IPomodoroSettings {
    pomodoro: number
    longBreak: number
    shortBreak: number
    longBreakFrequency: number
    workingTime: number
}

export interface IUpdatePomodoroSettings extends Partial<IPomodoroSettings> {}
