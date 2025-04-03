import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import homeIcon from "../../assets/homeIcon.jpeg";
export default function HomePage() {
  return (
    <div className="h-screen flex flex-col md:flex-row items-center  justify-center max-w-6xl mx-auto p-6 pt-10">
      <div className="md:w-1/2 flex justify-center">
        <div className="w-80 h-80 md:w-96 md:h-96 bg-gray-200 rounded-full overflow-hidden border-4 border-blue-300">
          <Image
            src={homeIcon}
            width={500}
            height={500}
            alt="Learning Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <h1 className="text-3xl md:text-4xl text-[#3a3939] font-bold leading-tight dark:text-white">
          Improve Your Online <br /> Learning Experience <br /> Better Instantly
        </h1>
        <p className="text-gray-500  mt-4">
          We have 20k+ Online courses & 500k+ Online registered students.
          <br />
          Find your desired Courses from them.
        </p>

        <div className="mt-6 flex items-center justify-center md:justify-start bg-gray-100  rounded-full px-4 py-2 max-w-md shadow-md">
          <input
            type="text"
            placeholder="Search Courses..."
            className="bg-transparent flex-1 outline-none px-2 text-gray-700"
          />
          <button className="bg-blue-600 text-white p-2 rounded-full">
            <FaSearch size={20} />
          </button>
        </div>

        <p className="text-[#cac1c1] mt-4 flex items-center justify-center md:justify-start">
          <span className="mr-2">👨‍🎓👩‍🎓</span> 300k+ People already trusted us.{" "}
          <a href="#" className="text-green-600 font-semibold">
            View Courses
          </a>
        </p>
      </div>
    </div>
  );
}
