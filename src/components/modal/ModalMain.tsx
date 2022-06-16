import Modal from 'react-modal'
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
    height: "75vh",
    width: "30vw",
    padding: "2vw 9vw",
    backgroundColor: '#1F2327',
    borderColor: '#1F2327',
  },
};

const renderBody = (body: string) => {
  switch(body){
    case 'createReport':
      return <ModalCreateReport />;
    case 'createComingOut':
      return '';
    case 'createAbilityLog':
      return '';
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
        {renderBody(props.body)}
      </Modal>
    </div>
  )
}

export default ModalMain