import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import Button from '../shared/Button';
import './ProductCard.css';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl?: string;
    category: string;
    farmer: {
      name: string;
    };
  };
  onAddToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Base URL for your backend server
  const BASE_URL = 'http://localhost:3002/uploads/';


  return (
    <IonCard className="product-card modern-card">
      {/* Product Image */}
      <div className="product-card-image-container">
        <img
          className="product-card-image"
          src={product.imageUrl || "/Assets/pexels-shvetsa-5187579.jpg"}
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <IonCardHeader className="product-card-header">
        <IonCardTitle className="product-card-title">{product.name}</IonCardTitle>
        <p className="product-card-farmer">{product.farmer?.name || 'Unknown Farmer'}</p>
        <p className="product-card-price">${product.price.toFixed(2)}</p>
        <p
          className={`product-card-stock ${
            product.stock > 0 ? 'in-stock' : 'out-of-stock'
          }`}
        >
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
      </IonCardHeader>

      {/* Product Description */}
      <IonCardContent className="product-card-description">
        <p>{product.description}</p>
      </IonCardContent>

      {/* Add to Cart Button */}
      <div className="product-card-footer">
        <Button
          text="Add to Cart"
          onClick={() => onAddToCart(product)}
          className={`custom-add-to-cart-button ${
            product.stock === 0 ? 'disabled' : ''
          }`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="product-card-button-icon"
            >
              <path d="M12 1.5a.75.75 0 0 1 .75.75V7.5h-1.5V2.25A.75.75 0 0 1 12 1.5ZM11.25 7.5v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>
          }
        />
      </div>
    </IonCard>
  );
};

export default ProductCard;
