import { useParams } from 'react-router-dom'
import { Button } from '../components/UI'
import { InvoiceList, EmptyState, Invoice } from '../components'
import iconPlusPath from '../assets/icon-plus.svg'

function Invoices({ setIsDrawerOpen, invoices, setInvoices, setFormValues }) {
  const totalInvoices = invoices.length
  const { invoiceId } = useParams()

  const handleClick = () => {
    setFormValues({})
    setIsDrawerOpen(true)
  }

  if (invoiceId) {
    // Find the invoice for the relevant id
    const invoice = invoices.find(invoice => invoice.id === invoiceId)
    if (invoice) {
      return <Invoice invoice={invoice} invoices={invoices} setIsDrawerOpen={setIsDrawerOpen} setInvoices={setInvoices} setFormValues={setFormValues} />
    }
    return <span style={{color: 'white'}}>There is no Invoice with this ID</span>
  }
  return (
    <div className="invoices">
      <header className="invoices__header">
        <div>
          <h1>Invoices</h1>
          {totalInvoices === 0 ? <small>No invoices</small> : <small>There are {totalInvoices} total invoices</small>}
        </div>
        <div>
          <Button type="button" icon={iconPlusPath} onClick={handleClick}>New Invoice</Button>
        </div>
      </header>
      <section className="invoices__body">
        {totalInvoices === 0 ? <EmptyState/> : <InvoiceList invoices={invoices}/>}
      </section>
    </div>
  )
}

export default Invoices