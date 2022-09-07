import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectIsSignedIn } from '../../reducers/userSlice';

const AuthenticatedGuard = ({ children }: { children: React.ReactElement }) => {
  const isSignedIn = useSelector(selectIsSignedIn)

  return isSignedIn 
    ? <>{children}</> 
    : <Redirect to={{pathname: '/signin'}} />;
};

export default AuthenticatedGuard;

