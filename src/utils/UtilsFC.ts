import { DAILY } from "../components/types";

export const filteringDailyId = (dailies: DAILY[], selectDate: string) => {
  const d = dailies.filter((daily: DAILY) => String(daily.date_progress) === String(selectDate));
  if(d.length){
    return d[0].id  
  }else {
    return ""
  }

}