"use client";
import LandingPage from "@/components/landingPage/LandingPage";
import React, { FC, useState } from "react";
import Heading from "@/utils/Headings";
import Header from "@/components/header";
interface Props {}
const Page: FC<Props> = (props) => {
 
  return (
    <div>
      <LandingPage />
      <Heading
        title="BrightMind"
        description="BrightMind is a platform that helps you to learn new things"
        keywords="Programming, Learning, Courses"
      />
      
    </div>
  );
};

export default Page;
