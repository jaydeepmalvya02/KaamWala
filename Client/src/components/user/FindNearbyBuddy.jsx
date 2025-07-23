import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link } from "react-router-dom";

// Fix default icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const buddies = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Delivery Buddy",
    lat: 22.132473833557093,
    lng: 76.99997687332078,
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Grocery Buddy",
    lat: 28.6149,
    lng: 77.208,
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Pickup Buddy",
    lat: 28.6159,
    lng: 77.207,
  },
];

const FindNearbyBuddy = () => {
  const center = [28.6139, 77.209];

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Find Nearby Buddy</h2>

      <div className="w-full max-w-5xl mx-auto" style={{ height: "500px" }}>
        <MapContainer
          center={center}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {buddies.map((buddy) => (
            <Marker key={buddy.id} position={[buddy.lat, buddy.lng]}>
              <Popup>
                <strong>{buddy.name}</strong>
                <br />
                {buddy.role}
                <br />
                <Link to="/post-task" className="text-blue-600 underline">
                  Book Buddy
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <Link
        to="/post-task"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Book a Buddy Now
      </Link>
    </section>
  );
};

export default FindNearbyBuddy;
