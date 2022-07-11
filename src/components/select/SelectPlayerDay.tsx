import { useContext } from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DailiesContext, SelectPlayerBoardDateContext } from '../../utils/AnalysisContext'

const SelectPlayerDay = () => {

  const { selectPlayerDate, setSelectPlayerDate } = useContext(SelectPlayerBoardDateContext)
  const dailies = useContext(DailiesContext)

  const days_style = { margin: "0 20px 0 auto" }
  const label_style = { color: "#FFFFFF" , fontWeight: 800}

  const select_days_style = {
    width: 165,
    height: 30,
    color: '#1F2327',
    backgroundColor: '#bdbdbd',
    paddingLeft: 5
  }

  const handleChange = (event: SelectChangeEvent) => {
      setSelectPlayerDate(event.target.value)
      // セットしたdailyの値でプレイヤーデータをFetch
   }

   console.log('selectplayerday', selectPlayerDate)

  return (
    <div style={days_style}>
      <div style={label_style}>
        Date
      </div>
      <FormControl>
        <Select
          sx={select_days_style}
          native={true}
          value={selectPlayerDate}
          onChange={handleChange}
        >
         {dailies.map((daily, index) => 
          <option value={`${daily.date_progress}`} key={`${index}`}>{`${daily.date_progress}`}日目</option>
        )}
        </Select>     
      </FormControl>
    </div>
  )
}

export default SelectPlayerDay