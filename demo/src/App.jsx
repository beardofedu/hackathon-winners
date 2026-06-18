import React, { useState } from 'react'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import ShipmentTable from './components/ShipmentTable'
import ShipmentDetail from './components/ShipmentDetail'
import './App.css'

export default function App() {
  const [selectedShipment, setSelectedShipment] = useState(null)

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <div className="page-header">
          <h1 className="page-title">Shipment Dashboard</h1>
          <p className="page-subtitle">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <StatsBar />
        <div className={`content-layout ${selectedShipment ? 'content-layout--split' : ''}`}>
          <ShipmentTable
            onSelect={setSelectedShipment}
            selectedId={selectedShipment?.id}
          />
          {selectedShipment && (
            <ShipmentDetail
              shipment={selectedShipment}
              onClose={() => setSelectedShipment(null)}
            />
          )}
        </div>
      </main>
    </div>
  )
}
