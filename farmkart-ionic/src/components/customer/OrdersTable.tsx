import React from 'react';
import { IonCard, IonCardContent, IonLabel } from '@ionic/react';
import './OrdersTable.css';

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  estimatedDeliveryDate: string;
  products: {
    product: { name: string; price: number };
    quantity: number;
  }[];
}

const OrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center orders-no-data">
        No orders available
      </div>
    );
  }

  return (
    <IonCard className="orders-card">
      <IonCardContent>
        <h2 className="orders-header">My Orders</h2>
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={order._id} className="orders-item">
              <div className="orders-item-header">
                <span className="orders-item-number">#{index + 1}</span>
                <span className="orders-item-total">${order.totalPrice.toFixed(2)}</span>
              </div>
              <div className="orders-item-body">
                <div>
                  <IonLabel className="orders-label">Status:</IonLabel> {order.status}
                </div>
                <div>
                  <IonLabel className="orders-label">Payment:</IonLabel> 
                  <span
                    className={
                      order.paymentStatus === 'completed'
                        ? 'text-green'
                        : 'text-red'
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                <div>
                  <IonLabel className="orders-label">Delivery:</IonLabel>{' '}
                  {order.estimatedDeliveryDate
                    ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
                    : 'N/A'}
                </div>
              </div>
              <div className="orders-item-products">
                <IonLabel className="orders-label">Products:</IonLabel>
                <ul>
                  {order.products.map((item, idx) => (
                    <li key={idx} className="orders-product-item">
                      {item.quantity} x {item.product?.name || 'Unknown'} ($
                      {item.product?.price?.toFixed(2) || '0.00'})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default OrdersTable;
