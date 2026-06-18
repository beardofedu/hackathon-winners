import React from 'react'

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-logo">📦</span>
          <div>
            <div className="header-title">Belcher Freight Co.</div>
            <div className="header-subtitle">Shipment Management Portal</div>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link nav-link--active">Dashboard</a>
          <a href="#" className="nav-link">Reports</a>
          <a href="#" className="nav-link">Customers</a>
          <a href="#" className="nav-link">Settings</a>
        </nav>
        <div className="header-user">
          <span className="user-avatar">BB</span>
          <span className="user-name">Bob Belcher</span>
        </div>
      </div>
    </header>
  )
}
