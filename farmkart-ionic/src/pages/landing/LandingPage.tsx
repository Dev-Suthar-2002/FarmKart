import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Landing.css';
import Navbar from '../../components/shared/Navbar';
import Hero from '../../components/shared/Hero';
import Footer from '../../components/shared/Footer';
import ProductCard from '../../components/customer/ProductCard';
import { IonContent, IonSpinner } from '@ionic/react';

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <IonContent>
      <div className="landing">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <Hero
          backgroundImage="/Assets/pexels-loifotos-1660898.jpg"
          title="Fresh From The Farm To Your Table."
          subtitle="Quality Farm Products Directly From Trusted Farmers."
          buttonText="Get Started"
          buttonLink="/auth/signup"
        />

        {/* Products Section */}
        <section className="products">
          <h2>Featured Products</h2>
          {loading ? (
            <div className="loading-spinner">
              <IonSpinner name="crescent" />
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={(product : any) => console.log('Added to cart:', product)}
                />
              ))}
            </div>
          ) : (
            <p className="no-products">No products available at the moment.</p>
          )}
        </section>

        {/* Footer */}
          <Footer />
      </div>
    </IonContent>
  );
};

export default LandingPage;
