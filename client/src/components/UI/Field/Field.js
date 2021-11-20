import './Field.scss'

function Field({ type, label, placeholder, id, name }) {
  return (
    <div>
      <label className='field-label' htmlFor={id}>{label}</label>
      <input className='field' 
            type={type} 
            placeholder={placeholder}
            id={id} 
            name={name}/>
    </div>
  )
}

export default Field