import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [user, setUser] = useState(WebApp.initDataUnsafe?.user || null)

  useEffect(() => {
    // Ждем, пока SDK будет готово
    WebApp.ready()

    // Пример получения данных пользователя
    if (WebApp.initDataUnsafe?.user) {
      setUser(WebApp.initDataUnsafe.user)
    }
  }, [])

  const showMainButton = (text: string, onClick: () => void) => {
    WebApp.MainButton.setText(text)
    WebApp.MainButton.show()
    WebApp.MainButton.onClick(onClick)
  }

  const hideMainButton = () => {
    WebApp.MainButton.hide()
    WebApp.MainButton.offClick(() => {})
  }

  return {
    tg: WebApp,
    user,
    showMainButton,
    hideMainButton
  }
}
