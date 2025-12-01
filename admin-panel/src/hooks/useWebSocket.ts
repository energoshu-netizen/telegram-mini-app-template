import React from 'react'

export const useWebSocket = (url: string, onMessage: (data: any) => void) => {
  React.useEffect(() => {
    let ws: WebSocket | null = null
    try {
      ws = new WebSocket(url)
      ws.onmessage = (e) => {
        try {
          const d = JSON.parse(e.data)
          onMessage(d)
        } catch {}
      }
    } catch {}
    return () => {
      ws?.close()
    }
  }, [url])
}
