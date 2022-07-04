import { createContext, useState } from 'react'

type setTypeObject = {
  selectPlayerDate: string
  setSelectPlayerDate: React.Dispatch<React.SetStateAction<string>> 
};

export const SelectPlayerBoardDateContext = createContext({} as setTypeObject)


export const SelectPlayerBoardDateProvider = (props: any) => {

  const { children } = props
  const [selectPlayerDate, setSelectPlayerDate] = useState('1')

  return (
    <SelectPlayerBoardDateContext.Provider value={{selectPlayerDate, setSelectPlayerDate}}>
      {children}
    </SelectPlayerBoardDateContext.Provider>
  )
}