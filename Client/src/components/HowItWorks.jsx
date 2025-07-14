import React from "react";

const HowItWorks = () => {
  return (
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
              Verified buddies nearby will offer to help — you choose the best.
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
  );
};

export default HowItWorks;
