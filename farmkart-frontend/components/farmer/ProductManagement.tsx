import React, { useState } from "react";
import ProductList from "./ProductList";
import { Product } from "./ProductList";
import CreateProduct from './CreateProduct';

const ProductManagement = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]); // State to hold the list of products

  const handleProductChange = (newProduct: Product) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(p => p._id === newProduct._id);
      if (existingProductIndex > -1) {
        // If the product already exists, replace it
        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex] = newProduct;
        return updatedProducts;
      } else {
        // If it's a new product, add it to the list
        return [...prevProducts, newProduct];
      }
    });
    setSelectedProduct(null); // Reset selected product after creation or update
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <CreateProduct onProductChange={handleProductChange} selectedProduct={selectedProduct} />
      <ProductList products={products} onEditProduct={handleEditProduct} />
    </div>
  );
};

export default ProductManagement;