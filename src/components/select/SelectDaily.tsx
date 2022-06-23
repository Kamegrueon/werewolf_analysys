import { useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DateProgressesContext } from '../providers/DateProgressesProvider'
import { SelectVoteBoardDateContext } from '../providers/SelectVoteBoardDateProvider';
import { SelectPlayerBoardDateContext } from '../providers/SelectPlayerBoardDateProvider';
import { DAILIES_ACTION } from '../types'


const SelectDaily = (props: DAILIES_ACTION) => {
  const {select_days_style, action} = props.dailies_props

  const { setSelectPlayerDate } = useContext(SelectPlayerBoardDateContext)
  const { setSelectVoteDate } = useContext(SelectVoteBoardDateContext)

  const days_style = { margin: "0 20px 0 auto" }
  const label_style = { color: "#FFFFFF" , fontWeight: 800}
  
  const date_progresses = useContext(DateProgressesContext)

  const handleChange = (event: SelectChangeEvent) => {
    switch (action){
      case 'playerDay':
        console.log('player呼ばれた')
        setSelectPlayerDate(event.target.value)
        break
      case 'voteDay':
        console.log('vote呼ばれた')
        setSelectVoteDate(event.target.value)
        break
    }
  }

  return (
    <div style={days_style}>
      <div style={label_style}>
        Date
      </div>
      <FormControl>
        <Select
          sx={select_days_style}
          native={true}
          defaultValue={'1'}
          onChange={handleChange}
        >
         {date_progresses.map((date_progress: string, index: number) => 
          <option value={date_progress} key={`${index}`}>{date_progress}日目</option>
        )}
        </Select>     
      </FormControl>
    </div>
  )
}

export default SelectDaily