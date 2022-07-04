import SelectPlayerDay from './SelectPlayerDay'
import SelectVoteDay from './SelectVoteDay';

const renderBody = (body: string) => {
  switch(body){
    case 'playerDay':
      return <SelectPlayerDay />
    case 'voteDay':
      return <SelectVoteDay />;
    default:
      return ''
  }
}

const SelectMain = (props: {'body': string}) => {
  return (
    <div>
        {renderBody(props.body)}
    </div>
  )
}

export default SelectMain