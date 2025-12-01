import React from 'react'

const colors: Record<string, string> = {
  pending: '#888',
  paid: '#3b82f6',
  preparing: '#f59e0b',
  ready: '#10b981',
  completed: '#22c55e',
  cancelled: '#ef4444',
  new: '#3b82f6'
}

export default function StatusBadge({ status }: { status: string }) {
  const color = colors[status] || '#999'
  return <span style={{ background: color, color: '#fff', padding: '2px 6px', borderRadius: 6 }}>{status}</span>
}
