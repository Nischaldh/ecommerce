import OrderDeliveryInfo from "@/components/Orders/OrderDeliveryInfo";
import OrderDetailHeader from "@/components/Orders/OrderDetailHeader";
import OrderDetailItems from "@/components/Orders/OrderDetailItems";
import OrderDetailSkeleton from "@/components/Orders/OrderDetailSkeleton";
import OrderDetailSummary from "@/components/Orders/OrderDetailSummary";
import { useOrderDetail } from "@/hooks/orders/useOrderDetail";

const OrderDetail = () => {
  const {
    order,
    loading,
    itemsBySeller,
    canCancel,
    canEditAddress,
    cancelling,
    handleCancel,
    editingAddress,
    savingAddress,
    handleStartEditAddress,
    handleSaveAddress,
    handleCancelEditAddress,
    register,
    errors,
  } = useOrderDetail();

  if (loading) return <OrderDetailSkeleton />;
  if (!order) return null;

  return (
    <div className="py-6 flex flex-col gap-6">

      <OrderDetailHeader order={order} />

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Left — items */}
        <div className="flex-1 min-w-0 w-full">
          <OrderDetailItems itemsBySeller={itemsBySeller} />
        </div>

        {/* Right — address + summary */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
          <OrderDeliveryInfo
            order={order}
            canEditAddress={canEditAddress}
            editingAddress={editingAddress}
            savingAddress={savingAddress}
            onStartEdit={handleStartEditAddress}
            onSave={handleSaveAddress}
            onCancelEdit={handleCancelEditAddress}
            register={register}
            errors={errors}
          />
          <OrderDetailSummary
            order={order}
            canCancel={canCancel}
            cancelling={cancelling}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;