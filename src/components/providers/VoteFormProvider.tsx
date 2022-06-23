import { createContext, useState } from 'react'

type setTypeObject = {
  setVoterPlayerId: React.Dispatch<React.SetStateAction<string>>
  setVotedPlayerId: React.Dispatch<React.SetStateAction<string>>
  isOpenForm: boolean
  handleOpen: () => void
  handlePostVote: () => void
};

export const VoteFormContext = createContext({} as setTypeObject)


export const VoteFormProvider = (props: any) => {

  const { children } = props
  const [voterPlayerId, setVoterPlayerId] = useState('');
  const [votedPlayerId, setVotedPlayerId] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpen = () => {
    setIsOpenForm(true)
  }

  const handlePostVote = () => {
    // axios postリクエストで投票データ送信
    console.log(voterPlayerId, votedPlayerId)
    setVoterPlayerId('')
    setVotedPlayerId('')
    setIsOpenForm(false)
  }

  return (
    <VoteFormContext.Provider value={{
      setVoterPlayerId, 
      setVotedPlayerId, 
      isOpenForm, 
      handleOpen, 
      handlePostVote
    }}>
      {children}
    </VoteFormContext.Provider>
  )
}