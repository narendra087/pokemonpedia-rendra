import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../assets/scss/Popup.scss'

function Popup(props) {
  const [nickname, setNickname] = useState('')
  const [invalid, setInvalid] = useState(false)

  const myPokemon = useSelector((state) => state.pkmn.myPokemon);

  function handleChange(e) {
    setNickname(e.target.value)
    setInvalid(false)
  }

  function closePopup(){
    props.handleClose('')
  }

  function saveNickname(){
    foundNickname()
    if (!foundNickname()) {
      props.handleSave(nickname)
    } else {
      setInvalid(true)
    }
  }

  function foundNickname(){
    const nick = nickname || props.defaultName
    const foundPokemon = myPokemon.find(obj => obj.nickname === nick)
    if (foundPokemon) {
      return true
    } else {
      return false
    }
  }

  const Input = () => {
    if (props.withInput) {
      const element = 
      <div>
        <input className={`form popup__form ${invalid ? 'form__invalid' : ''}`} autoFocus="autoFocus" type="text" value={nickname} onChange={handleChange}  placeholder={`default: ${props.defaultName}`} />
        {(invalid) ? (<p className='form__alert'>Nickname already exists!</p>) : ('') }
        <div className="popup__action">
          <button className='btn btn__primary' onClick={() => {saveNickname()}}>Save</button>
        </div>
      </div>
      return element
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
