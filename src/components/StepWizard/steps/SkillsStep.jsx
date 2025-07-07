import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVStore } from '../../../store/cvStore';
import { FaCogs, FaLanguage, FaProjectDiagram, FaGraduationCap, FaPlus, FaTimes } from 'react-icons/fa';

const SKILL_RECOMMENDATIONS = {
  skills: [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'HTML', 'CSS', 'TypeScript',
    'Vue.js', 'Angular', 'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'Git', 'Docker',
    'AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'GraphQL', 'REST APIs', 'Machine Learning',
    'Data Analysis', 'UI/UX Design', 'Photoshop', 'Figma', 'Sketch'
  ],
  languages: [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Arabic',
    'Portuguese', 'Russian', 'Italian', 'Hindi', 'Dutch', 'Swedish', 'Norwegian'
  ],
  projects: [
    'E-commerce Website', 'Mobile App', 'Web Application', 'API Development', 'Database Design',
    'Machine Learning Model', 'Data Visualization', 'Portfolio Website', 'Blog Platform',
    'Social Media App', 'Task Management System', 'Chat Application'
  ],
  courses: [
    'Full Stack Web Development', 'Data Science', 'Machine Learning', 'Cloud Computing',
    'Cybersecurity', 'Mobile Development', 'DevOps', 'AI/ML', 'Blockchain', 'UX Design',
    'Digital Marketing', 'Project Management', 'AWS Certification', 'Google Analytics'
  ]
};

const SkillTag = ({ skill, onRemove, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.2 }}
    className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
  >
    <span>{skill}</span>
    <button
      onClick={() => onRemove(index)}
      className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-1"
    >
      <FaTimes size={10} />
    </button>
  </motion.div>
);

const SkillSection = ({ title, listName, icon: Icon, color, recommendations }) => {
  const { formData, addToList, updateList, removeFromList } = useCVStore();
  const [newSkill, setNewSkill] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const skills = formData.lists[listName] || [];

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      addToList(listName, newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const addRecommendation = (skill) => {
    if (!skills.includes(skill)) {
      addToList(listName, skill);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon className={`text-${color}-500`} size={20} />
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>

      {/* Input Field */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Add ${title.toLowerCase()}...`}
          className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          onClick={handleAddSkill}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <FaPlus size={14} />
          <span>Add</span>
        </button>
      </div>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2 min-h-[2rem]">
        <AnimatePresence>
          {skills.map((skill, index) => (
            <SkillTag
              key={index}
              skill={skill}
              index={index}
              onRemove={(idx) => removeFromList(listName, idx)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Recommendations */}
      <div>
        <button
          onClick={() => setShowRecommendations(!showRecommendations)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showRecommendations ? 'Hide' : 'Show'} Recommendations
        </button>
        <AnimatePresence>
          {showRecommendations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex flex-wrap gap-2">
                {recommendations.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => addRecommendation(skill)}
                    disabled={skills.includes(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      skills.includes(skill)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SkillsStep = () => {
  const sections = [
    {
      title: 'Technical Skills',
      listName: 'skills',
      icon: FaCogs,
      color: 'blue',
      recommendations: SKILL_RECOMMENDATIONS.skills
    },
    {
      title: 'Languages',
      listName: 'languages',
      icon: FaLanguage,
      color: 'green',
      recommendations: SKILL_RECOMMENDATIONS.languages
    },
    {
      title: 'Projects',
      listName: 'projects',
      icon: FaProjectDiagram,
      color: 'purple',
      recommendations: SKILL_RECOMMENDATIONS.projects
    },
    {
      title: 'Courses & Certifications',
      listName: 'courses',
      icon: FaGraduationCap,
      color: 'orange',
      recommendations: SKILL_RECOMMENDATIONS.courses
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Skills & Expertise</h2>
        <p className="text-sm text-gray-600">Add your skills, languages, projects, and certifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <motion.div
            key={section.listName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <SkillSection {...section} />
          </motion.div>
        ))}
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
      >
        <h3 className="font-medium text-yellow-900 mb-2">💡 Pro Tips:</h3>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Focus on skills relevant to your target job</li>
          <li>• Include both technical and soft skills</li>
          <li>• Use industry-standard terminology</li>
          <li>• Add programming languages, frameworks, and tools you're proficient in</li>
          <li>• Include language proficiency levels (e.g., Native, Fluent, Conversational)</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default SkillsStep; 