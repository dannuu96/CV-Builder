import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  icon: Icon,
  suffix,
  prefix,
  rows = 3,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const isTextarea = type === 'textarea';
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const baseClasses = `
    w-full px-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none
    ${Icon ? 'pl-10' : ''}
    ${suffix || isPassword ? 'pr-10' : ''}
    ${error 
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500' 
      : focused 
        ? 'border-blue-500 bg-white focus:ring-blue-500' 
        : 'border-gray-200 bg-white hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    }
    ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
    ${className}
  `.trim();

  const inputProps = {
    name,
    value,
    onChange,
    placeholder,
    disabled,
    required,
    className: baseClasses,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...props
  };

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {prefix}
          </div>
        )}
        
        {Icon && (
          <Icon 
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              error ? 'text-red-400' : focused ? 'text-blue-500' : 'text-gray-400'
            }`} 
            size={16} 
          />
        )}
        
        {isTextarea ? (
          <textarea
            {...inputProps}
            rows={rows}
            type={undefined}
          />
        ) : (
          <input
            {...inputProps}
            type={inputType}
          />
        )}
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        )}
        
        {suffix && !isPassword && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {suffix}
          </div>
        )}
        
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400">
            <FaExclamationCircle size={16} />
          </div>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 flex items-center space-x-1"
        >
          <FaExclamationCircle size={14} />
          <span>{error}</span>
        </motion.p>
      )}
    </motion.div>
  );
};

export default Input; 