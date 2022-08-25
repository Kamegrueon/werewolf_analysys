import { PLAYER } from '../components/types'

export const ShortRollName = (player: PLAYER) => {
  let roll_name = '？'
  switch (player.roll_name) {
    case '占い師':
      return roll_name = '占'
    case '人狼':
      return roll_name = '狼'
    case '狂人':
      return roll_name = '狂'
    case '霊媒師':
      return roll_name = '霊'
    case '騎士':
      return roll_name = '騎'
    case '妖狐':
      return roll_name = '狐'
    case '共有者':
      return roll_name = '共'
    case 'ハンター':
      return roll_name = 'ハ'
    case '独裁者':
      return roll_name = '独'
    case '狂信者':
      return roll_name = '狂'
    default:
      return roll_name
  }
}

export const ExistCodStyle = (player: PLAYER) => {
  if(player.cause_of_death) {
    const dead_style = { opacity: 0.5}
    return dead_style;
  }else {
    return {}
  } 
}
