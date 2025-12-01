import React from 'react'

export default function SimpleChart({ points }: { points: number[] }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 80 }}>
      {points.map((p, i) => (
        <div key={i} style={{ width: 20, height: Math.max(4, p), background: '#3b82f6' }} />
      ))}
    </div>
  )
}
