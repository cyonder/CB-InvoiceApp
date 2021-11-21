import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Invoices from './pages/Invoices'

import { Sidebar, Drawer } from './components'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="app-container">
      <Sidebar/>
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}/>
      <main className="app-main">
        <Routes>
          <Route path="invoices" element={<Invoices setIsDrawerOpen={setIsDrawerOpen}/>}>
            <Route path=":invoiceId" element={<Invoices setIsDrawerOpen={setIsDrawerOpen}/>}/>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
