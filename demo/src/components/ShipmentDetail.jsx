import React from 'react'
import StatusBadge from './StatusBadge'

function locationStr(loc) {
  if (loc.country !== 'US') return `${loc.city}, ${loc.state}, ${loc.country}`
  return `${loc.city}, ${loc.state}`
}

export default function ShipmentDetail({ shipment, onClose }) {
  if (!shipment) return null

  return (
    <aside className="detail-panel">
      <div className="detail-header">
        <div>
          <div className="detail-tracking">{shipment.id}</div>
          <StatusBadge status={shipment.status} />
        </div>
        <button className="detail-close" onClick={onClose}>✕</button>
      </div>

      <div className="detail-section">
        <h3 className="detail-section-title">Route</h3>
        <div className="detail-route">
          <div className="route-point">
            <div className="route-label">Origin</div>
            <div className="route-city">{locationStr(shipment.origin)}</div>
          </div>
          <div className="route-arrow">→</div>
          <div className="route-point">
            <div className="route-label">Destination</div>
            <div className="route-city">{locationStr(shipment.destination)}</div>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h3 className="detail-section-title">Shipment Info</h3>
        <dl className="detail-grid">
          <dt>Customer</dt>        <dd>{shipment.customer}</dd>
          <dt>Reference</dt>       <dd>{shipment.reference}</dd>
          <dt>Carrier</dt>         <dd>{shipment.carrier}</dd>
          <dt>Service</dt>         <dd>{shipment.service}</dd>
          <dt>Weight</dt>          <dd>{shipment.weight}</dd>
          <dt>Dimensions</dt>      <dd>{shipment.dimensions}</dd>
          <dt>Est. Delivery</dt>   <dd>{shipment.estimatedDelivery}</dd>
          <dt>Last Location</dt>   <dd>{shipment.lastLocation}</dd>
        </dl>
      </div>

      <div className="detail-section">
        <h3 className="detail-section-title">Tracking Events</h3>
        <ol className="event-timeline">
          {[...shipment.events].reverse().map((ev, i) => (
            <li key={i} className="event-item">
              <div className="event-dot" />
              <div className="event-body">
                <div className="event-description">{ev.description}</div>
                <div className="event-meta">
                  {ev.location} · {new Date(ev.timestamp).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
