import React from "react";

const BuddyCard = ({ buddy, onHire }) => {
  const {
    userId,
    skills = [],
    serviceArea = "Not specified",
    averageRating = "N/A",
    totalReviews = 0,
  } = buddy || {};

  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition p-5">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={userId?.profileUrl || "/default-avatar.png"}
          alt={userId?.name || "Buddy"}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{userId?.name || "Unknown"}</h3>
          <p className="text-sm text-gray-500">
            {skills.length > 0 ? skills.join(", ") : "No skills listed"}
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p>
          📍 <span className="font-medium">{serviceArea}</span>
        </p>
        <p>
          ⭐ {averageRating} | {totalReviews} tasks completed
        </p>
      </div>

      <button
        onClick={() => onHire && onHire(buddy)}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Hire Buddy
      </button>
    </div>
  );
};

export default BuddyCard;
