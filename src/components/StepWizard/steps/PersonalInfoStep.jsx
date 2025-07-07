import React from 'react';
import { motion } from 'framer-motion';
import { useCVStore } from '../../../store/cvStore';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const InputField = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  error,
  isTextarea = false,
  rows = 3 
}) => {
  const inputClasses = `w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
    error 
      ? 'border-red-300 bg-red-50' 
      : 'border-gray-200 hover:border-gray-300 focus:bg-white'
  }`;

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 text-gray-400" size={16} />
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={inputClasses}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={inputClasses}
          />
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

const PersonalInfoStep = () => {
  const { formData, updatePersonalInfo, errors } = useCVStore();
  const { personalInfo } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo(name, value);
  };

  const fields = [
    {
      name: 'fullName',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      icon: FaUser,
      type: 'text',
    },
    {
      name: 'jobTitle',
      label: 'Job Title',
      placeholder: 'e.g., Software Engineer, Designer',
      icon: FaUser,
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email Address',
      placeholder: 'your.email@example.com',
      icon: FaEnvelope,
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      icon: FaPhone,
      type: 'tel',
    },
    {
      name: 'address',
      label: 'Address',
      placeholder: 'City, State, Country',
      icon: FaMapMarkerAlt,
      type: 'text',
    },
    {
      name: 'linkedin',
      label: 'LinkedIn Profile',
      placeholder: 'https://linkedin.com/in/yourprofile',
      icon: FaLinkedin,
      type: 'url',
    },
    {
      name: 'github',
      label: 'GitHub Profile',
      placeholder: 'https://github.com/yourusername',
      icon: FaGithub,
      type: 'url',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={personalInfo[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            icon={field.icon}
            error={errors[field.name]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Professional Description"
          name="description"
          value={personalInfo.description || ''}
          onChange={handleChange}
          placeholder="Write a brief professional description about yourself..."
          icon={FaUser}
          error={errors.description}
          isTextarea
          rows={4}
        />
        <InputField
          label="About Me"
          name="aboutMe"
          value={personalInfo.aboutMe || ''}
          onChange={handleChange}
          placeholder="Tell us more about yourself, your interests, and goals..."
          icon={FaUser}
          error={errors.aboutMe}
          isTextarea
          rows={4}
        />
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <h3 className="font-medium text-blue-900 mb-2">💡 Pro Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a professional email address</li>
          <li>• Include your current location (city, state/country)</li>
          <li>• Make your professional description concise and impactful</li>
          <li>• Add your LinkedIn and GitHub profiles if relevant</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default PersonalInfoStep; 