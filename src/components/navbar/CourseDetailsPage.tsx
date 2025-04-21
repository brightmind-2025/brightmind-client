import { useGetCourseDetailsQuery } from "@/lib/features/courses/courseApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/utils/Headings";
import Header from "../header";
import Footer from "./Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  // const [route, setRoute] = useState("Login");
  // const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
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
          <CourseDetails data={data.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
