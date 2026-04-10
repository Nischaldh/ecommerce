/* eslint-disable react-hooks/incompatible-library */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getMyPaymentInfoService,
  upsertPaymentInfoService,
} from "../../services/payment.service";
import toast from "react-hot-toast";
import { paymentSchema } from "@/validations/validations";



export const usePaymentInfo = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      payoutPreference: "KHALTI",
      khaltiId: "",
      khaltiName: "",
    },
  });

  const payoutPreference = watch("payoutPreference");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getMyPaymentInfoService();
      if (res.success && res.paymentInfo) {
        setPaymentInfo(res.paymentInfo);
        reset({
          payoutPreference: res.paymentInfo.payoutPreference || "KHALTI",
          khaltiId: res.paymentInfo.khaltiId || "",
          khaltiName: res.paymentInfo.khaltiName || "",
        });
      }
      setLoading(false);
    };
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data) => {
    const res = await upsertPaymentInfoService({
      payoutPreference: data.payoutPreference,
      khaltiId: data.khaltiId || null,
      khaltiName: data.khaltiName || null,
    });
    if (res.success) {
      setPaymentInfo(res.paymentInfo);
      toast.success("Payment info saved successfully!");
      // reset isVerified display
    } else {
      toast.error(res.message || "Failed to save payment info");
    }
  };

  return {
    paymentInfo,
    loading,
    payoutPreference,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};

