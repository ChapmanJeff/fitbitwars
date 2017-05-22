import React, {Component} from 'react'
import PropTypes from 'prop-types'

const Modal = ({isOpen, onClose, children, containerClassName, className, noBackdrop, backdropClassName})=> {

  if (isOpen === false){
    return null
  }

  return (
    <div className={containerClassName}>
      <div className={className} style={{position: 'absolute',
          top: '50%',left: '50%',transform: 'translate(-50%, -50%)',zIndex: '9999',background: '#fff',
          borderRadius:'4px', margin:'20px', border:'2px solid #35a7ff', width:'60%', display:'flex', flexDirection:'column', justifyContent:'space-around'}}>
        {children}
      </div>
      {!noBackdrop &&
        <div className={backdropClassName} onClick={e => onClose(e)} style={{position: 'absolute',
            width: '100%',height: '100%',top: '0px',left: '0px',zIndex: '9998',background: 'rgba(0, 0, 0, 0.7)'}}
        />
      }
    </div>
  )
}


Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  noBackdrop: PropTypes.bool,
  backdropClassName: PropTypes.string,
}

export default Modal;
