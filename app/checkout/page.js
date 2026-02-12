"use client";

import React, { useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Building,
  CreditCard,
  Smartphone,
  Landmark,
  Lock,
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Reusable form field with icon, error & hint                               */
/* -------------------------------------------------------------------------- */
function Field({ label, id, icon: Icon, children, hint, error }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#0E1D21]">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
          <Icon className="h-5 w-5" />
        </div>
        {children}
      </div>
      {error ? (
        <div className="flex items-center gap-1 text-red-500 text-xs">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      ) : hint ? (
        <p className="text-xs text-[#677E8A]">{hint}</p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Checkout Component                                                   */
/* -------------------------------------------------------------------------- */
export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user, isLoading: authLoading } = useAuth();
  const safeCart = cart || [];

  // ----- Step & order state -----
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ----- Payment method selection -----
  const [paymentMethod, setPaymentMethod] = useState("card");

  // ----- Form data -----
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  // ----- Validation & touched state -----
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ----- Redirect if cart empty -----
  useEffect(() => {
    if (safeCart.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [safeCart, orderPlaced, router]);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [authLoading, user, router]);

  // ----- Unique IDs for form fields -----
  const uid = useId();
  const ids = {
    firstName: `${uid}-firstName`,
    lastName: `${uid}-lastName`,
    email: `${uid}-email`,
    phone: `${uid}-phone`,
    address: `${uid}-address`,
    city: `${uid}-city`,
    state: `${uid}-state`,
    zipCode: `${uid}-zipCode`,
    cardNumber: `${uid}-cardNumber`,
    cardName: `${uid}-cardName`,
    expiryDate: `${uid}-expiryDate`,
    cvv: `${uid}-cvv`,
    upiId: `${uid}-upiId`,
  };

  /* ---------- Price helpers ---------- */
  const formatPrice = (price) => {
    const num = Number(price || 0);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  const subtotal = safeCart.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  /* ---------- Validation rules ---------- */
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? "" : "Enter a valid email";
  };
  const validatePhone = (phone) => {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 7 ? "" : "Phone must be at least 7 digits";
  };
  const validateName = (name, fieldName) => {
    if (!name.trim()) return `${fieldName} is required`;
    if (!/^[a-zA-Z\s]+$/.test(name))
      return `${fieldName} can only contain letters`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    return "";
  };
  const validateNonEmpty = (value, fieldName) => {
    return value.trim() ? "" : `${fieldName} is required`;
  };
  const validateZip = (zip) => {
    if (!zip.trim()) return "Zip code is required";
    const digits = zip.replace(/\D/g, "");
    return digits.length >= 5 ? "" : "Enter a valid zip code";
  };
  const validateCardNumber = (num) => {
    if (!num) return "Card number is required";
    const digits = num.replace(/\D/g, "");
    return digits.length >= 15 ? "" : "Invalid card number";
  };
  const validateExpiry = (exp) => {
    if (!exp) return "Expiry date is required";
    const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    return regex.test(exp) ? "" : "Use MM/YY format";
  };
  const validateCVV = (cvv) => {
    if (!cvv) return "CVV is required";
    const digits = cvv.replace(/\D/g, "");
    return digits.length >= 3 ? "" : "CVV must be 3-4 digits";
  };

  /* ---------- Change & blur handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processed = value;

    if (name === "firstName" || name === "lastName") {
      processed = value.replace(/[^a-zA-Z\s]/g, "");
    }
    if (name === "phone" || name === "zipCode" || name === "cvv" || name === "cardNumber") {
      processed = value.replace(/\D/g, "");
    }
    if (name === "expiryDate") {
      processed = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})/, "$1/")
        .slice(0, 5);
    }

    setFormData((prev) => ({ ...prev, [name]: processed }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = "";
    switch (name) {
      case "firstName":
        error = validateName(value, "First name");
        break;
      case "lastName":
        error = validateName(value, "Last name");
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "address":
        error = validateNonEmpty(value, "Address");
        break;
      case "city":
        error = validateNonEmpty(value, "City");
        break;
      case "state":
        error = validateNonEmpty(value, "State");
        break;
      case "zipCode":
        error = validateZip(value);
        break;
      case "cardNumber":
        if (paymentMethod === "card") error = validateCardNumber(value);
        break;
      case "cardName":
        if (paymentMethod === "card") error = validateNonEmpty(value, "Name on card");
        break;
      case "expiryDate":
        if (paymentMethod === "card") error = validateExpiry(value);
        break;
      case "cvv":
        if (paymentMethod === "card") error = validateCVV(value);
        break;
      case "upiId":
        if (paymentMethod === "upi") error = value.trim() ? "" : "UPI ID is required";
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /* ---------- Step navigation ---------- */
  const validateStep = (stepNumber) => {
    const stepErrors = {};
    if (stepNumber === 1) {
      if (!formData.firstName.trim()) stepErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) stepErrors.lastName = "Last name is required";
      if (!formData.email.trim()) stepErrors.email = "Email is required";
    }
    if (stepNumber === 2) {
      if (!formData.address.trim()) stepErrors.address = "Address is required";
      if (!formData.city.trim()) stepErrors.city = "City is required";
      if (!formData.state.trim()) stepErrors.state = "State is required";
      if (!formData.zipCode.trim()) stepErrors.zipCode = "Zip code is required";
    }
    if (stepNumber === 3) {
      if (paymentMethod === "card") {
        if (!formData.cardNumber) stepErrors.cardNumber = "Card number is required";
        if (!formData.cardName) stepErrors.cardName = "Name on card is required";
        if (!formData.expiryDate) stepErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv) stepErrors.cvv = "CVV is required";
      }
      if (paymentMethod === "upi") {
        if (!formData.upiId) stepErrors.upiId = "UPI ID is required";
      }
    }
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const handleStepContinue = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
    }
  };

  const handleStepBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else router.push("/cart");
  };

  /* ---------- Place order – saves order with userId ---------- */
  const placeOrder = async () => {
    if (!validateStep(3)) return;

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));

      const orderId = `ORD-${Date.now().toString().slice(-8)}`;

      const shipping = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone || "",
        email: formData.email,
      };

      let payment = {};
      if (paymentMethod === "card") {
        const last4 = formData.cardNumber.slice(-4);
        payment = {
          type: "Credit Card",
          last4,
          cardName: formData.cardName,
        };
      } else if (paymentMethod === "upi") {
        const last4 = formData.upiId.slice(-4);
        payment = {
          type: "UPI",
          last4,
          upiId: formData.upiId,
        };
      } else if (paymentMethod === "netbanking") {
        payment = {
          type: "Net Banking",
          last4: "N/A",
        };
      }

      const newOrder = {
        id: orderId,
        userId: user?.id,                // ✅ crucial for user‑wise filtering
        date: new Date().toISOString(),
        status: "processing",
        items: safeCart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          isPrescription: item.isPrescription || false,
        })),
        subtotal,
        shippingCost: shipping,         // Note: your orders page expects `shippingCost` as cost, not object – you may want to adjust
        tax,
        total,
        shipping,
        payment,
        delivery: "Standard",
      };

      const existingOrders = JSON.parse(localStorage.getItem("edpharma_orders") || "[]");
      existingOrders.push(newOrder);
      localStorage.setItem("edpharma_orders", JSON.stringify(existingOrders));

      clearCart();
      setOrderNumber(orderId);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Order placement failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- Success screen ---------- */
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-[#2596be]/20">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0E1D21] mb-2">Order Confirmed!</h1>
          <p className="text-[#677E8A] mb-4">
            Thank you for your purchase. Your order is being processed.
          </p>
          <div className="bg-[#2596be]/5 p-4 rounded-xl border border-[#2596be]/20 mb-6">
            <p className="text-sm text-[#122E34]">Order ID</p>
            <p className="font-mono text-lg font-bold text-[#0E1D21]">{orderNumber}</p>
            <p className="text-sm text-[#122E34] mt-2">Total paid</p>
            <p className="text-xl font-bold text-[#2596be]">₹{formatPrice(total)}</p>
          </div>
          <button
            onClick={() => router.push("/products")}
            className="w-full bg-gradient-to-r from-[#122E34] to-[#2596be] text-white py-3 rounded-xl font-semibold shadow-lg hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /* ---------- MAIN UI ---------- */
  const progressPercentage = ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero header with gradient */}
      <div className="bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handleStepBack}
              className="flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <span className="text-sm font-medium">{safeCart.length} items</span>
              </div>
              <div className="h-6 w-px bg-white/30" />
              <div>
                <span className="text-sm opacity-90">Total</span>
                <span className="ml-2 font-bold">₹{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-white">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Checkout</h1>
            <p className="mt-2 text-base text-white/90">
              Step {step} of 4:{" "}
              {step === 1 && "Contact"}
              {step === 2 && "Shipping"}
              {step === 3 && "Payment"}
              {step === 4 && "Review"}
            </p>
          </div>
          {/* Progress bar */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex justify-between mb-2">
              {["Contact", "Shipping", "Payment", "Review"].map((label, i) => (
                <div
                  key={label}
                  className={`text-xs font-medium ${
                    step > i ? "text-white" : "text-white/60"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - FORMS */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-[#ABAFB5]/30 p-6 sm:p-8">
              {/* ----- STEP 1: CONTACT ----- */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#0E1D21]">
                      Contact Information
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label="First name"
                      id={ids.firstName}
                      icon={User}
                      error={touched.firstName && errors.firstName}
                    >
                      <input
                        id={ids.firstName}
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border ${
                          touched.firstName && errors.firstName
                            ? "border-red-400 ring-red-400/20"
                            : "border-[#ABAFB5]"
                        } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        placeholder="John"
                      />
                    </Field>
                    <Field
                      label="Last name"
                      id={ids.lastName}
                      icon={User}
                      error={touched.lastName && errors.lastName}
                    >
                      <input
                        id={ids.lastName}
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border ${
                          touched.lastName && errors.lastName
                            ? "border-red-400 ring-red-400/20"
                            : "border-[#ABAFB5]"
                        } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        placeholder="Doe"
                      />
                    </Field>
                  </div>
                  <Field
                    label="Email address"
                    id={ids.email}
                    icon={Mail}
                    error={touched.email && errors.email}
                  >
                    <input
                      id={ids.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border ${
                        touched.email && errors.email
                          ? "border-red-400 ring-red-400/20"
                          : "border-[#ABAFB5]"
                      } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                      placeholder="john@example.com"
                    />
                  </Field>
                  <Field
                    label="Phone number (optional)"
                    id={ids.phone}
                    icon={Phone}
                    hint="Numbers only, at least 7 digits"
                    error={touched.phone && errors.phone}
                  >
                    <input
                      id={ids.phone}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border ${
                        touched.phone && errors.phone
                          ? "border-red-400 ring-red-400/20"
                          : "border-[#ABAFB5]"
                      } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                      placeholder="15551234567"
                    />
                  </Field>
                </div>
              )}

              {/* ----- STEP 2: SHIPPING ----- */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#0E1D21]">
                      Shipping Address
                    </h2>
                  </div>
                  <Field
                    label="Street address"
                    id={ids.address}
                    icon={Home}
                    error={touched.address && errors.address}
                  >
                    <input
                      id={ids.address}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border ${
                        touched.address && errors.address
                          ? "border-red-400 ring-red-400/20"
                          : "border-[#ABAFB5]"
                      } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                      placeholder="123 Health Street"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field
                      label="City"
                      id={ids.city}
                      icon={Building}
                      error={touched.city && errors.city}
                    >
                      <input
                        id={ids.city}
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border ${
                          touched.city && errors.city
                            ? "border-red-400 ring-red-400/20"
                            : "border-[#ABAFB5]"
                        } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        placeholder="Medical City"
                      />
                    </Field>
                    <Field
                      label="State"
                      id={ids.state}
                      icon={MapPin}
                      error={touched.state && errors.state}
                    >
                      <input
                        id={ids.state}
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border ${
                          touched.state && errors.state
                            ? "border-red-400 ring-red-400/20"
                            : "border-[#ABAFB5]"
                        } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        placeholder="State"
                      />
                    </Field>
                  </div>
                  <Field
                    label="Zip / Postal code"
                    id={ids.zipCode}
                    icon={Mail}
                    error={touched.zipCode && errors.zipCode}
                  >
                    <input
                      id={ids.zipCode}
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full rounded-xl border ${
                        touched.zipCode && errors.zipCode
                          ? "border-red-400 ring-red-400/20"
                          : "border-[#ABAFB5]"
                      } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                      placeholder="12345"
                    />
                  </Field>
                </div>
              )}

              {/* ----- STEP 3: PAYMENT METHOD ----- */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#0E1D21]">
                      Payment Method
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "card", label: "Credit / Debit", icon: CreditCard },
                      { id: "upi", label: "UPI", icon: Smartphone },
                      { id: "netbanking", label: "Net Banking", icon: Landmark },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition ${
                          paymentMethod === method.id
                            ? "border-[#2596be] bg-[#2596be]/5"
                            : "border-[#ABAFB5] bg-white hover:border-[#2596be]/50"
                        }`}
                      >
                        <method.icon
                          className={`h-6 w-6 mb-1 ${
                            paymentMethod === method.id
                              ? "text-[#2596be]"
                              : "text-[#677E8A]"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            paymentMethod === method.id
                              ? "text-[#0E1D21]"
                              : "text-[#677E8A]"
                          }`}
                        >
                          {method.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-4">
                      <Field
                        label="Card number"
                        id={ids.cardNumber}
                        icon={CreditCard}
                        error={touched.cardNumber && errors.cardNumber}
                      >
                        <input
                          id={ids.cardNumber}
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="1234 5678 9012 3456"
                          className={`w-full rounded-xl border ${
                            touched.cardNumber && errors.cardNumber
                              ? "border-red-400 ring-red-400/20"
                              : "border-[#ABAFB5]"
                          } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        />
                      </Field>
                      <Field
                        label="Name on card"
                        id={ids.cardName}
                        icon={User}
                        error={touched.cardName && errors.cardName}
                      >
                        <input
                          id={ids.cardName}
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="John Doe"
                          className={`w-full rounded-xl border ${
                            touched.cardName && errors.cardName
                              ? "border-red-400 ring-red-400/20"
                              : "border-[#ABAFB5]"
                          } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        />
                      </Field>
                      <div className="grid grid-cols-2 gap-4">
                        <Field
                          label="Expiry (MM/YY)"
                          id={ids.expiryDate}
                          icon={Mail}
                          error={touched.expiryDate && errors.expiryDate}
                        >
                          <input
                            id={ids.expiryDate}
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="MM/YY"
                            className={`w-full rounded-xl border ${
                              touched.expiryDate && errors.expiryDate
                                ? "border-red-400 ring-red-400/20"
                                : "border-[#ABAFB5]"
                            } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                          />
                        </Field>
                        <Field
                          label="CVV"
                          id={ids.cvv}
                          icon={Lock}
                          error={touched.cvv && errors.cvv}
                        >
                          <input
                            id={ids.cvv}
                            name="cvv"
                            type="password"
                            value={formData.cvv}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="123"
                            className={`w-full rounded-xl border ${
                              touched.cvv && errors.cvv
                                ? "border-red-400 ring-red-400/20"
                                : "border-[#ABAFB5]"
                            } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="mt-4">
                      <Field
                        label="UPI ID"
                        id={ids.upiId}
                        icon={Smartphone}
                        hint="e.g. name@bank"
                        error={touched.upiId && errors.upiId}
                      >
                        <input
                          id={ids.upiId}
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="username@okhdfcbank"
                          className={`w-full rounded-xl border ${
                            touched.upiId && errors.upiId
                              ? "border-red-400 ring-red-400/20"
                              : "border-[#ABAFB5]"
                          } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        />
                      </Field>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="mt-4 p-4 bg-[#2596be]/5 rounded-xl border border-[#2596be]/20 text-center">
                      <p className="text-[#0E1D21] text-sm">
                        You will be redirected to your bank's secure page after placing the order.
                      </p>
                      <p className="text-[#677E8A] text-xs mt-1">
                        We support all major Indian banks.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ----- STEP 4: REVIEW ----- */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#0E1D21]">
                      Review Your Order
                    </h2>
                  </div>

                  <div className="bg-[#2596be]/5 p-4 rounded-xl border border-[#2596be]/20">
                    <h3 className="font-semibold text-[#0E1D21] flex items-center gap-2">
                      <User size={16} /> Contact
                    </h3>
                    <p className="text-sm text-[#122E34] mt-1">
                      {formData.firstName} {formData.lastName} <br />
                      {formData.email} {formData.phone && `• ${formData.phone}`}
                    </p>
                  </div>

                  <div className="bg-[#2596be]/5 p-4 rounded-xl border border-[#2596be]/20">
                    <h3 className="font-semibold text-[#0E1D21] flex items-center gap-2">
                      <MapPin size={16} /> Shipping Address
                    </h3>
                    <p className="text-sm text-[#122E34] mt-1">
                      {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>

                  <div className="bg-[#2596be]/5 p-4 rounded-xl border border-[#2596be]/20">
                    <h3 className="font-semibold text-[#0E1D21] flex items-center gap-2">
                      <CreditCard size={16} /> Payment
                    </h3>
                    <p className="text-sm text-[#122E34] mt-1 capitalize">
                      {paymentMethod === "card" && "💳 Credit / Debit Card"}
                      {paymentMethod === "upi" && "📱 UPI"}
                      {paymentMethod === "netbanking" && "🏦 Net Banking"}
                    </p>
                  </div>

                  <div className="border-t border-[#ABAFB5]/30 pt-4">
                    <h3 className="font-semibold text-[#0E1D21] mb-3">
                      Items ({safeCart.length})
                    </h3>
                    <div className="space-y-3">
                      {safeCart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b border-[#ABAFB5]/20 last:border-0"
                        >
                          <div>
                            <p className="font-medium text-[#0E1D21]">
                              {item.name}
                            </p>
                            <p className="text-xs text-[#677E8A]">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-[#2596be]">
                            ₹{formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {step < 4 ? (
                  <button
                    onClick={handleStepContinue}
                    className="flex-1 bg-gradient-to-r from-[#122E34] to-[#2596be] text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-[#122E34]/90 hover:to-[#2596be]/90 transition flex items-center justify-center gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={placeOrder}
                    disabled={isLoading || !user}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      "Processing..."
                    ) : (
                      <>
                        Place Order
                        <Lock className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
                {step > 1 && (
                  <button
                    onClick={handleStepBack}
                    className="px-6 py-3 rounded-xl border border-[#ABAFB5] text-[#0E1D21] font-semibold hover:bg-[#ABAFB5]/10 transition"
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-[#2596be]/20 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-[#0E1D21] flex items-center gap-2 mb-4">
                <ShoppingBag className="h-5 w-5 text-[#2596be]" />
                Order Summary
              </h3>
              <div className="max-h-64 overflow-y-auto pr-1 -mr-1 space-y-3 mb-4">
                {safeCart.length === 0 ? (
                  <p className="text-[#677E8A] text-sm">Your cart is empty</p>
                ) : (
                  safeCart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[#0E1D21]">
                        {item.name}{" "}
                        <span className="text-[#677E8A]">×{item.quantity}</span>
                      </span>
                      <span className="font-medium text-[#122E34]">
                        ₹{formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-[#ABAFB5]/30 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#677E8A]">Subtotal</span>
                  <span className="font-medium text-[#0E1D21]">
                    ₹{formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#677E8A]">Shipping</span>
                  <span className="font-medium text-[#0E1D21]">
                    {shipping === 0 ? "FREE" : `₹${formatPrice(shipping)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#677E8A]">Tax (8%)</span>
                  <span className="font-medium text-[#0E1D21]">
                    ₹{formatPrice(tax)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-[#ABAFB5]/30 mt-2">
                  <span className="text-[#0E1D21]">Total</span>
                  <span className="text-[#2596be] text-xl">
                    ₹{formatPrice(total)}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#677E8A] bg-[#2596be]/5 p-3 rounded-xl">
                <Lock className="h-4 w-4 text-[#2596be]" />
                <span>Secure checkout – SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}