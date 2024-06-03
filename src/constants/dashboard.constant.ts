class DashboardConstant {
    readonly APP_PAGE: string = '/app'
    readonly AUTH_PAGE: string = this.APP_PAGE + '/auth/login'
    readonly LOGIN_PAGE: string = this.APP_PAGE + '/auth/login'
    readonly REGISTER_PAGE: string = this.APP_PAGE + '/auth/register'
    readonly WELCOME_PAGE: string = this.APP_PAGE + '/welcome'
}

export const dashboardConstant = new DashboardConstant()
