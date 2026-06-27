import { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import emptycart from "../assets/emptycart.png";
import { 
  FiLock, 
  FiAlertCircle, 
  FiCheckCircle, 
  FiShield, 
  FiX, 
  FiShoppingBag,
  FiUser,
  FiMapPin,
  FiPhone,
  FiArrowRight,
  FiSend
} from "react-icons/fi";

const Loader = () => (
  <div className="w-full h-screen flex items-center justify-center text-zinc-400 bg-zinc-900">
    <div className="text-xl">Loading Cart...</div>
  </div>
);

/* CheckoutModal component for realistic COD and mock Online Payment gateway */
const CheckoutModal = ({ totalAmount, cartItems, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("COD"); 
  const [checkoutStep, setCheckoutStep] = useState("info"); 
  const [selectedUpiApp, setSelectedUpiApp] = useState("GPay");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    upiId: ""
  });
  
  const [errors, setErrors] = useState({});
  const [processingStatus, setProcessingStatus] = useState("");

  const shippingCharges = paymentMethod === "COD" ? 30 : 0;
  const finalAmount = totalAmount + shippingCharges;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formatted = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === "zip") {
      const formatted = value.replace(/\D/g, "").slice(0, 6);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateInfoForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    if (formData.phone.length !== 10) newErrors.phone = "10-digit mobile number is required";
    if (!formData.address.trim()) newErrors.address = "Shipping address is required";
    if (formData.zip.length !== 6) newErrors.zip = "6-digit ZIP / Postal code is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!validateInfoForm()) return;

    if (paymentMethod === "COD") {
      // Proceed directly to processing order
      setCheckoutStep("processing");
      simulateOrderPlacement();
    } else {
      // Proceed to mock Online Payment UPI Gateway page
      setCheckoutStep("payment-gateway");
    }
  };

  const handleOnlinePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (selectedUpiApp === "custom") {
      if (!formData.upiId.trim() || !formData.upiId.includes("@")) {
        setErrors(prev => ({ ...prev, upiId: "Please enter a valid UPI ID (e.g. user@okhdfcbank)" }));
        return;
      }
    }

    setCheckoutStep("processing");
    simulateOrderPlacement();
  };

  const simulateOrderPlacement = () => {
    const statuses = paymentMethod === "COD" 
      ? [
          "Verifying your shipping address...",
          "Setting payment mode to Cash on Delivery...",
          "Finalizing order details and securing items..."
        ]
      : [
          "Establishing secure sandbox transaction...",
          `Requesting payment from UPI app (${selectedUpiApp === 'custom' ? formData.upiId : selectedUpiApp})...`,
          "Payment received successfully (Sandbox Simulator)...",
          "Registering order details in database..."
        ];

    let index = 0;
    setProcessingStatus(statuses[0]);

    const interval = setInterval(() => {
      index++;
      if (index < statuses.length) {
        setProcessingStatus(statuses[index]);
      } else {
        clearInterval(interval);
        triggerDatabaseOrder();
      }
    }, 1000);
  };

  const triggerDatabaseOrder = async () => {
    try {
      const success = await onSuccess(paymentMethod, shippingCharges);
      if (success) {
        setCheckoutStep("success");
      } else {
        setCheckoutStep("failure");
      }
    } catch (err) {
      console.error(err);
      setCheckoutStep("failure");
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-fade-in text-stone-800">
        
        {/* Left Side: Dynamic Forms */}
        <div className="w-full md:w-[60%] p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-stone-700">Checkout Portal</h2>
            <button 
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors p-1.5 hover:bg-stone-100 rounded-full"
              disabled={checkoutStep === "processing"}
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* STEP 1: INFO FORM & PAYMENT CHOICE */}
          {checkoutStep === "info" && (
            <form onSubmit={handleProceed} className="flex-1 space-y-6">
              
              {/* Billing/Delivery Address */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  <FiMapPin /> Delivery & Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-stone-200'} pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A8F6A] transition`}
                      />
                      <FiUser className="absolute left-3.5 top-3.5 text-stone-400 text-sm" />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-stone-200'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A8F6A] transition`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Mobile Number (10 digits)</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        className={`w-full rounded-xl border ${errors.phone ? 'border-red-500' : 'border-stone-200'} pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A8F6A] transition`}
                      />
                      <FiPhone className="absolute left-3.5 top-3.5 text-stone-400 text-sm" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-stone-600 mb-1">ZIP / Postal Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="110001"
                      className={`w-full rounded-xl border ${errors.zip ? 'border-red-500' : 'border-stone-200'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A8F6A] transition`}
                    />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Shipping Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="Flat No, Building Name, Street Address, City"
                      className={`w-full rounded-xl border ${errors.address ? 'border-red-500' : 'border-stone-200'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A8F6A] transition resize-none`}
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Methods Options */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  <FiLock /> Select Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* COD Option */}
                  <label className={`rounded-xl p-4 border-2 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm ${paymentMethod === 'COD' ? 'border-[#7A8F6A] bg-[#7A8F6A]/5' : 'border-stone-200 hover:border-stone-300'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-stone-700 text-sm">Cash on Delivery (COD)</span>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod("COD")}
                        className="accent-[#7A8F6A] h-4 w-4"
                      />
                    </div>
                    <span className="text-xs text-stone-500 leading-normal">
                      Pay with cash upon delivery of your books. Adds ₹30 shipping charges.
                    </span>
                  </label>

                  {/* Online Payment Option */}
                  <label className={`rounded-xl p-4 border-2 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-sm ${paymentMethod === 'Online' ? 'border-[#7A8F6A] bg-[#7A8F6A]/5' : 'border-stone-200 hover:border-stone-300'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-stone-700 text-sm">Online Payment</span>
                      <input 
                        type="radio" 
                        name="payMethod" 
                        checked={paymentMethod === 'Online'}
                        onChange={() => setPaymentMethod("Online")}
                        className="accent-[#7A8F6A] h-4 w-4"
                      />
                    </div>
                    <span className="text-xs text-stone-500 leading-normal">
                      Pay instantly and securely online using UPI options. Free Shipping!
                    </span>
                  </label>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-3 rounded-xl border border-stone-300 font-semibold text-stone-600 hover:bg-stone-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#7A8F6A] hover:bg-[#5E7151] font-semibold text-white transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  {paymentMethod === "COD" ? "Confirm COD Order" : "Proceed to Payment"} <FiArrowRight />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: ONLINE MOCK PAYMENT GATEWAY */}
          {checkoutStep === "payment-gateway" && (
            <form onSubmit={handleOnlinePaymentSubmit} className="flex-1 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-5">
                {/* Mock Gateway Warning Banner */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-red-800 text-xs shadow-sm">
                  <FiAlertCircle className="text-xl flex-shrink-0 text-red-600" />
                  <div>
                    <h4 className="font-bold text-sm mb-0.5 text-red-900">Demonstration Simulator</h4>
                    This is a Mock Payment Gateway for demonstration purposes only. No real banking transaction will be processed and no real credentials will be sent.
                  </div>
                </div>

                <h3 className="text-base font-serif font-bold text-stone-700 border-b border-stone-100 pb-2">
                  Select UPI Application
                </h3>

                {/* UPI App Selection Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => {
                        setSelectedUpiApp(app);
                        setErrors(prev => ({ ...prev, upiId: "" }));
                      }}
                      className={`py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all text-center cursor-pointer ${selectedUpiApp === app ? 'border-[#7A8F6A] bg-[#7A8F6A]/5 text-[#7A8F6A]' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                    >
                      {app}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedUpiApp("custom")}
                    className={`col-span-2 sm:col-span-4 py-3 rounded-xl border-2 font-bold text-sm transition-all text-center cursor-pointer ${selectedUpiApp === 'custom' ? 'border-[#7A8F6A] bg-[#7A8F6A]/5 text-[#7A8F6A]' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
                  >
                    Enter UPI ID manually
                  </button>
                </div>

                {/* Custom UPI Text Field */}
                {selectedUpiApp === "custom" ? (
                  <div className="animate-fade-in space-y-1">
                    <label className="block text-xs font-semibold text-stone-600">Enter UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      placeholder="username@bank"
                      className={`w-full rounded-xl border ${errors.upiId ? 'border-red-500' : 'border-stone-200'} px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A8F6A] transition`}
                    />
                    {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                  </div>
                ) : (
                  <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-200/50 animate-fade-in text-sm text-stone-600">
                    Press <strong className="text-stone-800">Pay Now</strong> to simulate secure API request to the <strong className="text-stone-800">{selectedUpiApp}</strong> application on your mobile device.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("info")}
                  className="w-1/2 py-3 rounded-xl border border-stone-300 font-semibold text-stone-600 hover:bg-stone-50 transition cursor-pointer"
                >
                  Back to Details
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#7A8F6A] hover:bg-[#5E7151] font-semibold text-white transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <FiSend /> Pay Now ₹{finalAmount.toLocaleString('en-IN')}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PROCESSING */}
          {checkoutStep === "processing" && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6">
              <div className="w-16 h-16 border-4 border-[#7A8F6A]/30 border-t-[#7A8F6A] rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-semibold text-stone-700 mb-3">Processing Order</h3>
              <p className="text-stone-500 text-center text-sm max-w-sm font-sans animate-pulse">
                {processingStatus}
              </p>
              <div className="mt-8 flex items-center gap-1.5 text-xs text-stone-400">
                <FiShield /> 256-Bit Bank Grade Encryption Secure Checkout
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS SCREEN */}
          {checkoutStep === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl text-green-600 shadow-lg shadow-green-100/30 animate-bounce-short">
                <FiCheckCircle />
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-stone-700">Order Placed!</h3>
                <p className="text-stone-500 mt-2 text-sm max-w-sm mx-auto">
                  Thank you! Your order of Rs. {finalAmount.toLocaleString('en-IN')} has been approved and registered in the database.
                </p>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 w-full max-w-sm text-left text-xs font-mono space-y-1 text-stone-500">
                <div className="flex justify-between"><span className="font-semibold">Payment Mode:</span> <span>{paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Receipt No:</span> <span>SA-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Payment Status:</span> <span className={`${paymentMethod === "COD" ? "text-amber-600" : "text-green-600"} font-bold`}>{paymentMethod === "COD" ? "PENDING" : "PAID"}</span></div>
                <div className="flex justify-between"><span className="font-semibold">Delivery Fee:</span> <span>₹{shippingCharges}</span></div>
              </div>
              <p className="text-stone-400 text-xs animate-pulse">
                Redirecting you to order history in a moment...
              </p>
            </div>
          )}

          {/* STEP 5: FAILURE SCREEN */}
          {checkoutStep === "failure" && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 text-center space-y-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-4xl text-red-600 shadow-lg shadow-red-100/30 animate-bounce-short">
                <FiX />
              </div>
              <div>
                <h3 className="text-3xl font-serif font-bold text-stone-700">Order Failed</h3>
                <p className="text-stone-500 mt-2 text-sm max-w-sm mx-auto">
                  We encountered an error placing your order. Please check your network connection and try again.
                </p>
              </div>
              <button
                onClick={() => {
                  setCheckoutStep("info");
                }}
                className="w-full max-w-xs py-3 rounded-xl bg-stone-50 hover:bg-stone-100 font-semibold text-stone-700 border border-stone-300 transition cursor-pointer shadow-sm"
              >
                Back to Details
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-[40%] bg-stone-50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-stone-200 flex flex-col justify-between max-h-[40vh] md:max-h-full overflow-y-auto">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-700 mb-6 flex items-center gap-2">
              <FiShoppingBag /> Order Summary
            </h3>
            
            {/* Items List */}
            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div key={item._id || idx} className="flex gap-4 items-center justify-between pb-3 border-b border-stone-200/60 last:border-0">
                  <div className="flex gap-3 items-center">
                    <img src={item.url} alt={item.title} className="h-12 w-9 object-contain rounded border border-stone-200 bg-white" />
                    <div>
                      <h4 className="text-sm font-semibold text-stone-800 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-stone-400">by {item.author}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-stone-700">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals & Shipping Breakdown */}
          <div className="pt-6 mt-6 border-t border-stone-200 space-y-3">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Items Total ({cartItems.length})</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between text-sm text-stone-500">
              <span>Shipping Charges</span>
              <span className={shippingCharges === 0 ? "text-green-600 font-medium" : "text-stone-700"}>
                {shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}
              </span>
            </div>

            <div className="flex justify-between text-sm text-stone-500 border-b border-stone-150 pb-2">
              <span>Payment Mode Fee</span>
              <span>₹0.00</span>
            </div>

            {/* Payable Breakdown */}
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-stone-700">Final Amount Payable</span>
              <span className="font-bold text-[#5E7151] text-xl">₹{finalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const Cart = () => {
  const [Cart, setCart] = useState(null);
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "" });
  const [deletingId, setDeletingId] = useState("");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  const getHeaders = () => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(
          "/api/v1/get-user-cart",
          { headers: getHeaders() }
        );
        setCart((response.data.data || []).filter(Boolean));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      const tempTotal = Cart.reduce((sum, items) => sum + (items ? (Number(items.price) || 0) : 0), 0);
      setTotal(tempTotal);
    } else {
      setTotal(0);
    }
  }, [Cart]);

  const deleteItem = async (bookid) => {
    if (!bookid || deletingId) return;
    setDeletingId(bookid);
    try {
      const response = await api.put(
        `/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers: getHeaders() }
      );
      triggerToast(response.data.message);
      setCart((prev) => (prev ? prev.filter((it) => it._id !== bookid) : prev));
    } catch (error) {
      console.error("Error deleting from cart:", error);
      triggerToast("Failed to delete item from cart.");
    } finally {
      setDeletingId("");
    }
  };

  /* Checkout process payment success handler - registers order in DB & logs details in localStorage */
  const handleCheckoutSuccess = async (paymentMethod, shippingCharges) => {
    if (!Cart?.length || ordering) return false;
    setOrdering(true);
    try {
      // 1. Fetch current order history before placing order
      const beforeResponse = await api.get(
        "/api/v1/get-order-history",
        { headers: getHeaders() }
      );
      const oldOrders = beforeResponse.data.data || [];
      const oldOrderIds = new Set(oldOrders.map(o => o._id));

      // 2. Place the order in MongoDB database
      const response = await api.post(
        "/api/v1/place-order",
        { order: Cart.filter(Boolean) },
        { headers: getHeaders() }
      );
      
      if (response.data.status === "Success") {
        // 3. Fetch current order history after placing order
        const afterResponse = await api.get(
          "/api/v1/get-order-history",
          { headers: getHeaders() }
        );
        const newOrders = afterResponse.data.data || [];
        
        // 4. Diff to find newly created order IDs
        const newAddedOrders = newOrders.filter(o => !oldOrderIds.has(o._id));
        
        // 5. Store payment mode and final price in localStorage
        const storedDetails = JSON.parse(localStorage.getItem("orderPaymentDetails") || "{}");
        newAddedOrders.forEach(order => {
          storedDetails[order._id] = {
            paymentMethod: paymentMethod === "COD" ? "COD" : "Online Payment",
            finalAmount: (order.book?.price || 0) + (paymentMethod === "COD" ? 30 : 0),
            paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid"
          };
        });
        localStorage.setItem("orderPaymentDetails", JSON.stringify(storedDetails));

        setCart([]);
        setTimeout(() => {
          setIsCheckoutOpen(false);
          navigate("/profile/orderHistory");
        }, 3000);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error placing order:", error);
      return false;
    } finally {
      setOrdering(false);
    }
  };

  if (!Cart) {
    return <Loader />;
  }

  return (
    <div className="bg-amber-50 min-h-screen px-4 md:px-12 py-8 flex flex-col justify-start relative">
      {Cart.length === 0 && (
        <div className="h-[80vh] flex items-center justify-center flex-col text-stone-500">
          <h1 className="text-5xl lg:text-6xl font-semibold mb-0">Empty Cart</h1>
          <img
            src={emptycart}
            alt="empty cart"
            className="w-[300px] lg:w-[450px] h-50 my-4"
          />
        </div>
      )}

      {Cart.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-8 w-full mt-4">
          <div className="w-full lg:w-[70%]">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-stone-700 mb-8">Your Cart</h1>

            {/* Books List */}
            <div className="flex flex-col gap-4">
              {Cart.map((items, i) => (
                <div
                  className="w-full rounded-xl flex flex-col md:flex-row p-4 bg-white justify-between items-center gap-4 shadow-md border border-stone-200"
                  key={items._id || i}
                >
                  <img src={items.url} alt="/" className="h-[20vh] md:h-[10vh] object-contain rounded" />

                  <div className="w-full md:w-[60%] flex-1">
                    <h1 className="text-2xl text-stone-800 font-semibold text-start">{items.title || "Untitled Book"}</h1>
                    <p className="text-normal text-stone-500 mt-2 hidden lg:block">{(items.desc || "No description available.").slice(0, 100)}...</p>
                    <p className="text-normal text-stone-500 mt-2 hidden md:block lg:hidden">{(items.desc || "No description available.").slice(0, 65)}...</p>
                    <p className="text-normal text-stone-500 mt-2 block md:hidden">{(items.desc || "No description available.").slice(0, 100)}...</p>
                  </div>

                  <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-6">
                    <h2 className="text-stone-800 text-2xl md:text-3xl font-semibold font-sans">₹{items.price ?? "0"}</h2>
                    <button
                      className="bg-red-100 text-red-700 border border-red-750 hover:bg-red-200 rounded-xl p-3 cursor-pointer transition-colors duration-300 disabled:opacity-60"
                      onClick={() => deleteItem(items._id)}
                      disabled={deletingId === items._id}
                    >
                      <AiFillDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Summary Section */}
          <div className="w-full lg:w-[30%] mt-8 lg:mt-24">
            <div className="bg-white p-6 rounded-xl text-stone-800 shadow-lg border border-stone-200">
              <h1 className="text-3xl font-semibold text-stone-700">Total Summary</h1>
              <div className="w-full h-[1px] bg-stone-200 my-4"></div>
              <div className="flex justify-between items-center text-lg my-2">
                <span className="text-stone-500">Total Items:</span>
                <span className="font-semibold text-stone-700">{Cart.length} books</span>
              </div>
              <div className="flex justify-between items-center text-lg my-2 font-sans">
                <span className="text-stone-500">Total Amount:</span>
                <span className="font-semibold text-[#5E7151] text-2xl">
                  ₹{Total.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full mt-6 bg-[#7A8F6A] hover:bg-[#5E7151] text-white font-semibold py-3 px-4 rounded-xl transition duration-300 shadow-md text-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <FiLock className="text-base" /> Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Checkout Modal Popup Overlay */}
      {isCheckoutOpen && (
        <CheckoutModal
          totalAmount={Total}
          cartItems={Cart}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {toast.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] animate-fade-in">
          <div className="bg-zinc-800 text-white border border-[#7A8F6A] py-6 px-10 rounded-2xl shadow-2xl flex flex-col items-center gap-4 max-w-sm text-center animate-bounce-short">
            <div className="w-16 h-16 bg-[#7A8F6A] rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-[#7A8F6A]/20">
              Done
            </div>
            <p className="text-xl font-semibold tracking-wide">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
