import React from 'react'
import Header from '../../components/common/Header'
import Loader from '../../components/common/Loader'
import CategoryList from '../../components/menu/CategoryList'
import { fetchMenu } from '../../services/api'

export default function MenuPage() {
  const [data, setData] = React.useState<any[] | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetchMenu()
      .then((d) => setData(d))
      .catch(() => setError('Ошибка загрузки меню'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Header />
      {loading && <Loader />}
      {error && <div>{error}</div>}
      {data && <CategoryList data={data} />}
    </div>
  )
}
