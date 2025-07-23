import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BuddyCard from "../../components/buddy/BuddyCard";
import HeroSection from "../../components/common/HeroSection";
import HowItWorks from "../../components/common/HowItWorks";
import TestimonialCarousel from "../../components/common/Testimonial";
import FindNearbyBuddy from "../../components/user/FindNearbyBuddy";
import HeroCanvas from "../../components/common/HeroCanvas";

import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [buddies, setBuddies] = useState([]);
  const { backendUrl } = useContext(AuthContext);

  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/buddy/all`);
        if (data.success) {
          setBuddies(data.buddies);
        } else {
          console.error("Failed to load buddies");
        }
      } catch (error) {
        console.error("Error fetching buddies:", error.message);
      }
    };

    fetchBuddies();
  }, [backendUrl]);

  return (
    <main className="bg-white text-gray-800 relative overflow-hidden">
      {/* ✅ 3D Hero Background */}
      <div className="relative  mt-4 rounded-lg shadow-2xl bg-black h-screen w-full">
        <HeroCanvas className="" />
        <div className="relative z-10 h-full flex flex-col items-center text-white justify-center  text-center px-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Get Your Tasks Done Easily
          </h1>
          <p className="text-xl mb-6 drop-shadow-md">
            Hire a Buddy for Anything, Anytime!
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-gray-200 transition"
          >
            Join as a Buddy
          </Link>
        </div>
      </div>

      {/* ✅ How It Works */}
      <section className="relative z-10">
        <HowItWorks />
      </section>

      {/* ✅ Find Nearby Buddy */}
      <section className="relative z-10">
        <FindNearbyBuddy />
      </section>

      {/* ✅ Testimonials */}
      <section className="relative z-10">
        <TestimonialCarousel />
      </section>

      {/* ✅ Buddy Cards Section */}
      <section className="py-16 bg-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-10 text-blue-700">
            Top Buddies Near You
          </h2>

          {buddies.length === 0 ? (
            <p className="text-gray-500">Loading buddies...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {buddies.map((buddy) => (
                <BuddyCard key={buddy._id} buddy={buddy} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4">
          Ready to get your tasks done?
        </h2>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Join as a Buddy
        </Link>
      </section>
    </main>
  );
};

export default Home;
