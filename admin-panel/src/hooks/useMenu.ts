import React from 'react'
import { fetchMenu, updateProduct } from '../services/adminApi'

export const useMenu = () => {
  const [data, setData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)

  const load = async () => {
    setLoading(true)
    const d = await fetchMenu()
    setData(d)
    setLoading(false)
  }

  React.useEffect(() => {
    load()
  }, [])

  const saveProduct = async (id: number, patch: any) => {
    await updateProduct(id, patch)
    await load()
  }

  return { data, loading, load, saveProduct }
}
