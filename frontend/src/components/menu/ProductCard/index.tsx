import React from 'react'
import { Product } from '../../../types/api'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div>{product.name}</div>
      <div>{Number(product.price).toFixed(2)} ₽</div>
      <Link to={`/products/${product.id}`}>Подробнее</Link>
    </div>
  )
}
