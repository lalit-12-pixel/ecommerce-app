import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faChevronDown,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/orders", {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);


  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) return <Loader/>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-8">
            <FontAwesomeIcon
              icon={faBoxOpen}
              className="text-4xl text-indigo-600 mr-4"
            />
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          </div>

          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => {
               
                const total = order.products.reduce((sum, p) => {
                  return sum + (p.product?.price || 0) * p.quantity;
                }, 0);
                const totalQuantity=order.products.reduce((sum, p) => {
                  return sum + (p.quantity || 0);
                }, 0);

                return (
                  <div
                    key={order._id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Order header */}
                    <div
                      className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleOrderDetails(order._id)}
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          Order # {totalQuantity} items
                        </p>
                        <p className="text-sm text-gray-500">
                          Date:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          {order.status || "Processing"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Total: ₹{total.toFixed(2)}
                        </p>
                      </div>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`ml-4 text-gray-500 transition-transform ${
                          expandedOrder === order._id ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Expanded details */}
                    {expandedOrder === order._id && (
                      <div className="p-4 border-t border-gray-200">
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <ul className="space-y-4">
                          {order.products.map((p) => (
                            <li key={p._id} className="flex items-center">
                              <img
                                src={p.product?.image || "/placeholder.png"}
                                alt={p.product?.name || "Product"}
                                className="w-16 h-16 rounded-md mr-4"
                              />
                              <div className="flex-grow">
                                <p className="font-semibold text-gray-800">
                                  {p.product?.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Qty: {p.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">
                                ₹
                                {p.product?.price
                                  ? (p.product.price * p.quantity).toFixed(2)
                                  : "N/A"}
                              </p>
                            </li>
                          ))}
                        </ul>
                        
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                You haven&apos;t placed any orders yet.
              </p>
              <button
                onClick={() => navigate("/home")}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700"
              >
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
