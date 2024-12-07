import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { Product } from "./ProductList";
import Input  from "@/components/shared/Input";
import Button from "../shared/Button";

interface CreateProductProps {
  onProductChange: (product: Product) => void;
  selectedProduct: Product | null;
}

export default function CreateProduct({ onProductChange, selectedProduct }: CreateProductProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [farmerId, setFarmerId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: null as string | null,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser  = JSON.parse(user);
      if (parsedUser .role === "farmer") {
        setFarmerId(parsedUser ._id);
      }
    }
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price.toString(),
        stock: selectedProduct.stock.toString(),
        category: selectedProduct.category,
        imageUrl: selectedProduct.imageUrl,
      });

      setIsUpdating(true); 
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: null,
      });
      setIsUpdating(false); 
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert("Please upload an image!");
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseFloat(formData.stock),
      category: formData.category,
      imageUrl: formData.imageUrl,
      farmer: farmerId,
    };

    try {
      let newProduct: Product;

      if (isUpdating && selectedProduct) {
        newProduct = await api(`/product/${selectedProduct._id}`, {
          method: "PATCH",
          body: productData,
          token: accessToken || undefined,
        });
        alert("Product updated successfully!");
      } else {
        newProduct = await api("/product", {
          method: "POST",
          body: productData,
          token: accessToken || undefined,
        });
        alert("Product created successfully!");
      }

      onProductChange(newProduct);

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl : null,
      });

      setIsUpdating(false);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isUpdating ? "Update Product" : "Create Product"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />

        <Input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <Input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <Input
          type="file"
          name="imageUrl"
          onChange={handleFileChange}
        />
        
        <Button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800">
          {isUpdating ? "Update" : "Submit"}
        </Button>
      </form>
    </div>
  );
}