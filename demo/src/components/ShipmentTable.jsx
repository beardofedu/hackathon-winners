import React, { useState } from 'react'
import { shipments } from '../data/shipments'
import StatusBadge from './StatusBadge'

const COLUMNS = [
  { key: 'id',          label: 'Tracking #' },
  { key: 'customer',    label: 'Customer'   },
  { key: 'origin',      label: 'Origin'     },
  { key: 'destination', label: 'Destination'},
  { key: 'status',      label: 'Status'     },
  { key: 'carrier',     label: 'Carrier'    },
  { key: 'eta',         label: 'Est. Delivery'},
]

function locationStr(loc) {
  if (loc.country !== 'US') return `${loc.city}, ${loc.state}, ${loc.country}`
  return `${loc.city}, ${loc.state}`
}

export default function ShipmentTable({ onSelect, selectedId }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [statusFilter, setStatusFilter] = useState('All')

  const allStatuses = ['All', ...new Set(shipments.map(s => s.status))]

  const filtered = shipments
    .filter(s => {
      const q = search.toLowerCase()
      return (
        s.id.toLowerCase().includes(q) ||
        s.customer.toLowerCase().includes(q) ||
        s.carrier.toLowerCase().includes(q) ||
        locationStr(s.origin).toLowerCase().includes(q) ||
        locationStr(s.destination).toLowerCase().includes(q)
      )
    })
    .filter(s => statusFilter === 'All' || s.status === statusFilter)
    .sort((a, b) => {
      let av, bv
      if (sortKey === 'origin')      { av = locationStr(a.origin);      bv = locationStr(b.origin) }
      else if (sortKey === 'destination') { av = locationStr(a.destination); bv = locationStr(b.destination) }
      else if (sortKey === 'eta')    { av = a.estimatedDelivery;         bv = b.estimatedDelivery }
      else                           { av = a[sortKey] ?? '';            bv = b[sortKey] ?? '' }
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  function sortIcon(key) {
    if (sortKey !== key) return <span className="sort-icon sort-icon--inactive">↕</span>
    return <span className="sort-icon">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="table-container">
      <div className="table-toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Search by tracking #, customer, carrier, or location…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="status-filters">
          {allStatuses.map(s => (
            <button
              key={s}
              className={`filter-btn ${statusFilter === s ? 'filter-btn--active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <table className="shipment-table">
        <thead>
          <tr>
            {COLUMNS.map(col => (
              <th key={col.key} onClick={() => handleSort(col.key)} className="sortable-th">
                {col.label} {sortIcon(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={7} className="empty-row">No shipments match your search.</td></tr>
          ) : (
            filtered.map(s => (
              <tr
                key={s.id}
                className={`shipment-row ${selectedId === s.id ? 'shipment-row--selected' : ''}`}
                onClick={() => onSelect(s)}
              >
                <td className="td-tracking">{s.id}</td>
                <td>{s.customer}</td>
                <td>{locationStr(s.origin)}</td>
                <td>{locationStr(s.destination)}</td>
                <td><StatusBadge status={s.status} /></td>
                <td>{s.carrier}</td>
                <td>{s.estimatedDelivery}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="table-footer">{filtered.length} of {shipments.length} shipments</div>
    </div>
  )
}
