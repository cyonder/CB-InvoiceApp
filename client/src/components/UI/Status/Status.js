import classNames from 'classnames'
import './Status.scss'

function Status({ label }) {
  return (
    <div className={classNames('status', {[`status--${label}`]: label})}>
      {label}
    </div>
  )
}

export default Status