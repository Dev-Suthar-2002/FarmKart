'use client'

import React, { useEffect, useState } from "react";
import CreateProduct from "@/components/farmer/CreateProduct";
import ProductList from "@/components/farmer/ProductList";
import api from "@/lib/api"; // Adjust the import path as necessary
import { Product } from "@/components/farmer/ProductList"; // Import the Product type

function Page() {
  const [products, setProducts] = useState<Product[]>([]); // State to hold the product list
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State for the selected product

  const fetchProducts = async () => {
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await api("/product", {
        method: "GET",
        token: accessToken || undefined, // Include the access token
      });
      setProducts(response); // Update the product list
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductChange = () => {
    fetchProducts(); // Refresh the product list when a new product is created
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product); // Set the selected product for editing
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <CreateProduct 
        onProductChange={handleProductChange} 
        selectedProduct={selectedProduct} // Pass the selected product for editing
      />
      <ProductList 
        products={products} 
        onEditProduct={handleEditProduct} // Pass the edit handler
      />
    </div>
  );
}

export default Page;