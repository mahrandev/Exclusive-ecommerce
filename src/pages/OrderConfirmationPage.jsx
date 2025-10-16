// src/pages/OrderConfirmationPage.jsx
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="container mx-auto max-w-3xl text-center py-12 md:py-20">
      <div className="flex justify-center mb-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3">Thank You for Your Order!</h1>
      <p className="text-gray-700 mb-6">
        Your order has been placed successfully.
      </p>
      
      {orderId && (
        <div className="bg-gray-100 rounded-lg p-4 inline-block mb-8">
          <p className="text-gray-800">Your Order ID is: <span className="font-bold text-lg">#{orderId}</span></p>
        </div>
      )}

      <p className="text-gray-600 mb-8">
        You will receive an email confirmation shortly.
      </p>

      <Button asChild>
        <Link to="/">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default OrderConfirmationPage;
