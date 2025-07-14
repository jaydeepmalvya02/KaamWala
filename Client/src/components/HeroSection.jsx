import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-[#000430] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Helpers, Faster.
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Post your task and connect with trusted buddies near you.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/post-task"
            className="inline-block bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Post a Task
          </Link>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            Join as a Buddy
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
