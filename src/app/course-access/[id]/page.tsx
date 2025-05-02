"use client";

import Loader from "@/components/Loader/Loader";
import { useLoadUserQuery } from "@/lib/features/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect, use } from "react";
import CourseContent from "../../../components/navbar/CourseContent";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = ({ params }: Props) => {
  // Unwrap the params object using React.use()
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/home");
      }
    }

    if (error) {
      redirect("/home");
    }
  }, [data, error, id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <CourseContent id={id} user={data.user}/>
    </div>
  );
};

export default Page;
