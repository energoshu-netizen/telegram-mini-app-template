import '@twa-dev/sdk'
import React from 'react'

export const useTelegram = () => {
  const tg = (window as any).Telegram?.WebApp
  const user = tg?.initDataUnsafe?.user || null

  const showMainButton = (text: string, onClick: () => void) => {
    if (!tg) return
    tg.MainButton.setText(text)
    tg.MainButton.show()
    tg.MainButton.onClick(onClick)
  }

  const hideMainButton = () => {
    if (!tg) return
    tg.MainButton.hide()
    tg.MainButton.offClick(() => {})
  }

  return { tg, user, showMainButton, hideMainButton }
}
