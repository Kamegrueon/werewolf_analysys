import { Route, Switch } from 'react-router-dom';
import { GameBoard } from '../../components/pages/GameBoard';
import GameMain from '../../components/pages/GameMain';

const AuthenticatedRoute: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/games' component={GameMain} />
      <Route exact path="/board" component={GameBoard} />
    </Switch>
  );
};

export default AuthenticatedRoute;