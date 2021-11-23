import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import './Invoice.scss'
import Modal from 'react-bootstrap/Modal'
import { Status, Button } from '../UI'

function Invoice ({ invoice, invoices, setIsDrawerOpen, setInvoices, setFormValues }) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const invoiceItems = invoice?.items || []

  const renderItems = () => {
    return invoiceItems.map((item, idx) => (
      <tr key={idx}>
        <td style={{textAlign: "left"}}>{item.name}</td>
        <td style={{textAlign: "center"}}>{item.quantity}</td>
        <td style={{textAlign: "center"}}>£{item.price}</td>
        <td style={{textAlign: "right"}}>£{item.total}</td>
      </tr>
    ))
  }

  const handleDeletion = () => {
    const newInvoices = invoices.filter(item => item.id !== invoice.id)
    setInvoices(newInvoices)
    navigate('/invoices')
  }

  const handleEdit = () => {
    setFormValues(invoice)
    setIsDrawerOpen(true)
  }

  const handleMarking = () => {
    const newInvoices = invoices.map(item => {
      if (item.id === invoice.id) {
        item.status = 'paid'
      }
      return item
    })
    setInvoices(newInvoices)
  }

  return (
    <>
      <Modal className="deletion-modal" show={isModalOpen} centered>
        <Modal.Header>
          <Modal.Title>
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete invoice #{invoice?.id}? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="dark" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button type="button" variant="danger" onClick={handleDeletion}>Delete</Button>
        </Modal.Footer>
      </Modal>
      <div className="invoice">
        <button onClick={() => navigate(-1)} type="button" className="go-back-button">
          <span>Go back</span>
        </button>
        <header className="invoice__header">
          <span className="invoice-status">
            <span>Status</span>
            <Status label={invoice.status}/>
          </span>
          <div className="invoice-actions">
            <Button type="button" variant="dark" onClick={handleEdit}>Edit</Button>
            <Button type="button" variant="danger" onClick={() => setIsModalOpen(true)}>Delete</Button>
            <Button type="button" onClick={handleMarking}>Mark as Paid</Button>
          </div>
        </header>
        <section className="invoice__body">
          <div className="invoice__details">
            <div className="sender-details">
              <div className="sender-heading">
                <span className="invoice-id">
                  <span className="invoice-id__mark">#</span>
                  {invoice.id}
                </span>
                <span className="invoice-description">{invoice.description}</span>
              </div>
              <div className="sender-address">
                <span>{invoice.senderAddress?.street}</span>
                <span>{invoice.senderAddress?.city}</span>
                <span>{invoice.senderAddress?.postCode}</span>
                <span>{invoice.senderAddress?.country}</span>
              </div>
            </div>
            <div className="client-details">
              <div className="col-1">
                <div className="invoice-date">
                  <span className="title">Invoice Date</span>
                  <span className="date">{dayjs(invoice.createdAt).format('DD MMM YYYY')}</span>
                </div>
                <div className="payment-due">
                  <span className="title">Payment Due</span>
                  <span className="date">{dayjs(invoice.paymentDue).format('DD MMM YYYY')}</span>
                </div>
              </div>
              <div className="col-2">
                <div className="title">Bill To</div>
                <div className="client-name">{invoice.clientName}</div>
                <div className="client-address">
                  <span>{invoice.clientAddress?.street}</span>
                  <span>{invoice.clientAddress?.city}</span>
                  <span>{invoice.clientAddress?.postCode}</span>
                  <span>{invoice.clientAddress?.country}</span>
                </div>
              </div>
              <div className="col-3">
                <div className="title">Sent To</div>
                <span>{invoice.clientEmail}</span>
              </div>
            </div>
          </div>
          <div className="invoice-table">
            <table>
              <thead>
                <tr>
                  <th style={{textAlign: "left"}}>Item Name</th>
                  <th style={{textAlign: "center"}}>QTY.</th>
                  <th style={{textAlign: "center"}}>Price</th>
                  <th style={{textAlign: "right"}}>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.length > 0 && renderItems()}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{textAlign: "left"}}>Amount Due</td>
                  <td></td>
                  <td></td>
                  <td style={{textAlign: "right"}}>£{invoice.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default Invoice