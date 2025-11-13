import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { createOrder } from "@/api/ordersApi";

// Zod schema for form validation
const billingSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  companyName: z.string().optional(),
  streetAddress: z.string().min(5, { message: "Street address is required" }),
  apartment: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
});

/**
 * @description Custom hook for managing the logic of the CheckoutPage.
 * It handles form state, validation, cart data, payment processing, and order submission.
 * @returns {object} An object containing all the necessary state and handlers for the CheckoutPage component.
 */
const useCheckout = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore((state) => state);
  const {
    items,
    totalPrice: total,
    clearCart,
  } = useCartStore((state) => state);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      firstName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      city: "",
      phone: "",
    },
  });

  const { mutate: processOrder, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/order-confirmation", {
        state: { orderId: data.id },
        replace: true,
      });
    },
    onError: (error) => {
      toast.error(`Failed to place order: ${error.message}`);
    },
  });

  const onSubmit = (formData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
      return;
    }

    const orderPayload = {
      userId: user.id,
      shippingAddress: {
        name: formData.firstName,
        company: formData.companyName,
        street: formData.streetAddress,
        apartment: formData.apartment,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
      },
      cartItems: items,
      paymentMethod,
    };

    processOrder(orderPayload);
  };

  return {
    register,
    handleSubmit,
    errors,
    items,
    total,
    paymentMethod,
    setPaymentMethod,
    onSubmit,
    isPending,
  };
};

export default useCheckout;
