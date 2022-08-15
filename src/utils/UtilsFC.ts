import { DAILIES } from "../components/types";

export const filteringDailyId = (dailies: DAILIES[], selectDate: string) => {
  const d = dailies.filter((daily: DAILIES) => String(daily.date_progress) === String(selectDate));
  return d[0].id
}