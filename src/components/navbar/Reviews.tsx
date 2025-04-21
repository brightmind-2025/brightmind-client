import Image from "next/image";
import React from "react";
import { styles } from "../style/style";
import ReviewCard from "../../shared/ReviewCard";

type Props = {};
export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge University",
    comment:
      "The platform really helped me understand complex topics in a simple way. Highly recommend it!",
      ratings: 4.5,
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full Stack Developer | Quarter Ltd.",
    comment:
      "Great content and excellent instructors. I learned a lot in a short amount of time. Recommend it!",
      ratings: 3.7,
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "Computer Systems Engineering Student | Zimbabwe",
    comment:
      "This course gave me the confidence to start building real-world applications.",
      ratings: 5,
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Easy to follow, well-structured, and packed with useful projects.",
      ratings: 3,
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full Stack Web Developer | Algeria",
    comment:
      "I've taken many online courses, but this one stands out in quality and clarity.",
      ratings: 4.8,
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full Stack Web Developer | Canada",
    comment:
      "Absolutely loved the hands-on approach. The course made me job-ready.",
      ratings: 5,
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../assets/business-img.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Our Strength
            </span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            We’re proud to support a vibrant community of learners who are
            passionate about developing their skills. Our courses are designed
            to empower students with real-world knowledge and confidence. From
            beginners to advanced professionals, we’ve helped many take the next
            big step in their careers. Here’s what some of them have to say
            about their learning journey with us.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {reviews?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:gap-10">
            {reviews.map((item, index) => (
              <ReviewCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              No reviews available yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
