import { useParams } from 'react-router-dom'
import { Button } from '../components/UI'
import { InvoiceList, EmptyState, Invoice } from '../components'
import iconPlusPath from '../assets/icon-plus.svg'

import data from '../data'

function Invoices() {
  const invoices = data
  const totalInvoices = data.length
  const { invoiceId } = useParams()

  if (invoiceId) {
    // Find the invoice for the relevant id
    const invoice = invoices.find(invoice => invoice.id === invoiceId)
    return <Invoice invoice={invoice} />
  }
  return (
    <div className="invoices">
      <header className="invoices__header">
        <div>
          <h1>Invoices</h1>
          {totalInvoices === 0 ? <small>No invoices</small> : <small>There are {totalInvoices} total invoices</small>}
        </div>
        <div>
          <Button type="button" icon={iconPlusPath}>New Invoice</Button>
        </div>
      </header>
      <section className="invoices__body">
        {totalInvoices === 0 ? <EmptyState/> : <InvoiceList invoices={invoices}/>}
      </section>
    </div>
  )
}

export default Invoices





// import { Button, Field, Status } from "../components/UI"
// import iconPlusPath from '../assets/icon-plus.svg'
      {/* <Button type="button">Mark as Paid</Button>
      <Button type="button" icon={iconPlusPath}>New Invoice</Button>
      <Button type="button" variant="danger">Delete</Button>
      <Button type="button" variant="dark">Edit</Button>
      <Field type="text" id="address" name="address" label="Street Address"/>
      <Status label="paid"/>
      <Status label="pending"/>
      <Status label="draft"/> */}