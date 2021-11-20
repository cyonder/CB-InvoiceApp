import classNames from 'classnames'
import './Button.scss'

function Button({ children, type, onClick, variant, icon }) {
  return (
    <button className={
      classNames('button', {
        [`button--${variant}`]: variant,
        'button--with-icon': icon
      })} 
      type={type} 
      onClick={onClick}>
        {icon && <span><img src={icon} alt={children}/></span>}
        {children}
      </button>
  )  
}

export default Button