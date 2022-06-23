import { createContext, useState, useEffect } from 'react'
import { dailiesIndexRequest } from '../../utils/ApiFetch'

const Dailies:string[] = ["1"]

export const DateProgressesContext = createContext(Dailies)


export const DateProgressesProvider = (props: any) => {

  const { children } = props

  const [dateProgresses, setDateProgresses] = useState<string[]>([])
  const game_id = "1"

  useEffect(() => {
    dailiesIndexRequest(game_id).then((res: any) => {
      setDateProgresses([...Array(res.data.length)].map((_, i) => String(i + 1)))
    })
  },[])

  return (
    <DateProgressesContext.Provider value={dateProgresses}>
      {children}
    </DateProgressesContext.Provider>
  )
}