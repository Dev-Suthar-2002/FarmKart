import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage';

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path='/landing' component={LandingPage} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Landing;