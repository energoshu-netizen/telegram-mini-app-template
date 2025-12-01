import crypto from 'crypto'

export const verifyTelegramInitData = (initData: string, botToken: string): boolean => {
  try {
    const params = new URLSearchParams(initData)
    const hash = params.get('hash') || ''
    params.delete('hash')
    const dataCheckString = Array.from(params.keys())
      .sort()
      .map((k) => `${k}=${params.get(k)}`)
      .join('\n')

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest()
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex')
    return hmac === hash
  } catch {
    return false
  }
}
