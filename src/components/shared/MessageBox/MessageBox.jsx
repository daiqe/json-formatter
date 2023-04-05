import React from 'react'
import style from './style.module.scss'
function MessageBox({showMessage ,children}) {
  return (
    <div className={`${style.messageBox} flex-center ${showMessage && style.show}`}>
      <i class="bi bi-info-circle"></i>
      {children}
    </div>
  )
}

export default MessageBox