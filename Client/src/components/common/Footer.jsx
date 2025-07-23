import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#000430] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">KaamWala</h2>
          <p className="text-sm text-gray-400">
            India’s trusted errand buddy to help you get tasks done quickly,
            safely and easily — anytime, anywhere.
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold mb-3">Quick Links</h6>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/post-task" className="hover:underline">
                Post a Task
              </Link>
            </li>
            <li>
              <Link to="/buddy-dashboard" className="hover:underline">
                Buddy Dashboard
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login/Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h6 className="text-lg font-semibold mb-3">Company</h6>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:underline">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h6 className="text-lg font-semibold mb-3">Subscribe</h6>
          <p className="text-sm text-gray-400 mb-4">
            Get updates about new services and offers.
          </p>
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 mb-2 sm:mb-0 sm:mr-2 rounded text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} KaamWala. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
