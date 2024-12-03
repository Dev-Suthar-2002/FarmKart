'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import toast from "react-hot-toast";
import { useUser } from "@/lib/userContext";
import { useRouter } from "next/navigation";

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
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useUser();
  const { name, price, stock, imageUrl, farmer } = product;
  const { addToCart } = useCart();
  const  router  = useRouter(); 

  const handleAddToCart = () => {
    addToCart(product);

    // Show a toast notification
    toast.success(`${name} has been added to your cart!`, {
      style: {
        borderRadius: "8px",
        background: "#16a34a",
        color: "#fff",
      }
    });
  };

  return (
    <Card className="w-full md:w-[260px] shadow-md hover:shadow-lg transition-shadow rounded-lg">
      {/* Product Image */}
      <CardHeader className="p-0">
        <div className="relative w-full h-40">
          <Image
            src={"/pexels-wanchai-kt-1566348-9207452.jpg"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>

      {/* Product Details */}
      <CardContent className="p-4">
        <CardTitle className="text-base font-semibold truncate">{name}</CardTitle>
        <p className="text-sm text-gray-600 truncate">
          {farmer?.name || "Unknown Farmer"}
        </p>
        <p className="mt-2 text-green-600 font-bold text-lg">${price}</p>
        <p className={`text-sm mt-1 ${stock > 0 ? "text-gray-600" : "text-red-600"}`}>
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => user ? handleAddToCart() : router.push("/login") }
          className="w-full bg-green-600 hover:bg-green-800"
          disabled={stock === 0}
          variant={stock > 0 ? "default" : "destructive"}
        >
          <span className="flex justify-center">
            Add to Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 ml-2"
            >
              <path d="M12 1.5a.75.75 0 0 1 .75.75V7.5h-1.5V2.25A.75.75 0 0 1 12 1.5ZM11.25 7.5v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
            </svg>
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
