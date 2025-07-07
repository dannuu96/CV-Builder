import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { motion } from 'framer-motion';
import { FaEye, FaDownload, FaSyncAlt, FaCog } from 'react-icons/fa';
import { useCVStore } from '../store/cvStore';
import { PreviewSkeleton } from './UI/SkeletonLoader';
import LoadingSpinner from './UI/LoadingSpinner';

// Import all new templates
import DoubleColumnTemplate from './Templates/DoubleColumnTemplate';
import IvyLeagueTemplate from './Templates/IvyLeagueTemplate';
import ContemporaryTemplate from './Templates/ContemporaryTemplate';
import ElegantTemplate from './Templates/ElegantTemplate';
import CreativeTemplate from './Templates/CreativeTemplate';
import TimelineTemplate from './Templates/TimelineTemplate';
import MinimalTemplate from './Templates/MinimalTemplate';
import ClassicTemplate from './Templates/ClassicTemplate';
import CompactTemplate from './Templates/CompactTemplate';
import StylishTemplate from './Templates/StylishTemplate';

const LivePreview = ({ formData, selectedTemplate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const { theme } = useCVStore();

  const templates = {
    'double-column': DoubleColumnTemplate,
    'ivy-league': IvyLeagueTemplate,
    contemporary: ContemporaryTemplate,
    elegant: ElegantTemplate,
    creative: CreativeTemplate,
    timeline: TimelineTemplate,
    minimal: MinimalTemplate,
    classic: ClassicTemplate,
    compact: CompactTemplate,
    stylish: StylishTemplate,
  };

  const SelectedTemplate = templates[selectedTemplate];

  // Auto-refresh preview when data changes
  useEffect(() => {
    setLastUpdate(Date.now());
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, selectedTemplate, theme]);

  const refreshPreview = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const hasData =
    formData?.personalInfo?.fullName ||
    formData?.experience?.length > 0 ||
    formData?.education?.length > 0;

  if (!hasData) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="bg-white rounded-lg p-8 shadow-sm max-w-sm">
            <FaEye className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Live Preview
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Start filling out your information to see a live preview of your
              CV
            </p>
            <div className="bg-gray-100 rounded p-3">
              <p className="text-xs text-gray-500">
                Preview will update automatically as you type
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaEye className="text-blue-600" size={18} />
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshPreview}
            className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            title="Refresh preview"
          >
            <FaSyncAlt className="text-gray-600" size={14} />
          </motion.button>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
            Updated: {new Date(lastUpdate).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div
        className="bg-white rounded-lg shadow-sm overflow-hidden"
        style={{ height: 'calc(100% - 60px)' }}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <LoadingSpinner size="lg" message="Generating preview..." />
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️</div>
              <h4 className="font-medium text-gray-900 mb-2">Preview Error</h4>
              <p className="text-sm text-gray-600 mb-4">{error}</p>
              <button
                onClick={refreshPreview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : SelectedTemplate ? (
          <PDFViewer width="100%" height="100%">
            <SelectedTemplate data={formData} />
          </PDFViewer>
        ) : (
          <PreviewSkeleton />
        )}
      </div>

      {/* Quick Stats */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white rounded p-2 shadow-sm">
          <div className="text-lg font-semibold text-blue-600">
            {formData?.experience?.length || 0}
          </div>
          <div className="text-xs text-gray-600">Experience</div>
        </div>
        <div className="bg-white rounded p-2 shadow-sm">
          <div className="text-lg font-semibold text-green-600">
            {formData?.lists?.skills?.length || 0}
          </div>
          <div className="text-xs text-gray-600">Skills</div>
        </div>
        <div className="bg-white rounded p-2 shadow-sm">
          <div className="text-lg font-semibold text-purple-600">
            {formData?.education?.length || 0}
          </div>
          <div className="text-xs text-gray-600">Education</div>
        </div>
      </motion.div>
    </div>
  );
};

export default LivePreview;
