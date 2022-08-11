import { useContext, useEffect, useState } from 'react'
import { CastingsContext, DailiesContext, RerenderContext, SelectPlayerBoardDateContext } from '../../utils/AnalysisContext'
import { comingOutCreateRequest } from '../../utils/ApiFetch'
import { AxiosError} from 'axios'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';


const ModalAbilityAction = (props: any) => {

  const buttonStyle = {
    backgroundColor: "#bdbdbd", 
    color: "#1F2327", 
    marginBottom: 10
  }

  return (
    <div style={{color: 'white',textAlign: 'center',margin:20, position: 'absolute', zIndex: 10}}>
    <form>
        <div style={{color: 'white'}}>Coする役職を選択してください</div>
      <Button
        variant="contained"
        onClick={()=>{}}
        style={{backgroundColor: "#bdbdbd", color: "#1F2327", marginTop: 20}}
      >
        この役職を記録する
      </Button>
    </form>
  </div>
  )
}

export default ModalAbilityAction