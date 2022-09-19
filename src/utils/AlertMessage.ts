import { SnackbarMessage, OptionsObject, SnackbarKey } from 'notistack';

const AlertMessage = (messages: string[], enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey)  => {

  console.log(messages)

  // 複数のスナックバーを表示できるようにする
  messages.map((message: string) => 
    enqueueSnackbar(message, {anchorOrigin: {horizontal: 'center', vertical: 'top'}, variant: 'error'})
  )
}

export default AlertMessage