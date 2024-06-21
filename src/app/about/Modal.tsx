// Modal.js
import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Modal = ({ isVisible, onClose }) => {
  const [hoveredIcon, setHoveredIcon] = useState('');

  if (!isVisible) return null;

  const icons = [
    { name: 'GitHub', icon: <FaGithub size={150} />, link: 'https://github.com/yourusername' },
    { name: 'LinkedIn', icon: <FaLinkedin size={150} />, link: 'https://linkedin.com/in/yourprofile' },
    { name: 'Email', icon: <FaEnvelope size={150} />, link: 'mailto:your.email@example.com' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black p-8 rounded shadow-lg w-3/4 h-3/4 relative">
        <div className="grid grid-cols-3 gap-8 text-center">
          {icons.map((item, index) => (
            <div
              key={index}
              className="group"
              onMouseEnter={() => setHoveredIcon(item.link)}
              onMouseLeave={() => setHoveredIcon('')}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="text-xl">{item.name}</div>
            </div>
          ))}
        </div>
        {hoveredIcon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <span className="text-white text-lg">{hoveredIcon}</span>
          </div>
        )}
        <button
          className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
