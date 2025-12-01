import React from 'react'

export default function Button({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button disabled={disabled} onClick={onClick} style={{ padding: '8px 12px' }}>
      {children}
    </button>
  )
}
