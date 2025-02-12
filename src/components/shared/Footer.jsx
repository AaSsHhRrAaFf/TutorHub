import React from "react";
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeProvider';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-600'}`}>
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">TutorHub</h3>
            <p className="mb-4">Connecting language learners with expert tutors worldwide. Start your language journey today!</p>
            <div className="flex space-x-4">
              <FaFacebook className="text-xl hover:text-blue-500 cursor-pointer" />
              <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
              <FaLinkedin className="text-xl hover:text-blue-700 cursor-pointer" />
              <FaYoutube className="text-xl hover:text-red-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/find-tutors" className="hover:text-blue-500">Find Tutors</Link>
              </li>
              <li>
                <Link to="/add-tutorials" className="hover:text-blue-500">Become a Tutor</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-500">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-blue-500">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Popular Languages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Languages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/find-tutors/english" className="hover:text-blue-500">English</Link>
              </li>
              <li>
                <Link to="/find-tutors/spanish" className="hover:text-blue-500">Spanish</Link>
              </li>
              <li>
                <Link to="/find-tutors/french" className="hover:text-blue-500">French</Link>
              </li>
              <li>
                <Link to="/find-tutors/chinese" className="hover:text-blue-500">Chinese</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: info@tutorhub.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Learning Street,</li>
              <li>Education City, EC 12345</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} TutorHub. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/" className="hover:text-blue-500">Privacy Policy</Link>
              <Link to="/" className="hover:text-blue-500">Terms of Service</Link>
              <Link to="/" className="hover:text-blue-500">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
