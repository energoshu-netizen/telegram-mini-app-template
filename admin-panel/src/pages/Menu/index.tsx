import React from 'react'
import Layout from '../../components/layout/Layout'
import { useMenu } from '../../hooks/useMenu'
import Button from '../../components/ui/Button'

export default function MenuPage() {
  const { data, loading, saveProduct } = useMenu()
  const [editing, setEditing] = React.useState<{ id: number; price: string; name: string } | null>(null)

  const startEdit = (p: any) => setEditing({ id: p.id, price: String(p.price), name: p.name })
  const commit = async () => {
    if (editing) {
      await saveProduct(editing.id, { price: editing.price, name: editing.name })
      setEditing(null)
    }
  }

  return (
    <Layout>
      <h2>Меню</h2>
      {loading && <div>Загрузка...</div>}
      {data.map((c: any) => (
        <section key={c.id}>
          <h3>{c.name}</h3>
          {c.products.map((p: any) => (
            <div key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div>{p.name}</div>
              <div>{Number(p.price).toFixed(2)} ₽</div>
              <Button onClick={() => startEdit(p)}>Редактировать</Button>
            </div>
          ))}
        </section>
      ))}
      {editing && (
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          <input value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
          <Button onClick={commit}>Сохранить</Button>
        </div>
      )}
    </Layout>
  )
}
