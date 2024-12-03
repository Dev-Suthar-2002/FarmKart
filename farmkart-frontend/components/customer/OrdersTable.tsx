'use client';

import React from 'react';

interface Order {
    _id: string;
    totalPrice: number;
    status: string;
    paymentStatus: string;
    estimatedDeliveryDate: string;
    products: {
        product: { name: string; price: number };
        quantity: number;
    }[];
}

const OrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Total Price</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Payment Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Delivery Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="border-b">
                            <td className="px-6 py-4 text-sm">{order._id}</td>
                            <td className="px-6 py-4 text-sm text-green-700 font-bold">${order.totalPrice.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm capitalize">{order.status}</td>
                            <td className="px-6 py-4 text-sm capitalize">{order.paymentStatus}</td>
                            <td className="px-6 py-4 text-sm">
                                {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <ul className="list-disc pl-5">
                                    {order.products.map((item, idx) => (
                                        <li key={idx}>
                                            {item.quantity} x {item.product.name} (${item.product.price})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
