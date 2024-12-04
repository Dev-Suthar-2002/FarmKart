import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import ProductCard from "./ProductCard";

interface Farmer {
  _id: string; // Assuming the farmer has an ID
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string | null;
  farmer: Farmer | null;
  category: string;
}

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void; // Callback to handle editing
}

export default function ProductList({ products, onEditProduct }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [farmerId, setFarmerId] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
      const farmerId = decodedToken.sub; // Assuming 'sub' contains the farmer ID
      setFarmerId(farmerId);

      // Filter products based on the farmer ID
      const farmerProducts = products.filter(product => product.farmer && product.farmer._id === farmerId);
      setFilteredProducts(farmerProducts);
    }
  }, [products]);

  const handleDelete = async (id: string) => {
    const accessToken = localStorage.getItem("access_token");
    setFilteredProducts((prevProducts) => prevProducts.filter(product => product._id !== id));

    try {
      await api(`/product/${id}`, {
        method: "DELETE",
        token: accessToken || undefined,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    onEditProduct(product); // Call the passed down function to handle editing
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={handleDelete}
          onEdit={handleEditProduct} // Pass the handleEditProduct function
        />
      ))}
    </div>
  );
}