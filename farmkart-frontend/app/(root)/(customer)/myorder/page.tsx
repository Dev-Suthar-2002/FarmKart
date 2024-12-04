'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useUser } from '@/lib/userContext';
import OrdersTable from '@/components/customer/OrdersTable';

const fetchCustomerOrders = async (token: string) => {
    try {
        return await api('/order/customer-orders', {
            method: 'GET',
            token,
        });
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return [];
    }
};

const OrdersPage = () => {
    const { accessToken } = useUser();  
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            if (!accessToken) return; // Wait for access token
            const fetchedOrders = await fetchCustomerOrders(accessToken);
            setOrders(fetchedOrders);
            setLoading(false);
        };

        loadOrders();
    }, [accessToken]);

    if (loading) {
        return <p>Loading your orders...</p>;
    }

    if (orders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8 mt-4">My <span className='text-green-600'>Orders</span></h1>
            <OrdersTable orders={orders} />
        </div>
    );
};

export default OrdersPage;
