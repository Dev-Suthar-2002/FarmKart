import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { listOutline, homeOutline, personOutline, cartOutline, fileTrayFullOutline } from 'ionicons/icons';

import Landing from './pages/landing/Landing';
import Auth from './pages/auth/auth';
import CustomerRoutes from './pages/customer/CustomerRoutes';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import { CartProvider } from './hooks/CartContext';

setupIonicReact();

const App: React.FC = () => {
  return (
    <CartProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {/* Public Routes */}
            <Route exact path="/landing" component={Landing} />
            <Route path="/auth" component={Auth} />

            {/* Customer Routes */}
            <Route path="/customer" component={CustomerRoutes} />

            {/* Default Redirect */}
            <Route exact path="/">
              <Redirect to="/landing" />
            </Route>
          </IonRouterOutlet>

          {/* Tab Bar */}
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/customer/home">
              <IonIcon aria-hidden="true" icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="products" href="/customer/products">
              <IonIcon aria-hidden="true" icon={listOutline} />
              <IonLabel>Products</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/customer/profile">
              <IonIcon aria-hidden="true" icon={personOutline} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
            <IonTabButton tab="cart" href="/customer/cart">
              <IonIcon aria-hidden="true" icon={cartOutline} />
              <IonLabel>Cart</IonLabel>
            </IonTabButton>
            <IonTabButton tab="orders" href="/customer/orders">
                <IonIcon aria-hidden="true" icon={fileTrayFullOutline} />
                <IonLabel>Orders</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
    </CartProvider>
  );
};

export default App;
