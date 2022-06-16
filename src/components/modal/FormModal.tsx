import React, { useState } from 'react'
import Modal from 'react-modal'
import styles from './FormModal.module.css'

interface Props {
  handleClose: () => void;
  isOpen: boolean;
}

const FormModal: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true)
    const elements:any = document.getElementsByClassName("AvatarState_avatar__marker_box__fgSIC");
    Object.keys(elements).map((index: string) => {elements[index].style.zIndex = 0})
  }

  const handleClose = () => {
    setIsOpen(false)
    const elements:any = document.getElementsByClassName("AvatarState_avatar__marker_box__fgSIC");
    Object.keys(elements).map((index: string) => {elements[index].style.zIndex = 5})
  }

  Modal.setAppElement("#root")

  return (
    <div className={styles.form_modal__box}>
      <button onClick={handleOpen}>開く</button>
      <Modal 
        isOpen={isOpen}
        onRequestClose={handleClose}
        className={styles.form_modal__main}
      >
      </Modal>
    </div>
  )
}

export default FormModal