import { createContext } from 'react'

const Dailies:string[] = ["1"]
export const DateProgressesContext = createContext(Dailies)

type setTypeObject = {
  gameSelect: string
  setGameSelect: React.Dispatch<React.SetStateAction<string>> 
};
export const GameSelectContext = createContext({} as setTypeObject)