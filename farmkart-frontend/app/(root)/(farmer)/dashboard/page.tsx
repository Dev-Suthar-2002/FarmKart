'use client'

import React, { useEffect, useState } from "react";
import CreateProduct from "@/components/farmer/CreateProduct";
import ProductList from "@/components/farmer/ProductList";
import api from "@/lib/api"; // Adjust the import path as necessary
import { Product } from "@/components/farmer/ProductList"; // Import the Product type

function Page() {
  const [products, setProducts] = useState<Product[]>([]); // State to hold the product list
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State for the selected product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const fetchProducts = async () => {
    setLoading(true); // Set loading to true
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await api("/product", {
        method: "GET",
        token: accessToken || undefined, // Include the access token
      });
      setProducts(response); // Update the product list
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false
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
      {loading && <div>Loading products...</div>} {/* Loading message */}
      {error && <div className="text-red-500">{error}</div>} {/* Error message */}
      <ProductList 
        products={products} 
        onEditProduct={handleEditProduct} // Pass the edit handler
      />
    </div>
  );
}

export default Page;