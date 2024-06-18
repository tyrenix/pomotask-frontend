'use client'

import {axiosWithAuth} from '@/interceptors/axios.interceptor'

class NotificationService {
    private readonly PREFIX: string = '/notification'

    async subscribe() {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.register(
                '/sw.js'
            )

            if ('PushManager' in window) {
                const isSubscription =
                    await registration.pushManager.getSubscription()
                if (!isSubscription) {
                    const subscription =
                        await registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: (
                                await this.getPublicKey()
                            ).publicKey
                        })

                    await axiosWithAuth.post(
                        `${this.PREFIX}/subscribe`,
                        subscription
                    )
                }
            }
        }
    }

    async getPublicKey() {
        const response = await axiosWithAuth.get<{publicKey: string}>(
            `${this.PREFIX}/public-key`
        )

        return response.data
    }
}

export const notificationService = new NotificationService()
