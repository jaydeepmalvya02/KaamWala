import React from "react";
import { Link } from "react-router-dom";
import BuddyCard from "../components/BuddyCard"; // path dhyan se adjust karo

const Home = () => {
  const buddies = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Delivery Buddy",
      rating: 4.8,
      tasksCompleted: 120,
      location: "Mumbai",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "Grocery Buddy",
      rating: 4.9,
      tasksCompleted: 95,
      location: "Delhi",
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Pickup Buddy",
      rating: 4.7,
      tasksCompleted: 80,
      location: "Bangalore",
      profilePic: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  ];

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-[#000430] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Personal Errand Buddy
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Get your daily tasks done safely, easily & quickly with trusted
            buddies around you.
          </p>
          <Link
            to="/post-task"
            className="inline-block bg-blue-600 px-6 py-3 rounded hover:bg-blue-700 transition"
          >
            Post a Task
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">1️⃣ Post Your Task</h3>
              <p className="text-gray-600">
                Describe what you need done, where, and when.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">2️⃣ Get a Buddy</h3>
              <p className="text-gray-600">
                Verified buddies nearby will offer to help — you choose the
                best.
              </p>
            </div>
            <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">3️⃣ Done & Reviewed</h3>
              <p className="text-gray-600">
                Get your task done, make payment securely & leave a review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Buddy Card Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">Top Buddies Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buddies.map((buddy) => (
              <BuddyCard key={buddy.id} buddy={buddy} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
