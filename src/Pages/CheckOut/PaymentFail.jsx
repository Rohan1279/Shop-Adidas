export default function PaymentFail() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-1/2">
            <h1 className="text-center text-3xl font-bold">Payment Failed</h1>
            <p className="text-center text-3xl font-bold">Please try again</p>
            <p className="text-center text-3xl font-bold">
              If the problem persists, please contact us
            </p>
            <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Transaction Id
                </label>
                {/* <p className="text-base text-gray-700">{transactionId}</p> */}
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Order Id
                </label>
                {/* <p className="text-base text-gray-700">{order._id}</p> */}
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Amount
                </label>
                {/* <p className="text-base text-gray-700">{order.price}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
