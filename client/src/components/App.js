import { Routes, Route } from 'react-router-dom'

import Invoices from '../pages/Invoices'

function App() {
  return (
    <div className="app-container">
      <aside className="app-sidebar"></aside>
      <main className="app-main">
        <Routes>
          <Route path="invoices" element={<Invoices/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
