import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import BuddyCard from "../components/BuddyCard";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import TestimonialCarousel from "../components/Testimonial";
import FindNearbyBuddy from "../components/FindNearbyBuddy";

import { AuthContext } from "../context/AuthContext";

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
    <main className="bg-white text-gray-800">
      {/* ✅ Hero Section */}
      <HeroSection />

      {/* ✅ How It Works */}
      <HowItWorks />

      {/* ✅ Find Nearby Buddy */}
      <FindNearbyBuddy />

      {/* ✅ Testimonials */}
      <TestimonialCarousel />

      {/* ✅ Buddy Cards Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Top Buddies Near You</h2>

          {buddies.length === 0 ? (
            <p>Loading buddies...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {buddies.map((buddy) => (
                <BuddyCard key={buddy._id} buddy={buddy} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
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
