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

const SelectMain: React.FC<{body: string}> = ({body}) => {
  return (
    <div>
      {renderBody(body)}
    </div>
  )
}

export default SelectMain