import React from 'react';
import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Products from './Products';
import ProfilePage from './ProfilePage';
import CartPage from './CartPage';
import OrdersPage from './OrdersPage';
import HomePage from './Home'; // Ensure you import the HomePage component
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

const CustomerRoutes: React.FC = () => {
  return (
    <IonPage>
      {/* Navbar */}
      <Navbar />

      <IonRouterOutlet>
        <Switch>
          {/* Routes for customer pages */}
          <Route exact path="/customer/home" component={HomePage} />
          <Route exact path="/customer/products" component={Products} />
          <Route exact path="/customer/profile" component={ProfilePage} />
          <Route exact path="/customer/cart" component={CartPage} />
          <Route exact path="/customer/orders" component={OrdersPage} />

          {/* Redirect from customer base route */}
          <Redirect exact from="/customer" to="/customer/home" />

          {/* Catch-all redirect */}
          <Redirect to="/customer/home" />
        </Switch>
      </IonRouterOutlet>

    </IonPage>
  );
};

export default CustomerRoutes;
