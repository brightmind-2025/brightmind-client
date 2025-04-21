"use client"
import HomePage from "../../../components/navbar/HomePage";
import React from "react";
import Courses from "../../../components/navbar/Courses";
import Reviews from "../../../components/navbar/Reviews";
import FAQ from "@/components/navbar/FaqPages";
import Footer from "../../../components/navbar/Footer";
function page() {
  return (
    <div>
      <HomePage />
      <Courses/>
      <Reviews />
      <FAQ/>
      <Footer/>
    </div>
  );
}

export default page;
