import React from 'react'

// STATUS_CONFIG intentionally omits 'Customs Hold' to reproduce the
// bug described in GitHub Issue #1. International shipments with this
// status will render "undefined" in the badge. Fix: add the missing entry.
const STATUS_CONFIG = {
  'In Transit':       { label: 'In Transit',       color: 'blue'   },
  'Delivered':        { label: 'Delivered',         color: 'green'  },
  'Delayed':          { label: 'Delayed',           color: 'red'    },
  'Out for Delivery': { label: 'Out for Delivery',  color: 'orange' },
  'Processing':       { label: 'Processing',        color: 'gray'   },
  // 'Customs Hold' is missing — see GitHub Issue #1
}

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || {}
  return (
    <span className={`status-badge status-badge--${config.color}`}>
      {config.label}
    </span>
  )
}
