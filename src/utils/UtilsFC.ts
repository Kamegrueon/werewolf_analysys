import { DAILIES } from "../components/types";

export const filteringDailyId = ((dailies: DAILIES[], selectDate: string) => dailies.filter((daily: DAILIES) => String(daily.date_progress) === String(selectDate))[0].id)