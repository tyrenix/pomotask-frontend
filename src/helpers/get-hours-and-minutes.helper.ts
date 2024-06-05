export const getHoursAndMinutes = (
    seconds: number,
    options: {mins?: string; hours?: string} = {hours: 'h', mins: 'min'}
): {hours: number; minutes: number; string: string} => {
    const hours = Math.floor(seconds / 60 / 60)
    const minutes = Math.floor((seconds - hours * 60 * 60) / 60)

    let string: string = ''
    if (hours) {
        string = `${hours}${options.hours} ${minutes}${options.mins}`
    } else {
        string = `${minutes}${options.mins}`
    }

    return {
        hours,
        minutes,
        string
    }
}
