import Modal from 'react-modal'
import ModalCreateGame from './ModalCreateGame';
import ModalCreateReport from './ModalCreateReport';
import ModalEditReport from './ModalEditReport'
import { PLAYER } from '../types';

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  body: string
  coPlayer?: PLAYER
}

const customStyles = {
  overlay: {
    backgroundColor: "rgb(80, 80, 80, 0.8)",
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    padding: "2vw 9vw",
    backgroundColor: '#1F2327',
    borderColor: '#1F2327',
  },
};

// const settingDisplayShortSize = (customStyles: any) => {
//   customStyles.content['height'] = '30vh'
//   customStyles.content['width'] = '20vw'
//   customStyles.content['padding'] = 0
// }

const settingDisplayMediumSize = (customStyles: any) => {
  customStyles.content['height'] = '75vh'
  customStyles.content['width'] = '50vw'
}

const settingDisplayLargeSize = (customStyles: any) => {
  customStyles.content['height'] = '90vh'
  customStyles.content['width'] = '90vw'
}

const renderBody = (props: Props, customStyles: any) => {
  switch(props.body){
    case 'createReport':
      settingDisplayMediumSize(customStyles)
      return <ModalCreateReport handleClose={props.handleClose} />;
    case 'editReport':
      settingDisplayMediumSize(customStyles)
      return <ModalEditReport handleClose={props.handleClose} />;
    case 'abilityMenu':
      // abilityMenuにはボタン配置。そこから複数アクションに分岐する
      return <div>OK</div>;
    case 'createGame':
      settingDisplayLargeSize(customStyles)
      return <ModalCreateGame />;
    default:
      return <div />
  }
}

const ModalMain = (props:Props) => {

  Modal.setAppElement("#root")

  return (
    <div>
      <Modal 
        isOpen={props.isOpen}
        onRequestClose={props.handleClose}
        style={customStyles}
      >
        {renderBody(props, customStyles)}
      </Modal>
    </div>
  )
}

export default ModalMain