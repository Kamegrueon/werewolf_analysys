import Modal from 'react-modal'
import ModalCreateGame from './ModalCreateGame';
import ModalCreateReport from './ModalCreateReport';


interface Props {
  handleClose: () => void;
  isOpen: boolean;
  body: string
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

const renderBody = (body: string, customStyles: any) => {
  switch(body){
    case 'createReport':
      customStyles.content['height'] = '75vh'
      customStyles.content['width'] = '50vw'
      return <ModalCreateReport />;
    case 'createComingOut':
      return '';
    case 'createAbilityLog':
      return '';
    case 'createGame':
      customStyles.content['height'] = '90vh'
      customStyles.content['width'] = '90vw'
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
        {renderBody(props.body, customStyles)}
      </Modal>
    </div>
  )
}

export default ModalMain