import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import { RollsContext } from './AnalysisContext'
// import { ROLL_STATE } from '../components/types';

import { useSelector } from 'react-redux';
import { selectRolls } from "../reducers/gameSlice";

type setTypeObject = {
  positionIds: string[]
  setPositionIds: React.Dispatch<React.SetStateAction<string[]>> 
};

const CheckBoxList = (props: setTypeObject) => {
  const { positionIds, setPositionIds } = props

  // const { rollsState } = useContext(RollsContext)
  const rolls = useSelector(selectRolls)
  console.log('これ', rolls)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked, event.target.value)
    if(event.target.checked){
      setPositionIds([...positionIds,event.target.value]);
    }else {
      setPositionIds(
        positionIds.filter((id: string) => (id !== event.target.value))
      );
    }
  };

  return (
    <Box>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup row>
          {rolls.map((roll) => (
            <FormControlLabel
            control={
              <Checkbox 
                onChange={handleChange} 
                name={roll.attributes.roll_name} 
                value={roll.attributes.id} 
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'red',
                  },
                }}
                key={roll.attributes.id}
              />
            }
            label={roll.attributes.roll_name}
            key={roll.attributes.id}
        />            
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default CheckBoxList