import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVStore } from '../../../store/cvStore';
import { FaBriefcase, FaBuilding, FaClock, FaPlus, FaTrash } from 'react-icons/fa';

const ExperienceCard = ({ experience, index, onUpdate, onRemove }) => {
  const handleChange = (field, value) => {
    onUpdate(index, field, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <FaBriefcase className="mr-2 text-blue-500" size={16} />
          Experience {index + 1}
        </h3>
        <button
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
        >
          <FaTrash size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <div className="relative">
            <FaBriefcase className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={experience.jobTitle || ''}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="e.g., Software Engineer"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={experience.company || ''}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g., Google Inc."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration
          </label>
          <div className="relative">
            <FaClock className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={experience.duration || ''}
              onChange={(e) => handleChange('duration', e.target.value)}
              placeholder="e.g., Jan 2020 - Present"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={experience.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g., San Francisco, CA"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={experience.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your key responsibilities and achievements..."
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </motion.div>
  );
};

const ExperienceStep = () => {
  const { formData, addExperience, updateExperience, removeExperience } = useCVStore();
  const { experience } = formData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Work Experience</h2>
          <p className="text-sm text-gray-600">Add your work experience, starting with the most recent</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FaPlus size={14} />
          <span>Add Experience</span>
        </button>
      </div>

      <AnimatePresence>
        {experience.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
          >
            <FaBriefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Experience Added</h3>
            <p className="text-gray-600 mb-4">Click "Add Experience" to get started</p>
            <button
              onClick={addExperience}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus size={14} />
              <span>Add Your First Experience</span>
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                onUpdate={updateExperience}
                onRemove={removeExperience}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <h3 className="font-medium text-green-900 mb-2">💡 Pro Tips:</h3>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• List experiences in reverse chronological order (most recent first)</li>
          <li>• Use action verbs and quantify achievements when possible</li>
          <li>• Include internships, freelance work, and relevant volunteer experience</li>
          <li>• Focus on accomplishments rather than just job duties</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ExperienceStep; 