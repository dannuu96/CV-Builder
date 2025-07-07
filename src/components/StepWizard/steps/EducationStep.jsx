import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVStore } from '../../../store/cvStore';
import { FaGraduationCap, FaUniversity, FaCalendar, FaPlus, FaTrash } from 'react-icons/fa';

const EducationCard = ({ education, index, onUpdate, onRemove }) => {
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
          <FaGraduationCap className="mr-2 text-blue-500" size={16} />
          Education {index + 1}
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
            Degree
          </label>
          <div className="relative">
            <FaGraduationCap className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={education.degree || ''}
              onChange={(e) => handleChange('degree', e.target.value)}
              placeholder="e.g., Bachelor of Science in Computer Science"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution
          </label>
          <div className="relative">
            <FaUniversity className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={education.institution || ''}
              onChange={(e) => handleChange('institution', e.target.value)}
              placeholder="e.g., Stanford University"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Graduation Year
          </label>
          <div className="relative">
            <FaCalendar className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={education.graduationYear || ''}
              onChange={(e) => handleChange('graduationYear', e.target.value)}
              placeholder="e.g., 2024"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GPA (Optional)
          </label>
          <div className="relative">
            <FaGraduationCap className="absolute left-3 top-3 text-gray-400" size={16} />
            <input
              type="text"
              value={education.gpa || ''}
              onChange={(e) => handleChange('gpa', e.target.value)}
              placeholder="e.g., 3.8/4.0"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={education.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Relevant coursework, achievements, honors, etc..."
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </motion.div>
  );
};

const EducationStep = () => {
  const { formData, addEducation, updateEducation, removeEducation } = useCVStore();
  const { education } = formData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Education</h2>
          <p className="text-sm text-gray-600">Add your educational background, starting with the most recent</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FaPlus size={14} />
          <span>Add Education</span>
        </button>
      </div>

      <AnimatePresence>
        {education.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200"
          >
            <FaGraduationCap className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Education Added</h3>
            <p className="text-gray-600 mb-4">Click "Add Education" to get started</p>
            <button
              onClick={addEducation}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus size={14} />
              <span>Add Your First Education</span>
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <EducationCard
                key={index}
                education={edu}
                index={index}
                onUpdate={updateEducation}
                onRemove={removeEducation}
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
        className="bg-purple-50 border border-purple-200 rounded-lg p-4"
      >
        <h3 className="font-medium text-purple-900 mb-2">💡 Pro Tips:</h3>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• List education in reverse chronological order (most recent first)</li>
          <li>• Include relevant coursework, honors, and academic achievements</li>
          <li>• Only include GPA if it's 3.5 or higher</li>
          <li>• Include certifications, online courses, and bootcamps</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default EducationStep; 