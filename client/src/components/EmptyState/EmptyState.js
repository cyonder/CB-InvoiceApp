import './EmptyState.scss'

function EmptyState () {
  return (
    <div className="empty-state">
      <div className="empty-state__image"></div>
      <h2>There is nothing here</h2>
      <small>Create an invoice by clicking the <strong>New Invoice</strong> button and get started</small>
    </div>
  )
}

export default EmptyState