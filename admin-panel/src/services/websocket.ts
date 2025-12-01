export const connectOrdersWS = (onMessage: (msg: any) => void) => {
  try {
    const url = (import.meta as any).env?.VITE_WS_BASE_URL || 'ws://localhost:8080/ws/orders'
    const ws = new WebSocket(url)
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        onMessage(data)
      } catch {}
    }
    return () => ws.close()
  } catch {
    return () => {}
  }
}
