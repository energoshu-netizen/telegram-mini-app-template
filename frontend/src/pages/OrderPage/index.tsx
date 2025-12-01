import React from 'react'
import Header from '../../components/common/Header'
import { useCartContext } from '../../context/CartContext'
import { createOrder } from '../../services/api'
import { useTelegram } from '../../hooks/useTelegram'

export default function OrderPage() {
  const { items, total } = useCartContext()
  const { showMainButton, hideMainButton } = useTelegram()
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const submit = async () => {
    try {
      setLoading(true)
      setError(null)
      const payload = {
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity, optionIds: i.optionIds })),
        currency: 'RUB'
      }
      const r = await createOrder(payload)
      setResult(`Заказ создан #${r.orderId}`)
    } catch (e: any) {
      setError(e?.message || 'Ошибка оформления')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    showMainButton('Оформить', submit)
    return () => hideMainButton()
  }, [])

  return (
    <div>
      <Header />
      <h3>Оформление</h3>
      <div>Итого: {total.toFixed(2)} ₽</div>
      <button disabled={loading} onClick={submit}>Оформить</button>
      {result && <div>{result}</div>}
      {error && <div>{error}</div>}
    </div>
  )
}
