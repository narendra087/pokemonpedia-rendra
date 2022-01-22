import React, { useState } from 'react'
import '../assets/scss/Popup.scss'

function Popup(props) {
  const [nickname, setNickname] = useState('')

  function handleChange(e) {
    setNickname(e.target.value)
  }

  function closePopup(){
    props.handleClose('')
  }

  function saveNickname(){
    props.handleSave(nickname)
  }

  const Input = () => {
    if (props.withInput) {
      return <div>
        <input className='form popup__form' autoFocus="autoFocus" type="text" value={nickname} onChange={handleChange}  placeholder={`default: ${props.defaultName}`} />
        <div className="popup__action">
          <button className='btn btn__primary' onClick={() => {saveNickname()}}>Save</button>
        </div>
      </div>
    } else {
      return ''
    }
  }

  return (
    <div className="popup">
      <div className="popup__box">
        <span className="popup__close" onClick={() => {closePopup()}}>x</span>
        {props.content}
        <Input />
        
      </div>
    </div>
  )
}

export default Popup;
