import React from 'react'
import { Category, Product } from '../../../types/api'
import ProductCard from '../ProductCard'

export default function CategoryList({ data }: { data: Array<Category & { products: Product[] }> }) {
  return (
    <div>
      {data.map((c) => (
        <section key={c.id}>
          <h3>{c.name}</h3>
          <div>
            {c.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
