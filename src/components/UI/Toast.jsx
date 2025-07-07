import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const CustomToast = ({ t, title, message, type = 'success' }) => {
  const icons = {
    success: <FaCheck className="text-green-500" size={20} />,
    error: <FaTimes className="text-red-500" size={20} />,
    warning: <FaExclamationTriangle className="text-yellow-500" size={20} />,
    info: <FaInfoCircle className="text-blue-500" size={20} />,
  };

  const colors = {
    success: 'border-green-200 bg-green-50',
    error: 'border-red-200 bg-red-50',
    warning: 'border-yellow-200 bg-yellow-50',
    info: 'border-blue-200 bg-blue-50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto border-2 ${colors[type]}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {message && (
              <p className="mt-1 text-sm text-gray-600">{message}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">Close</span>
              <FaTimes size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const showToast = {
  success: (title, message) => 
    toast.custom((t) => (
      <CustomToast t={t} title={title} message={message} type="success" />
    )),
  error: (title, message) => 
    toast.custom((t) => (
      <CustomToast t={t} title={title} message={message} type="error" />
    )),
  warning: (title, message) => 
    toast.custom((t) => (
      <CustomToast t={t} title={title} message={message} type="warning" />
    )),
  info: (title, message) => 
    toast.custom((t) => (
      <CustomToast t={t} title={title} message={message} type="info" />
    )),
};

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'transparent',
          padding: 0,
          boxShadow: 'none',
        },
      }}
    />
  );
};

export default ToastProvider; 