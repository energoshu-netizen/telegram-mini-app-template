import React from 'react'
import { Product, ProductOption } from '../../../types/api'
import { useCartContext } from '../../../context/CartContext'

export default function ProductModal({ product, options, onClose }: { product: Product; options: ProductOption[]; onClose: () => void }) {
  const { addItem } = useCartContext()
  const [qty, setQty] = React.useState(1)
  const [selected, setSelected] = React.useState<number[]>([])

  const toggle = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const add = () => {
    addItem(product, qty, selected)
    onClose()
  }

  return (
    <div>
      <h3>{product.name}</h3>
      <div>{Number(product.price).toFixed(2)} ₽</div>
      <div>
        {options.map((o) => (
          <label key={o.id}>
            <input type="checkbox" checked={selected.includes(o.id)} onChange={() => toggle(o.id)} />
            {o.name} +{Number(o.price_delta).toFixed(2)} ₽
          </label>
        ))}
      </div>
      <div>
        <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
      </div>
      <button onClick={add}>Добавить</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  )
}
