import Image from "next/image";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import homeIcon from "../../assets/homeIcon.png";
import Header from "../header";
import React, { FC, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGetHeroDataQuery } from "@/lib/features/layout/layoutApi";
import { useRouter } from "next/navigation";

interface Props {}

const HomePage: FC<Props> = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${encodeURIComponent(search)}`);
    }
  };

  const { data } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const avatars = [
    "https://randomuser.me/api/portraits/women/68.jpg",
    "https://randomuser.me/api/portraits/men/12.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
  ];

  const floatingShapes = [
    { color: "bg-purple-500", size: "w-24 h-24", position: "top-24 left-12" },
    { color: "bg-teal-400", size: "w-16 h-16", position: "top-48 right-20" },
    { color: "bg-pink-400", size: "w-20 h-20", position: "bottom-32 left-32" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background elements */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.position} ${shape.color} ${shape.size} rounded-full blur-xl opacity-20 dark:opacity-10`}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content Section */}
          <motion.div
            className="md:w-1/2 text-center md:text-left order-2 md:order-1 relative z-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-medium text-sm mb-6 shadow-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              Start Learning Today
            </motion.span>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {data?.layout?.banner?.title || "Unlock Your Learning Potential"}
              <span className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ↗
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {data?.layout?.banner?.subTitle ||
                "Join our platform and get access to thousands of courses taught by industry experts."}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="relative flex-grow max-w-md"
                whileHover={{ scale: 1.02 }}
              >
                <input
                  type="text"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-3 px-5 pr-12 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-gray-700 transition-all duration-300"
                />
                <motion.button
                  className="absolute right-1 top-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                >
                  <FaSearch size={20} />
                </motion.button>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Browse Courses <FaArrowRight size={16} />
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <motion.div
                    key={i}
                    className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
                  >
                    <Image
                      src={src}
                      alt={`Avatar ${i + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </motion.div>
                ))}
              </div>
              <motion.p
                className="ml-4 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  300k+
                </span>{" "}
                students already trust us.{" "}
                <a
                  href="#courses"
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  View Courses
                </a>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="md:w-1/2 flex justify-center order-1 md:order-2 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="relative">
              {/* Glow effect */}
              <motion.div className="absolute -inset-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" />

              {/* Main image container */}
              <motion.div
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl hover:shadow-3xl transition-all duration-500"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={data?.layout?.banner?.image[0]?.url || homeIcon}
                  width={500}
                  height={500}
                  alt="Learning Illustration"
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -bottom-4 -left-8 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                    👨‍🎓
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Live courses
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      1000+
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white shadow-md">
                    🏆
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Certified
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      Courses
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* Scrolling animated elements */}
        <motion.div
          className="absolute -bottom-32 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 dark:opacity-10"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};

export default HomePage;
