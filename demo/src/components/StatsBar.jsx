import React from 'react'
import { shipments } from '../data/shipments'

const STATS = [
  { label: 'In Transit',       color: 'blue',   icon: '🚛' },
  { label: 'Out for Delivery', color: 'orange', icon: '📬' },
  { label: 'Delayed',          color: 'red',    icon: '⚠️'  },
  { label: 'Delivered',        color: 'green',  icon: '✅'  },
  { label: 'Processing',       color: 'gray',   icon: '⏳'  },
  { label: 'Customs Hold',     color: 'purple', icon: '🛃'  },
]

export default function StatsBar() {
  const counts = shipments.reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="stats-bar">
      {STATS.map(({ label, color, icon }) => (
        <div key={label} className={`stat-card stat-card--${color}`}>
          <div className="stat-icon">{icon}</div>
          <div className="stat-count">{counts[label] || 0}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  )
}
