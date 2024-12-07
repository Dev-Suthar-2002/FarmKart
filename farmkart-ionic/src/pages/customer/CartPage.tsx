import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import axios from 'axios';
import { useCart } from '../../hooks/CartContext';
import Navbar from '../../components/shared/Navbar';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cashondelivery');
  const [error, setError] = useState<string | null>(null);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const paymentOptions = [
    { value: 'cashondelivery', label: 'Cash On Delivery' },
    { value: 'creditcard', label: 'Credit Card' },
    { value: 'debitcard', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
  ];

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('access_token');

    const orderData = {
      totalPrice,
      estimatedDeliveryDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      paymentMethod,
      transactionId: `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      products: cart.map(({ product, quantity }) => ({
        product: product._id,
        quantity,
      })),
      status: 'pending',
      paymentStatus: paymentMethod === 'cashondelivery' ? 'pending' : 'completed',
    };

    try {
      const response = await axios.post(
        'http://localhost:3002/order',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Order placed successfully:', response.data);
      clearCart();
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <Navbar />
        <div className="cart-container">
          <h1 className="cart-title">Your Cart</h1>
          {error && <p className="cart-error">{error}</p>}
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <IonList>
                {cart.map(({ product, quantity }) => (
                  <IonItem key={product._id} className="cart-item">
                    <IonGrid>
                      <IonRow>
                        <IonCol size="4">
                          <img
                            src={product.imageUrl || '/assets/placeholder.jpg'}
                            alt={product.name}
                            className="cart-item-image"
                          />
                        </IonCol>
                        <IonCol size="8">
                          <IonLabel>
                            <h2>{product.name}</h2>
                            <p>${product.price.toFixed(2)}</p>
                            <p>Quantity: {quantity}</p>
                          </IonLabel>
                          <div className="cart-actions">
                            <IonButton
                              onClick={() =>
                                updateQuantity(product._id, Math.max(1, quantity - 1))
                              }
                              disabled={quantity <= 1}
                            >
                              -
                            </IonButton>
                            <IonButton
                              onClick={() => updateQuantity(product._id, quantity + 1)}
                            >
                              +
                            </IonButton>
                            <IonButton
                              color="danger"
                              onClick={() => removeFromCart(product._id)}
                            >
                              Remove
                            </IonButton>
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                ))}
              </IonList>
              <div className="cart-summary">
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
                <IonButton
                  expand="block"
                  color="success"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Place Order
                </IonButton>
              </div>
            </>
          )}
        </div>

        {/* Order Summary Modal */}
        <IonModal isOpen={isDialogOpen} onDidDismiss={() => setIsDialogOpen(false)}>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              {cart.map(({ product, quantity }) => (
                <li key={product._id}>
                  {product.name} x {quantity} - ${(
                    product.price * quantity
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <IonSelect
              value={paymentMethod}
              onIonChange={(e) => setPaymentMethod(e.detail.value)}
              placeholder="Select Payment Method"
            >
              {paymentOptions.map((option) => (
                <IonSelectOption key={option.value} value={option.value}>
                  {option.label}
                </IonSelectOption>
              ))}
            </IonSelect>
            <div className="order-actions">
              <IonButton expand="block" color="success" onClick={handlePlaceOrder}>
                {isLoading ? 'Placing Order...' : 'Confirm Order'}
              </IonButton>
              <IonButton expand="block" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </IonButton>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
