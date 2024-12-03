import React, { useEffect, useState } from "react";
import api from "@/lib/api"; // Adjust the import path as necessary
import { useUser  } from "@/lib/userContext"; // Adjust the import path as necessary
import ProductCard from "../customer/ProductCard"; // Assuming you have a ProductCard component

export default function ProductList() {
  const { accessToken } = useUser (); // Get access token from context
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api("/product", {
        method: "GET",
        token: accessToken, // Include the access token
      });
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api(`/product/${id}`, {
        method: "DELETE",
        token: accessToken, // Include the access token
      });
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await api(`/product/${id}`, {
        method: "PATCH",
        body: updatedData,
        token: accessToken, // Include the access token
});
      fetchProducts(); // Refresh the product list after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          onDelete={handleDelete} 
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
}