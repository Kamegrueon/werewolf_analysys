import { Provider } from 'react-redux';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { store } from '../store';
import  PlayerBoard from '../components/player_board/PlayerBoard';

export default {
  title: 'PlayerBoard/PlayerBoard',
  component: PlayerBoard,
  argTypes: {
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof PlayerBoard>;

const Template: ComponentStory<typeof PlayerBoard> = () => <PlayerBoard />;

export const Default = Template.bind({});