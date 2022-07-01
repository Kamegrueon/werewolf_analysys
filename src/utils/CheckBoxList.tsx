import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type setTypeObject = {
  positionIds: string[]
  setPositionIds: React.Dispatch<React.SetStateAction<string[]>> 
};

const CheckBoxList = (props: setTypeObject) => {
  const { positionIds, setPositionIds } = props

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

  const positions = [
    {id: 1, position_name: '人狼'},
    {id: 2, position_name: '狂人'},
    {id: 3, position_name: '占い師'},
    {id: 4, position_name: '霊媒師'},
    {id: 5, position_name: '騎士'},
    {id: 6, position_name: '妖狐'},
    {id: 7, position_name: '共有者'},
    {id: 8, position_name: 'ハンター'},
    {id: 9, position_name: '独裁者'},
    {id: 10, position_name: '狂信者'},
  ]

  return (
    <Box>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup row>
          {positions.map(position => (
            <FormControlLabel
            control={
              <Checkbox 
                onChange={handleChange} 
                name={position.position_name} 
                value={position.id} 
                sx={{
                  color: 'white',
                  '&.Mui-checked': {
                    color: 'red',
                  },
                }}
              />
            }
            label={position.position_name}
        />            
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default CheckBoxList