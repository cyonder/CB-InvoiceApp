import classNames from 'classnames'
import './Drawer.scss'
import { Field, Button } from '../UI'

function Drawer ({ isDrawerOpen, setIsDrawerOpen }) {
  return (
    <div className={classNames('drawer', {'drawer--open': isDrawerOpen})}>
      <header className="drawer__header"></header>
      <section className="drawer__body">
        <form>
          <h4>Bill From</h4>
          <Field type="text" label="Street Address" id="senderAddress" name="senderAddress"/>
          <div className="address-fields">
            <Field type="text" label="City" id="city" name="city"/>
            <Field type="text" label="Post" id="postCode" name="postCode"/>
            <Field type="text" label="Country" id="country" name="country"/>
          </div>
          <h4>Bill To</h4>
          <Field type="text" label="Client's Name" id="clientName" name="clientName"/>
          <Field type="text" label="Client's Email" id="clientEmail" name="clientEmail"/>
          <Field type="text" label="Street Address" id="clientAddress" name="clientAddress"/>
          <div className="address-fields">
            <Field type="text" label="City" id="city" name="city"/>
            <Field type="text" label="Post" id="postCode" name="postCode"/>
            <Field type="text" label="Country" id="country" name="country"/>
          </div>
        </form>
      </section>
      <footer className="drawer__footer">
        <Button type="button" variant="dark" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
        <Button type="button">Save Changes</Button>
      </footer>
    </div>
  )
}

export default Drawer