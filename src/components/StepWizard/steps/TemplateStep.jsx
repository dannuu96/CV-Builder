import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVStore } from '../../../store/cvStore';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { FaPalette, FaEye, FaDownload, FaCheck, FaCog } from 'react-icons/fa';
import LoadingSpinner from '../../UI/LoadingSpinner';
import { PreviewSkeleton } from '../../UI/SkeletonLoader';

// Import all new templates
import DoubleColumnTemplate from '../../Templates/DoubleColumnTemplate';
import IvyLeagueTemplate from '../../Templates/IvyLeagueTemplate';
import ContemporaryTemplate from '../../Templates/ContemporaryTemplate';
import ElegantTemplate from '../../Templates/ElegantTemplate';
import CreativeTemplate from '../../Templates/CreativeTemplate';
import TimelineTemplate from '../../Templates/TimelineTemplate';
import MinimalTemplate from '../../Templates/MinimalTemplate';
import ClassicTemplate from '../../Templates/ClassicTemplate';
import CompactTemplate from '../../Templates/CompactTemplate';
import StylishTemplate from '../../Templates/StylishTemplate';

const TEMPLATES = [
  {
    id: 'double-column',
    name: 'Double Column',
    description: 'Professional two-column layout',
    component: DoubleColumnTemplate,
    color: 'bg-gradient-to-r from-slate-600 to-blue-600',
    category: 'Professional',
  },
  {
    id: 'ivy-league',
    name: 'Ivy League',
    description: 'Sophisticated academic styling',
    component: IvyLeagueTemplate,
    color: 'bg-gradient-to-r from-indigo-800 to-navy-700',
    category: 'Academic',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Modern business design',
    component: ContemporaryTemplate,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    category: 'Modern',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Refined gold-accented design',
    component: ElegantTemplate,
    color: 'bg-gradient-to-r from-yellow-600 to-amber-600',
    category: 'Luxury',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold pink creative layout',
    component: CreativeTemplate,
    color: 'bg-gradient-to-r from-pink-500 to-rose-500',
    category: 'Creative',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Chronological teal timeline',
    component: TimelineTemplate,
    color: 'bg-gradient-to-r from-teal-500 to-green-500',
    category: 'Creative',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design',
    component: MinimalTemplate,
    color: 'bg-gradient-to-r from-gray-500 to-slate-500',
    category: 'Simple',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional style',
    component: ClassicTemplate,
    color: 'bg-gradient-to-r from-gray-800 to-black',
    category: 'Traditional',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient purple design',
    component: CompactTemplate,
    color: 'bg-gradient-to-r from-purple-500 to-violet-600',
    category: 'Efficient',
  },
  {
    id: 'stylish',
    name: 'Stylish',
    description: 'Modern with blue accents',
    component: StylishTemplate,
    color: 'bg-gradient-to-r from-blue-600 to-indigo-700',
    category: 'Modern',
  },
];

const TemplateCard = ({ template, isSelected, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
        isSelected
          ? 'border-blue-500 shadow-lg transform scale-105'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(template.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Template Preview */}
        <div
          className={`w-full h-48 ${template.color} flex items-center justify-center`}
        >
          <div className="text-white text-center">
            <h4 className="text-2xl font-bold mb-2">{template.name}</h4>
            <p className="text-sm opacity-90">{template.description}</p>
          </div>
        </div>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2"
          >
            <FaCheck size={16} />
          </motion.div>
        )}

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="text-white text-center">
                <FaEye size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Preview</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {template.name}
          </h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {template.category}
          </span>
        </div>
        <p className="text-sm text-gray-600">{template.description}</p>
      </div>
    </motion.div>
  );
};

const ColorThemeSelector = () => {
  const { theme, updateTheme } = useCVStore();

  const colorOptions = [
    { name: 'Blue', value: '#2563eb' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Green', value: '#059669' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Pink', value: '#db2777' },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-900">Color Theme</h4>
      <div className="flex space-x-2">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            onClick={() => updateTheme('primaryColor', color.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              theme.primaryColor === color.value
                ? 'border-gray-800 scale-110'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

const TemplateStep = () => {
  const {
    selectedTemplate,
    setSelectedTemplate,
    formData,
    setIsViewing,
    isViewing,
    setIsGenerating,
    isGenerating,
  } = useCVStore();

  const [filter, setFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'All',
    'Modern',
    'Traditional',
    'Creative',
    'Professional',
  ];

  const filteredTemplates =
    filter === 'All'
      ? TEMPLATES
      : TEMPLATES.filter((template) => template.category === filter);

  const selectedTemplateData = TEMPLATES.find((t) => t.id === selectedTemplate);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsViewing(true);
    }, 1000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  const renderTemplate = () => {
    if (!selectedTemplateData) return null;
    const TemplateComponent = selectedTemplateData.component;
    return <TemplateComponent data={formData} />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Your Template
        </h2>
        <p className="text-gray-600">
          Select a template that best represents your style
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center space-x-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>

      {/* Customization Panel */}
      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <FaCog className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Customize Template
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ColorThemeSelector />

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Font Size</h4>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                // onChange={(e) => updateTheme('fontSize', e.target.value)}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={handlePreview}
          disabled={!selectedTemplate || isLoading}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" color="white" />
          ) : (
            <FaEye size={16} />
          )}
          <span>Preview CV</span>
        </button>

        <PDFDownloadLink
          document={selectedTemplate ? renderTemplate() : null}
          fileName={`${formData.personalInfo.fullName || 'CV'}_Resume.pdf`}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {({ loading }) => (
            <>
              {loading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <FaDownload size={16} />
              )}
              <span>{loading ? 'Generating...' : 'Download CV'}</span>
            </>
          )}
        </PDFDownloadLink>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {isViewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">CV Preview</h3>
                <button
                  onClick={() => setIsViewing(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 p-4">
                {selectedTemplate ? (
                  <PDFViewer width="100%" height="100%">
                    {renderTemplate()}
                  </PDFViewer>
                ) : (
                  <PreviewSkeleton />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemplateStep;
