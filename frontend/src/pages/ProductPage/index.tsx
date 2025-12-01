import React from 'react'
import Header from '../../components/common/Header'
import Loader from '../../components/common/Loader'
import ProductModal from '../../components/menu/ProductModal'
import { fetchProduct } from '../../services/api'
import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { id } = useParams()
  const pid = Number(id)
  const [data, setData] = React.useState<any | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    if (!Number.isFinite(pid)) {
      setError('Неверный товар')
      setLoading(false)
      return
    }
    fetchProduct(pid)
      .then((d) => setData(d))
      .catch(() => setError('Ошибка загрузки товара'))
      .finally(() => setLoading(false))
  }, [pid])

  return (
    <div>
      <Header />
      {loading && <Loader />}
      {error && <div>{error}</div>}
      {data && open && (
        <ProductModal product={data.product} options={data.options} onClose={() => setOpen(false)} />
      )}
      {data && !open && <div>Товар: {data.product.name}</div>}
    </div>
  )
}
