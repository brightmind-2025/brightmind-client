"use client";
import React, { FC } from "react";
import Protected from "@/components/hooks/useProtected";
import Profile from "../../components/profile/Profile";
import Heading from "@/utils/Headings";
import { useSelector } from "react-redux";

type Props = {};

const page: FC<Props> = (props) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name}`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Prograaming,MERN, Redux, Machine Learning"
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};
export default page;
