import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Invoices from './pages/Invoices'

import { Sidebar } from './components'
import Drawer from './components/Drawer'

import data from './data'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [invoices, setInvoices] = useState(data)
  const [formValues, setFormValues] = useState({})

  return (
    <div className="app-container">
      <Sidebar/>
      <Drawer isDrawerOpen={isDrawerOpen} invoices={invoices} setInvoices={setInvoices} setIsDrawerOpen={setIsDrawerOpen} formValues={formValues} />
      <main className="app-main">
        <Routes>
          <Route path="invoices" element={
            <Invoices setIsDrawerOpen={setIsDrawerOpen} 
                      invoices={invoices}
                      setInvoices={setInvoices}
                      setFormValues={setFormValues}/>}>
            <Route path=":invoiceId" element={
              <Invoices setIsDrawerOpen={setIsDrawerOpen} 
                        invoices={invoices}
                        setInvoices={setInvoices}
                        setFormValues={setFormValues}/>}/>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
