import PlayerBoardAvatar from "../components/player_board/PlayerBoardAvatar";
import { withReactContext } from "storybook-react-context";
import PlayerContext from "../components/contexts/PlayerContext";

export default {
  component: PlayerBoardAvatar,
  title: 'WWA/PlayerBoardAvatar',
  decorators: [
    withReactContext({
      Context: PlayerContext,
      initialState: {user_id: 1, name:"Jon", avatar:'', position:'fortune-teller', cause_of_death:'murdered', date_of_death: 3},
    })
  ],
};

const Template = () => <PlayerBoardAvatar />;

export const Default = Template.bind({});


