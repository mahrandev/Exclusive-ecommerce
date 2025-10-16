// src/pages/Checkout.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { createOrder } from "@/api/ordersApi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

// Zod schema for form validation
const billingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  streetAddress: z.string().min(5, { message: "Street address is required." }),
  phone: z.string().min(10, { message: "A valid phone number is required." }),
  email: z.string().email({ message: "Invalid email address." }),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore((state) => state);
  const { items, totalPrice: total, clearCart } = useCartStore((state) => state);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      name: user?.user_metadata?.full_name || ' ',
      email: user?.email || ' ',
      phone: ' ',
      streetAddress: ' ',
    },
  });

  const { mutate: processOrder, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      clearCart();
      navigate('/order-confirmation', { state: { orderId: data.id }, replace: true });
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
        name: formData.name,
        street: formData.streetAddress,
        phone: formData.phone,
        email: formData.email,
      },
      totalPrice: total,
      cartItems: items,
    };

    processOrder(orderPayload);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Billing Details</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Side: Billing Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" {...register("name")} placeholder="John Doe" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="streetAddress">Street Address</Label>
            <Input id="streetAddress" {...register("streetAddress")} placeholder="123 Main St" />
            {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" {...register("phone")} placeholder="+1 234 567 890" />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} placeholder="john.doe@example.com" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="space-y-6">
          <div className="border rounded-lg p-4 space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border rounded-lg p-4 space-y-2">
             <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <Button type="submit" className="w-full h-12 text-lg" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin" /> : "Place Order"}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default CheckoutPage;
