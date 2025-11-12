import React from 'react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative'>
        <h2 className='text-2xl font-bold mb-4'>{title}</h2>
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;