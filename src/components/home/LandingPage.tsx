import Image from "next/image";
import hero from "../../assets/landing-page-hero.svg";

export default function LandingPage() {
  return (
    <div className=" h-screen max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between mx-auto p-6 pt-0">

      <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to <span className="text-yellow-500">BrightMind</span>
        </h2>
        <p className="text-2xl md:text-3xl font-bold text-blue-900 leading-snug mb-6">
          Develop your skills <br className="hidden md:block" /> in a new and unique way
        </p>
        <p className="text-lg md:text-xl text-white mb-8">
          Explore a transformative approach to skill development on our online
          learning platform. Unlock new realms of possibilities with our
          expertly crafted courses.
        </p>
        <button className="bg-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-cyan-500 transition-all duration-300">
          Get Started
        </button>
      </div>


      <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
        <Image
          src={hero}
          alt="An image of a person studying"
          width={500}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
