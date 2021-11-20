import { Routes, Route } from 'react-router-dom'

import Invoices from './pages/Invoices'

import { Sidebar } from './components'

function App() {
  return (
    <div className="app-container">
      <Sidebar/>
      <main className="app-main">
        <Routes>
          <Route path="invoices" element={<Invoices/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App