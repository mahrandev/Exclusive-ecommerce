import { Link } from "react-router-dom";
import useCheckout from "@/hooks/useCheckout"; // ✅ استيراد الهوك المخصص

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from "lucide-react";

// Import payment method images
import bkashImg from "@/assets/img/bKash.svg";
import visaImg from "@/assets/img/visa.svg";
import mastercardImg from "@/assets/img/master-card.svg";
import nagadImg from "@/assets/img/what.svg";

const CheckoutPage = () => {
  // ✅ استخدام الهوك للحصول على كل المنطق والحالة
  const {
    register,
    handleSubmit,
    errors,
    items,
    total,
    paymentMethod,
    setPaymentMethod,
    onSubmit,
    isPending,
  } = useCheckout();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-600">
        <Link to="/" className="hover:text-gray-900">
          Account
        </Link>
        <span className="mx-2">/</span>
        <Link to="/" className="hover:text-gray-900">
          My Account
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-gray-900">
          Product
        </Link>
        <span className="mx-2">/</span>
        <Link to="/cart" className="hover:text-gray-900">
          View Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">CheckOut</span>
      </nav>

      <h1 className="mb-10 text-3xl font-semibold">Billing Details</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-16 lg:grid-cols-2"
      >
        {/* Left Side: Billing Form */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="firstName" className="mb-2 text-gray-600">
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              {...register("firstName")}
              className="bg-secondary-gray h-12 border-none"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="companyName" className="mb-2 text-gray-600">
              Company Name
            </Label>
            <Input
              id="companyName"
              {...register("companyName")}
              className="bg-secondary-gray h-12 border-none"
            />
          </div>

          <div>
            <Label htmlFor="streetAddress" className="mb-2 text-gray-600">
              Street Address<span className="text-red-500">*</span>
            </Label>
            <Input
              id="streetAddress"
              {...register("streetAddress")}
              className="bg-secondary-gray h-12 border-none"
            />
            {errors.streetAddress && (
              <p className="mt-1 text-sm text-red-500">
                {errors.streetAddress.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="apartment" className="mb-2 text-gray-600">
              Apartment, floor, etc. (optional)
            </Label>
            <Input
              id="apartment"
              {...register("apartment")}
              className="bg-secondary-gray h-12 border-none"
            />
          </div>

          <div>
            <Label htmlFor="city" className="mb-2 text-gray-600">
              Town/City<span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              {...register("city")}
              className="bg-secondary-gray h-12 border-none"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="mb-2 text-gray-600">
              Phone Number<span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              className="bg-secondary-gray h-12 border-none"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 text-gray-600">
              Email Address<span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="bg-secondary-gray h-12 border-none"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="saveInfo"
              className="h-5 w-5 cursor-pointer accent-red-500"
            />
            <label htmlFor="saveInfo" className="cursor-pointer text-gray-900">
              Save this information for faster check-out next time
            </label>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="space-y-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-14 w-14 object-contain"
                  />
                  <span className="text-gray-900">{item.title}</span>
                </div>
                <span className="font-normal">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-b pb-4">
            <div className="flex justify-between text-gray-900">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-4 text-gray-900">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-normal text-gray-900">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-6">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="bank" id="bank" />
                  <label
                    htmlFor="bank"
                    className="cursor-pointer text-gray-900"
                  >
                    Bank
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <img src={bkashImg} alt="bKash" className="h-7" />
                  <img src={visaImg} alt="Visa" className="h-7" />
                  <img src={mastercardImg} alt="Mastercard" className="h-7" />
                  <img src={nagadImg} alt="Nagad" className="h-7" />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <RadioGroupItem value="cash" id="cash" />
                <label htmlFor="cash" className="cursor-pointer text-gray-900">
                  Cash on delivery
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-4">
            <Input
              placeholder="Coupon Code"
              className="h-14 flex-1 border-gray-900"
            />
            <Button
              type="button"
              className="bg-primary-red h-14 px-12 text-white hover:bg-red-600"
            >
              Apply Coupon
            </Button>
          </div>

          <Button
            type="submit"
            className="bg-primary-red h-14 w-full text-base text-white hover:bg-red-600"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
