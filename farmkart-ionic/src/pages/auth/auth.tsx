import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Auth: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        {/* Login Route */}
        <Route exact path="/auth/login" component={Login} />

        {/* Sign Up Route */}
        <Route exact path="/auth/signup" component={Signup} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Auth;
