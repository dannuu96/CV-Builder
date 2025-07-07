import React from 'react';
import { motion } from 'framer-motion';
import { useCVStore } from '../../store/cvStore';
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCogs,
  FaPalette,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

const STEPS = [
  {
    id: 'personal',
    title: 'Personal Info',
    icon: FaUser,
    description: 'Basic information about you',
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: FaBriefcase,
    description: 'Your work history',
  },
  {
    id: 'education',
    title: 'Education',
    icon: FaGraduationCap,
    description: 'Your educational background',
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: FaCogs,
    description: 'Your skills and languages',
  },
  {
    id: 'template',
    title: 'Template',
    icon: FaPalette,
    description: 'Choose your design',
  },
];

const StepIndicator = ({ step, currentStep, isCompleted }) => {
  const Icon = step.icon;
  const isActive = currentStep === step.id;
  const stepIndex = STEPS.findIndex((s) => s.id === step.id);
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <motion.div
      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-blue-500 text-white shadow-lg'
          : isCompleted
          ? 'bg-green-500 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isActive
            ? 'bg-white text-blue-500'
            : isCompleted
            ? 'bg-white text-green-500'
            : 'bg-gray-200'
        }`}
      >
        {isCompleted ? <FaCheck size={12} /> : <Icon size={12} />}
      </div>
      <div className="hidden md:block">
        <h3 className="font-medium text-sm">{step.title}</h3>
        <p className="text-xs opacity-80">{step.description}</p>
      </div>
    </motion.div>
  );
};

const StepWizard = ({ children }) => {
  const { currentStep, setStep, nextStep, prevStep, totalSteps } =
    useCVStore() || {};

  // Fix: Properly handle findIndex returning -1
  const currentStepIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.id === currentStep)
  );
  const currentStepData = STEPS[currentStepIndex] || STEPS[0];

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const handleStepClick = (stepId) => {
    if (!setStep) return;
    const stepIndex = STEPS.findIndex((s) => s.id === stepId);
    if (stepIndex >= 0) {
      setStep(stepIndex);
    }
  };

  const isStepCompleted = (stepId) => {
    const stepIndex = STEPS.findIndex((s) => s.id === stepId);
    return stepIndex < currentStepIndex;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">CV Builder</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>
                Step {currentStepIndex + 1} of {STEPS.length}
              </span>
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Step Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Progress
              </h2>
              <div className="space-y-2">
                {STEPS.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className="w-full text-left"
                    disabled={index > currentStepIndex + 1}
                  >
                    <StepIndicator
                      step={step}
                      currentStep={currentStepData?.id || STEPS[0].id}
                      isCompleted={isStepCompleted(step.id)}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm">
              {/* Step Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    {currentStepData?.icon && (
                      <currentStepData.icon className="text-white" size={16} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {currentStepData?.title || 'Loading...'}
                    </h2>
                    <p className="text-gray-600">
                      {currentStepData?.description || 'Please wait...'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-6">{children}</div>

              {/* Navigation */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => prevStep && prevStep()}
                    disabled={isFirstStep || !prevStep}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isFirstStep || !prevStep
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <FaArrowLeft size={14} />
                    <span>Previous</span>
                  </button>

                  <div className="flex space-x-2">
                    {STEPS.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index <= currentStepIndex
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => nextStep && nextStep()}
                    disabled={isLastStep || !nextStep}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isLastStep || !nextStep
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <span>{isLastStep ? 'Complete' : 'Next'}</span>
                    <FaArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepWizard;
