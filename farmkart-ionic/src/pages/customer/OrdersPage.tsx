import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonSpinner,
} from '@ionic/react';
import axios from 'axios';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import OrdersTable from '../../components/customer/OrdersTable';
import './OrdersPage.css';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        if (!token || user.role !== 'customer') {
          throw new Error('Unauthorized');
        }

        const response = await axios.get('http://localhost:3002/order/customer-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <IonPage>
      <Navbar />
      <IonContent className="orders-page">
        <div className="orders-container">
          <h1 className="orders-title">
            My <span className="highlight">Orders</span>
          </h1>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <IonSpinner name="crescent" />
              <p>Loading your orders...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}

          {/* Orders Content */}
          {!loading && !error && orders.length > 0 ? (
            <OrdersTable orders={orders} />
          ) : (
            !loading && <p className="no-orders">No orders found.</p>
          )}
        </div>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default OrdersPage;
