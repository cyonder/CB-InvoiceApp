import { Button, Field, Status } from "../components/UI"
import iconPlusPath from '../assets/icon-plus.svg'

function Invoices() {
  return (
    <div className="invoices-page">
      <Button type="button">Mark as Paid</Button>
      <Button type="button" icon={iconPlusPath}>New Invoice</Button>
      <Button type="button" variant="danger">Delete</Button>
      <Button type="button" variant="dark">Edit</Button>
      <Field type="text" id="address" name="address" label="Street Address"/>
      <Status label="paid"/>
      <Status label="pending"/>
      <Status label="draft"/>
    </div>
  )
}

export default Invoices