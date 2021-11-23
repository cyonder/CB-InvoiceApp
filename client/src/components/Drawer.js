import { Form as FinalForm, Field, FormSpy, useField } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import { OnChange } from 'react-final-form-listeners'
import arrayMutators from 'final-form-arrays'
import dayjs from 'dayjs'

import Offcanvas from 'react-bootstrap/Offcanvas'
import Form from 'react-bootstrap/Form'
import BootstrapButton from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { Button } from '../components/UI'

function Drawer ({ isDrawerOpen, invoices, setInvoices, setIsDrawerOpen, formValues }) {
  const generateId = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    // Pick the first letter from the alphabet
    const firstLetter = alphabet[Math.floor(Math.random() * alphabet.length)]

    // Pick the second letter from the alphabet
    const secondLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
    
    // Generate 4 random digits
    const digits = Math.floor(1000 + Math.random() * 9000)
    
    // Append them
    const generatedId = firstLetter+secondLetter+digits
    
    // return the generated id
    return generatedId
  }

  const handleFormSubmit = values => {
    // Form is not populated. So user is creating a new invoice.
    const isCreatingNewInvoice = Object.keys(formValues).length <= 0
    
    let newInvoices = []
    let total = 0

    // Calculate the total of all items
    if (values.items?.length > 0) {
      values.items.forEach(item => {
        total += item.total
      })
    }

    if (isCreatingNewInvoice) {
      newInvoices = [...invoices]
      values.id = generateId()
      values.total = total
      if (values.isDraft) {
        values.status = 'draft'
      } else {
        values.status = 'pending'
      }
      delete values.isDraft
      newInvoices.push(values)
    } else {
      // isEditingInvoice
      newInvoices = invoices.map(item => {
        if (item.id === values.id) {
          delete values.isDraft
          item = {
            ...values,
            total,
            paymentDue: dayjs(item.createdAt).add(values.paymentTerms, 'day').format('YYYY-MM-DD')
          }
        }
        return item
      })
    }

    setInvoices(newInvoices)
    setIsDrawerOpen(false)
  }

  const validateFormFields = values => {
    const errors = {
      senderAddress: {},
      clientAddress: {}
    }
    // If user saved invoice as draft skip validation.
    if (!values.isDraft) {
      if (!values.senderAddress?.street) {
        errors.senderAddress.street = 'Required!'
      }
      if (!values.senderAddress?.city) {
        errors.senderAddress.city = 'Required!'
      }
      if (!values.senderAddress?.postCode) {
        errors.senderAddress.postCode = 'Required!'
      }
      if (!values.senderAddress?.country) {
        errors.senderAddress.country = 'Required!'
      }
      if (!values.clientName) {
        errors.clientName = 'Required!'
      }
      if (!values.clientEmail) {
        errors.clientEmail = 'Required!'
      }
      if (!values.clientAddress?.street) {
        errors.clientAddress.street = 'Required!'
      }
      if (!values.clientAddress?.city) {
        errors.clientAddress.city = 'Required!'
      }
      if (!values.clientAddress?.postCode) {
        errors.clientAddress.postCode = 'Required!'
      }
      if (!values.clientAddress?.country) {
        errors.clientAddress.country = 'Required!'
      }
      if (!values.description) {
        errors.description = 'Required!'
      }
      if (!values.createdAt) {
        errors.createdAt = 'Required!'
      }
      if (!values.paymentTerms) {
        errors.paymentTerms = 'Required!'
      }
    }
    return errors
  }

  return (
    <Offcanvas className="offcanvas" show={isDrawerOpen}>
      <div className="offcanvas-header">
        {Object.keys(formValues).length > 0 ? <span className="heading">Edit <span>#</span>{`${formValues.id}`}</span> : <span className="heading">New Invoice</span>}
      </div>
      <div className="offcanvas-body">
        <FinalForm onSubmit={handleFormSubmit} 
                   initialValues={formValues}
                   validate={values => validateFormFields(values)}
                   mutators={{ ...arrayMutators }}>
          {({ handleSubmit, form, values }) => {
            return (
              <>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                  <span className="title">Bill From</span>
                  <Form.Group className="form-group" controlId="streetAddress">
                    <Form.Label data-required>Street Address</Form.Label>
                    <Field name="senderAddress.street">
                      {({input}) => (
                        <>
                          <Form.Control type="text" {...input}/>
                          <FormGroupError name="senderAddress.street"/>
                        </>
                      )}
                    </Field>
                  </Form.Group>
                  <div className="address-group">
                    <Form.Group className="form-group" controlId="senderAddress.city">
                      <Form.Label data-required>City</Form.Label>
                      <Field name="senderAddress.city">
                        {({input}) => (
                          <>
                            <Form.Control type="text" {...input}/>
                            <FormGroupError name="senderAddress.city"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="senderAddress.postCode">
                      <Form.Label data-required>Post Code</Form.Label>
                      <Field name="senderAddress.postCode">
                        {({input}) => (
                          <>
                            <Form.Control type="text" {...input}/>
                            <FormGroupError name="senderAddress.postCode"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="senderAddress.country">
                      <Form.Label data-required>Country</Form.Label>
                      <Field name="senderAddress.country">
                        {({input}) => (
                          <>
                            <Form.Control type="text" {...input}/>
                            <FormGroupError name="senderAddress.country"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                  </div>
                  <span className="title">Bill To</span>
                  <Form.Group className="form-group" controlId="clientName">
                    <Form.Label data-required>Client's Name</Form.Label>
                    <Field name="clientName">
                      {({input}) => (
                        <>
                          <Form.Control type="text" {...input}/>
                          <FormGroupError name="clientName"/>
                        </>
                      )}
                    </Field>
                  </Form.Group>
                  <Form.Group className="form-group" controlId="clientEmail">
                    <Form.Label data-required>Client's Email</Form.Label>
                    <Field name="clientEmail">
                      {({input}) => (
                        <>
                          <Form.Control type="text" {...input}/>
                          <FormGroupError name="clientEmail"/>
                        </>
                      )}
                    </Field>
                  </Form.Group>
                  <Form.Group className="form-group" controlId="clientAddress.streetAddress">
                    <Form.Label data-required>Street Address</Form.Label>
                    <Field name="clientAddress.street">
                      {({input}) => (
                        <>
                          <Form.Control type="text" {...input}/>
                          <FormGroupError name="clientAddress.street"/>
                        </>
                      )}
                    </Field>
                  </Form.Group>
                  <div className="address-group">
                    <Form.Group className="form-group" controlId="clientAddress.city">
                      <Form.Label data-required>City</Form.Label>
                      <Field name="clientAddress.city">
                        {({input}) => (
                          <>
                            <Form.Control type="text" {...input}/>
                            <FormGroupError name="clientAddress.city"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="clientAddress.postCode">
                      <Form.Label data-required>Post Code</Form.Label>
                      <Field name="clientAddress.postCode">
                        {({input}) => (
                          <>
                            <Form.Control type="text" {...input}/>
                            <FormGroupError name="clientAddress.postCode"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="clientAddress.country">
                      <Form.Label data-required>Country</Form.Label>
                      <Field name="clientAddress.country">
                        {({input}) => (
                          <>
                            <Form.Control type="text" {...input}/>
                            <FormGroupError name="clientAddress.country"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                  </div>
                  <div className="double-column">
                    <Form.Group className="form-group" controlId="createdAt">
                      <Form.Label data-required>Invoice Date</Form.Label>
                      <Field name="createdAt">
                        {({input}) => (
                          <>
                            <InputGroup>
                              <Form.Control type="text" {...input} placeholder="YYYY-MM-DD"/>
                              <InputGroup.Text><span></span></InputGroup.Text>
                            </InputGroup>
                            <FormGroupError name="createdAt"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                    <Form.Group className="form-group" controlId="paymentTerms">
                      <Form.Label data-required>Payment Terms</Form.Label>
                      <Field name="paymentTerms">
                        {({input}) => (
                          <>
                            <Form.Select {...input}>
                              <option value="1">Net 1 Day</option>
                              <option value="7">Net 7 Days</option>
                              <option value="14">Net 14 Days</option>
                              <option value="30">Net 30 Days</option>
                            </Form.Select>
                            <FormGroupError name="paymentTerms"/>
                          </>
                        )}
                      </Field>
                    </Form.Group>
                  </div>
                  <Form.Group className="form-group" controlId="description">
                    <Form.Label data-required>Project Description</Form.Label>
                    <Field name="description">
                      {({input}) => (
                        <>
                          <Form.Control type="text" {...input}/>
                          <FormGroupError name="description"/>
                        </>
                      )}
                    </Field>
                  </Form.Group>
                  <span className="item-list-title">Item List</span>
                  <FieldArray name="items">
                    {({fields}) => (
                      <>
                        <div>
                          {fields.map((name, idx) => {
                            const itemPrice = values.items[idx].price || 0
                            const itemQuantity = values.items[idx].quantity || 0
                            const totalPrice = itemPrice * itemQuantity

                            return (
                              <div className="items-group" key={idx}>
                                <Form.Group className="form-group" controlId={`${name}.name`}>
                                  <Form.Label data-required>Item Name</Form.Label>
                                  <Field name={`${name}.name`}>
                                    {({input}) => <Form.Control type="text" {...input}/>}
                                  </Field>
                                </Form.Group>
                                <Form.Group className="form-group" controlId={`${name}.quantity`}>
                                  <Form.Label data-required>QTY.</Form.Label>
                                  <Field name={`${name}.quantity`}>
                                    {({input}) => <Form.Control type="text" {...input}/>}
                                  </Field>
                                </Form.Group>
                                <Form.Group className="form-group" controlId={`${name}.price`}>
                                  <Form.Label data-required>Price</Form.Label>
                                  <Field name={`${name}.price`}>
                                    {({input}) => <Form.Control type="text" {...input}/>}
                                  </Field>
                                </Form.Group>
                                <Form.Group className="form-group disabled" controlId={`${name}.total`}>
                                  <Form.Label data-required>Total</Form.Label>
                                  <Field name={`${name}.total`}>
                                    {({input}) => <Form.Control disabled type="text" {...input} value={totalPrice}/>}
                                  </Field>
                                </Form.Group>
                                <BootstrapButton onClick={() => fields.remove(idx)} variant="link" className="delete-button"><span></span></BootstrapButton>
                                <OnChange name={`${name}.quantity`}>
                                  {() => form.change(`${name}.total`, totalPrice)}
                                </OnChange>
                                <OnChange name={`${name}.price`}>
                                  {() => form.change(`${name}.total`, totalPrice)}
                                </OnChange>
                              </div>
                            )
                          })}
                        </div>
                        <BootstrapButton onClick={() => fields.push({
                          name: '',
                          quantity: '',
                          price: '',
                          total: 0
                        })} variant="primary" className="new-item-button">+Add New Item</BootstrapButton>
                      </>
                    )}
                  </FieldArray>
                  <button type="submit" id="draft-button" style={{display: 'none'}} onClick={() => form.change("isDraft", true)}></button>
                  <button type="submit" id="save-button" style={{display: 'none'}} onClick={() => form.change("isDraft", false)}></button>
                </Form>
                {/* <FormSpy subscription={{values: true}}>
                  {({values}) => (
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>
                  )}
                </FormSpy> */}
              </>
            )
          }}
        </FinalForm>
      </div>
      <footer className="offcanvas-footer">
      {Object.keys(formValues).length > 0 ? (
        <>
          <Button type="button" variant="dark" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
          <Button type="button" onClick={() => document.getElementById('save-button').click()}>Save Changes</Button>
        </>
      ) : (
        <>
          <Button type="button" variant="light" onClick={() => setIsDrawerOpen(false)}>Discard</Button>
          <Button type="button" variant="dark" onClick={() => document.getElementById('draft-button').click()}>Save as Draft</Button>
          <Button type="button" onClick={() => document.getElementById('save-button').click()}>Save & Send</Button>
        </>
      )}
      </footer>
    </Offcanvas>
  )
}

const FormGroupError = ({name}) => {
  const {
    meta: {touched, error}
  } = useField(name, {subscription: {touched: true, error: true}})
  return touched && error ? (
    <Form.Control.Feedback type="invalid" style={{display: 'block'}}>
      {error}
    </Form.Control.Feedback>
  ) : null
}

export default Drawer