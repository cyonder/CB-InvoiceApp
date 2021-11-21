import { Link } from 'react-router-dom'

import { Status } from '../UI'
import './InvoiceList.scss'

function InvoiceList ({ invoices }) {
  const renderInvoiceList = () => {
    return invoices.map(invoice => (
      <Link to={`${invoice.id}`} className="invoice-list__item" key={invoice.id}>
        <span className="item__id">
          <span className="item__id-mark">#</span>{invoice.id}
        </span>
        <span>Due {invoice.paymentDue}</span>
        <span className="item__client-name">{invoice.clientName}</span>
        <span className="item__total">{invoice.total}</span>
        <span><Status label={invoice.status}/></span>
        <span className="item__arrow"></span>
      </Link>
    ))
  }

  return (
    <div className="invoice-list">
      {renderInvoiceList()}
    </div>
  )
}

export default InvoiceList