import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonSpinner,
} from '@ionic/react';
import axios from 'axios';
import Navbar from '../../components/shared/Navbar';
import ProductCard from '../../components/customer/ProductCard';
import './Products.css';
import { useCart } from '../../hooks/CartContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  farmer: {
    name: string;
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {addToCart} = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/product');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <IonPage>
      <IonContent className="products-page">
        {/* Navbar */}
        <Navbar />

        <div className="products-container">
          {/* Page Header */}
          <div className="products-header">
            <h1 className="products-title">
              Explore Our <span className="highlight">Products</span>
            </h1>
            <p className="products-subtitle">
              Find the best products tailored to your needs.
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <IonInput
              value={searchQuery}
              placeholder="Search for products..."
              onIonChange={(e) => handleSearch(e.detail.value!)}
              className="search-input"
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <IonSpinner name="crescent" />
              <p>Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}

          {/* Product Content */}
          {!loading && !error && (
            <IonGrid>
              {filteredProducts.length > 0 ? (
                <IonRow>
                  {filteredProducts.map((product) => (
                    <IonCol key={product._id} size="12" sizeMd="6" sizeLg="4">
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </IonCol>
                  ))}
                </IonRow>
              ) : (
                <p className="no-products">No products found.</p>
              )}
            </IonGrid>
          )}
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Products;
