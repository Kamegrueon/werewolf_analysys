import { Route, Switch } from 'react-router-dom';
import SignUp from '../../components/pages/SignUp';
import SignIn from '../../components/pages/SignIn';
import AuthenticatedGuard from './AuthenticatedGuard';
import AuthenticatedRoute from './AuthenticatedRoute';


const routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <AuthenticatedGuard>
        <AuthenticatedRoute />
      </AuthenticatedGuard>
      <Route component={() => <h1 style={{color: 'white', position: 'absolute', top: 350, left: 600}}>404 NOT FOUND</h1>} />
    </Switch>
  );
};

export default routes({});