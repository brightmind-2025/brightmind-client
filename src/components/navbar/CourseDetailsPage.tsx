import { useGetCourseDetailsQuery } from "@/lib/features/courses/courseApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/utils/Headings";
import Header from "../header";
import Footer from "./Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/lib/features/order/orderApi";
import { loadStripe } from "@stripe/stripe-js";
type Props = {
  id?: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  // const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

// after
useEffect(() => {
  const key = config?.publishableKey;
  if (key && data) {
    setStripePromise(loadStripe(key));
    const amount = Math.round(data.course.price * 100);
    createPaymentIntent(amount).then((res: any) => {
      setClientSecret(res.data.client_secret);
    });
  }
}, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + " - BrightMind"}
            description={
              "Join thousands of learners on BrightMind — your go-to platform for mastering new skills, guided by expert instructors and a passionate coding community."
            }
            keywords={data?.course?.tags}
          />
          <Header />
          {stripePromise && (
            <CourseDetails
              data={data?.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}

          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
