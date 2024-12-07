import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import Login from './Login'; // Ensure the path matches your file structure
import Signup from './Signup'; // Ensure the path matches your file structure

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
