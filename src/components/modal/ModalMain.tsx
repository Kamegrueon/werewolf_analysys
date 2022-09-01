import Modal from 'react-modal'
import ModalCreateGame from './ModalCreateGame';
import ModalCreateReport from './ModalCreateReport';
import ModalEditReport from './ModalEditReport'
import ModalCreateAbilityLog from './ModalCreateAbilityLog';

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  body: string;
  coId?: string | null | undefined;
}

interface customStylesType {
  overlay: {
    backgroundColor: string;
  };
  content: {
    height?: string;
    width?: string;
    top: string;
    left: string;
    transform: string;
    WebkitTransform: string;
    MsTransform: string;
    padding: string | number;
    backgroundColor: string;
    borderColor: string;
  };
};

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

const settingDisplayShortSize = (customStyles: customStylesType) => {
  customStyles.content['height'] = '35vh'
  customStyles.content['width'] = '20vw'
  customStyles.content['padding'] = 0
}

const settingDisplayMediumSize = (customStyles: customStylesType) => {
  customStyles.content['height'] = '75vh'
  customStyles.content['width'] = '50vw'
}

const settingDisplayLargeSize = (customStyles: customStylesType) => {
  customStyles.content['height'] = '90vh'
  customStyles.content['width'] = '90vw'
}

const renderBody = (props: Props, customStyles: customStylesType) => {
  switch(props.body){
    case 'createReport':
      settingDisplayMediumSize(customStyles)
      return <ModalCreateReport handleClose={props.handleClose} />;
    case 'editReport':
      settingDisplayMediumSize(customStyles)
      return <ModalEditReport handleClose={props.handleClose} />;
    case 'createAbilityLog':
      settingDisplayShortSize(customStyles)
      return <ModalCreateAbilityLog coId={props.coId} handleClose={props.handleClose} />
    case 'createGame':
      settingDisplayLargeSize(customStyles)
      return <ModalCreateGame />;
    default:
      return <div />
  }
}

const ModalMain: React.FC<Props> = (props) => {

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