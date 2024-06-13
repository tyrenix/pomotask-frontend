class SoundConstant {
    private readonly PREFIX: string = '/sounds'
    readonly TASK_CLICK: string = `${this.PREFIX}/task-click.wav`
    readonly TIMER_COMPLETION: string = `${this.PREFIX}/timer-completion.wav`
}

export const soundConstant = new SoundConstant()
