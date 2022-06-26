import { createContext } from 'react'


type setTypeObject = {
  gameSelect: string
  setGameSelect: React.Dispatch<React.SetStateAction<string>> 
};

export const GameSelectContext = createContext({} as setTypeObject)