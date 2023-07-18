import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");
  console.log(transactionId);
  //   /orders/by-transaction-id
  const [order, setOrder] = useState({});
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/orders/by-transaction-id/${transactionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      });
  }, [transactionId]);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-1/2">
            <h1 className="text-center text-3xl font-bold">Payment Success</h1>
            <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Transaction Id
                </label>
                <p className="text-base text-gray-700">{transactionId}</p>
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Order Id
                </label>
                <p className="text-base text-gray-700">{order._id}</p>
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Amount
                </label>
                <p className="text-base text-gray-700">{order.price}</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
