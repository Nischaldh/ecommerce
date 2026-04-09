import AddressForm from "@/components/Checkout/AddressForm";
import PaymentMethodSelector from "@/components/Checkout/PaymentMethodSelector";
import SavedAddresses from "@/components/Checkout/SavedAddress";
import SellerGroup from "@/components/Checkout/SellerGroup";
import { useCheckout } from "@/hooks/checkout/useCheckout";
import { MapPin, Plus, ShoppingBag } from "lucide-react";

const Checkout = () => {
  const {
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    useNewAddress,
    setUseNewAddress,
    saveAddress,
    setSaveAddress,
    register,
    errors,
    itemsBySeller,
    itemsToCheckout,
    orderTotal,
    placingOrder,
    handlePlaceOrder,
    paymentMethod,
    setPaymentMethod
  } = useCheckout();

  return (
    <div className="py-6 flex flex-col lg:flex-row gap-6 items-start">
      {/* ── Left — Delivery Address ── */}
      <div className="flex flex-col gap-5 flex-1 min-w-0 w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review your order and add delivery details
          </p>
        </div>

        {/* Delivery address card */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 text-orange-500" />
            <h2 className="font-bold text-gray-900">Delivery Address</h2>
          </div>

          {/* Saved addresses */}
          {addresses.length > 0 && !useNewAddress && (
            <>
              <SavedAddresses
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelect={(id) => {
                  setSelectedAddressId(id);
                  setUseNewAddress(false);
                }}
              />

              {/* Add new address toggle */}
              <button
                onClick={() => setUseNewAddress(true)}
                className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 transition-colors"
              >
                <Plus className="size-4" />
                Use a different address
              </button>
            </>
          )}

          {/* New address form */}
          {(useNewAddress || addresses.length === 0) && (
            <>
              {addresses.length > 0 && (
                <button
                  onClick={() => setUseNewAddress(false)}
                  className="text-sm text-gray-500 hover:text-orange-500 transition-colors text-left"
                >
                  ← Back to saved addresses
                </button>
              )}
              <AddressForm
                register={register}
                errors={errors}
                saveAddress={saveAddress}
                setSaveAddress={setSaveAddress}
                showSaveOption={true}
              />
            </>
          )}
        </div>
        {/* Payment method */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>
      </div>

      {/* ── Right — Order Summary ── */}
      <div className="w-full lg:w-96 shrink-0 flex flex-col gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Order Summary</h2>
            <span className="text-sm text-gray-500">
              {itemsToCheckout.length}{" "}
              {itemsToCheckout.length === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Items grouped by seller */}
          <div className="flex flex-col gap-3">
            {itemsBySeller.map((group) => (
              <SellerGroup key={group.sellerId} group={group} />
            ))}
          </div>

          {/* Multiple sellers notice */}
          {itemsBySeller.length > 1 && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
              <p className="text-xs text-blue-600">
                Your cart has items from {itemsBySeller.length} sellers. Each
                seller's items will be fulfilled separately.
              </p>
            </div>
          )}

          <hr className="border-gray-100" />

          {/* Totals */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs. {orderTotal.toLocaleString("en-NP")}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span className="text-orange-500">
                Rs. {orderTotal.toLocaleString("en-NP")}
              </span>
            </div>
          </div>

          {/* Place order button */}
          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder || itemsToCheckout.length === 0}
            className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="size-5" />
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            By placing your order you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
