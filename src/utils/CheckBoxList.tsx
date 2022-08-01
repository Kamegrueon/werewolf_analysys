import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RollsContext } from './AnalysisContext'
import { ROLL_STATE } from '../components/types';

type setTypeObject = {
  positionIds: string[]
  setPositionIds: React.Dispatch<React.SetStateAction<string[]>> 
};

const CheckBoxList = (props: setTypeObject) => {
  const { positionIds, setPositionIds } = props

  const { rollsState } = useContext(RollsContext)

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
          {Object(rollsState).map((role:{attributes:ROLL_STATE}) => (
            <FormControlLabel
            control={
              <Checkbox 
                onChange={handleChange} 
                name={role.attributes.roll_name} 
                value={role.attributes.id} 
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'red',
                  },
                }}
              />
            }
            label={role.attributes.roll_name}
            key={role.attributes.id}
        />            
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default CheckBoxList