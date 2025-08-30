import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faChevronDown, faReceipt } from '@fortawesome/free-solid-svg-icons';

// Mock Data - Replace with API call
const mockOrders = [
    {
        id: '987654',
        date: '2024-08-15',
        status: 'Delivered',
        total: 124.98,
        items: [
            { id: 1, name: 'Wireless Headphones', quantity: 1, price: 99.99, image: 'https://placehold.co/100x100/6366f1/white?text=Item' },
            { id: 3, name: 'Cotton T-Shirt', quantity: 1, price: 24.99, image: 'https://placehold.co/100x100/6366f1/white?text=Item' },
        ],
    },
    {
        id: '987655',
        date: '2024-08-20',
        status: 'Shipped',
        total: 199.99,
        items: [
            { id: 2, name: 'Smart Watch', quantity: 1, price: 199.99, image: 'https://placehold.co/100x100/6366f1/white?text=Item' },
        ],
    },
];


const MyOrdersPage = () => {
    const navigate = useNavigate();
    const [orders] = useState(mockOrders);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <div className="flex items-center mb-8">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-4xl text-indigo-600 mr-4" />
                        <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
                    </div>
                    {orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div
                                        className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                                        onClick={() => toggleOrderDetails(order.id)}
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-800">Order #{order.id}</p>
                                            <p className="text-sm text-gray-500">Date: {order.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>{order.status}</p>
                                            <p className="text-sm text-gray-500">Total: ${order.total.toFixed(2)}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronDown} className={`ml-4 text-gray-500 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                                    </div>
                                    {expandedOrder === order.id && (
                                        <div className="p-4 border-t border-gray-200">
                                            <h4 className="font-semibold mb-2">Items:</h4>
                                            <ul className="space-y-4">
                                                {order.items.map(item => (
                                                    <li key={item.id} className="flex items-center">
                                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md mr-4" />
                                                        <div className="flex-grow">
                                                            <p className="font-semibold text-gray-800">{item.name}</p>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                        </div>
                                                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-4 pt-4 border-t text-right">
                                                <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-200">
                                                    <FontAwesomeIcon icon={faReceipt} className="mr-2"/>
                                                    View Invoice
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">You haven't placed any orders yet.</p>
                            <button onClick={() => navigate('/home')} className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700">
                                Start Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrdersPage;