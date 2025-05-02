import { useLoadUserQuery } from "@/lib/features/apiSlice";
import { useCreateOrderMutation } from "@/lib/features/order/orderApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { styles } from "../style/style";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socket: Socket = io(ENDPOINT, {
  transports: ["websocket"],
});

type Props = {
  setOpen: any;
  data: any;
  user:any;
};

const CheckOutForm = ({ setOpen, data,user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const { data: userData } = useLoadUserQuery({
    skip: loadUser ? false : true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message || "");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");

      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });

    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      socket.emit("notification", {
        title: "New Order",
        message: `You have successfully purchased the course ${data?.course?.name}`,
        userId:user?._id,
      })
      redirect(`/course-access/${data._id}`);
    }

    if (error) {
      if ("data" in error) {
        const err = error as any;
        toast.error(err.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-500 font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
