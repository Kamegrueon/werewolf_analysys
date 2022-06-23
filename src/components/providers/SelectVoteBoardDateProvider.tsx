import { createContext, useState } from 'react'


type setTypeObject = {
  selectVoteDate: string
  setSelectVoteDate: React.Dispatch<React.SetStateAction<string>> 
};


export const SelectVoteBoardDateContext = createContext({  selectVoteDate: '1', setSelectVoteDate: ()=>{}} as setTypeObject)


export const SelectVoteBoardDateProvider = (props: any) => {

  const { children } = props

  const [selectVoteDate, setSelectVoteDate] = useState('1')

  return (
    <SelectVoteBoardDateContext.Provider value={{selectVoteDate, setSelectVoteDate}}>
      {children}
    </SelectVoteBoardDateContext.Provider>
  )
}