class DashboardConstant {
    readonly PREFIX_APP_PAGE: string = '/app'

    readonly PREFIX_AUTH_PAGE: string = '/auth'
    readonly AUTH_PAGE: string = this.PREFIX_AUTH_PAGE + '/login'
    readonly LOGIN_PAGE: string = this.PREFIX_APP_PAGE + '/login'
    readonly REGISTER_PAGE: string = this.PREFIX_AUTH_PAGE + '/register'

    readonly WELCOME_PAGE: string = this.PREFIX_APP_PAGE + '/welcome'
    readonly PROFILE_PAGE: string = this.PREFIX_APP_PAGE + '/profile'
    readonly TASKS_PAGE: string = this.PREFIX_APP_PAGE + '/tasks'
    readonly POMODORO_PAGE: string = this.PREFIX_APP_PAGE + '/pomodoro'
    readonly APP_PAGE: string = this.POMODORO_PAGE
}

export const dashboardConstant = new DashboardConstant()
