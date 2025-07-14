import React from "react";

const testimonials = [
  {
    name: "Ankit Verma",
    quote: "KaamWala helped me find reliable help in minutes!",
  },
  {
    name: "Sneha Reddy",
    quote: "Trusted buddies, quick work, stress-free errands. Love it!",
  },
  {
    name: "Ravi Kumar",
    quote: "Safe and easy platform to get daily tasks done.",
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded shadow hover:shadow-md transition"
            >
              <p className="text-gray-600 italic mb-4">"{t.quote}"</p>
              <h4 className="font-semibold text-gray-800">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
