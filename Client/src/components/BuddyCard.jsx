import React from "react";

const BuddyCard = ({ buddy }) => {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition p-5">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={buddy.userId.profileUrl}
          alt={buddy.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{buddy.userId.name}</h3>
          <p className="text-sm text-gray-500">{buddy.skills[1]}</p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p>
          📍 <span className="font-medium">{buddy.serviceArea}</span>
        </p>
        <p>
          ⭐ {buddy.averageRating} | {buddy.totalReviews} tasks completed
        </p>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Hire Buddy
      </button>
    </div>
  );
};

export default BuddyCard;
