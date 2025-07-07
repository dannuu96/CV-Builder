import React, { useEffect } from 'react';
import { useCVStore } from '../store/cvStore';
import { useFormValidation } from '../hooks/useFormValidation';
import { showToast } from '../components/UI/Toast';
import StepWizard from '../components/StepWizard/StepWizard';
import PersonalInfoStep from '../components/StepWizard/steps/PersonalInfoStep';
import ExperienceStep from '../components/StepWizard/steps/ExperienceStep';
import EducationStep from '../components/StepWizard/steps/EducationStep';
import SkillsStep from '../components/StepWizard/steps/SkillsStep';
import TemplateStep from '../components/StepWizard/steps/TemplateStep';
import LivePreview from '../components/LivePreview';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

// Fallback component for missing steps
const FallbackStep = () => (
  <div className="p-8 text-center">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Step Loading...
    </h2>
    <p className="text-gray-600">Please wait while we load this step.</p>
  </div>
);

const STEPS = [
  { id: 'personal', component: PersonalInfoStep || FallbackStep },
  { id: 'experience', component: ExperienceStep || FallbackStep },
  { id: 'education', component: EducationStep || FallbackStep },
  { id: 'skills', component: SkillsStep || FallbackStep },
  { id: 'template', component: TemplateStep || FallbackStep },
];

const CVForm = () => {
  const {
    currentStep,
    formData,
    setFormData,
    nextStep,
    prevStep,
    setStep,
    isLoading,
  } = useCVStore() || {};

  const { validateStep, errors } = useFormValidation(formData || {});
  const [showPreview, setShowPreview] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

  // Handle window resize for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (!formData) return;

    const autoSave = setInterval(() => {
      localStorage.setItem(
        'cvBuilder-autoSave',
        JSON.stringify({
          formData,
          currentStep: currentStep || 0,
          savedAt: new Date().toISOString(),
        })
      );
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSave);
  }, [formData, currentStep]);

  // Load auto-saved data on component mount
  useEffect(() => {
    if (!setFormData || !setStep) return;

    const savedData = localStorage.getItem('cvBuilder-autoSave');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const savedTime = new Date(parsed.savedAt);
        const now = new Date();
        const timeDiff = now - savedTime;

        // Only restore if saved within last 24 hours
        if (timeDiff < 24 * 60 * 60 * 1000) {
          setFormData(parsed.formData);
          setStep(parsed.currentStep || 0);
          showToast.info(
            'Auto-saved data restored',
            'Your previous work has been restored'
          );
        }
      } catch (error) {
        console.error('Error loading auto-saved data:', error);
      }
    }
  }, [setFormData, setStep]);

  const handleStepChange = async (direction) => {
    if (direction === 'next') {
      const currentStepName = STEPS[currentStep || 0]?.id;

      if (validateStep) {
        const isValid = await validateStep(currentStepName);

        if (isValid) {
          nextStep && nextStep();
          showToast.success('Step completed!', 'Moving to next step');
        } else {
          showToast.error(
            'Please fix the errors',
            'Check the highlighted fields'
          );
        }
      } else {
        nextStep && nextStep();
        showToast.success('Step completed!', 'Moving to next step');
      }
    } else {
      prevStep && prevStep();
    }
  };

  const getCurrentStepComponent = () => {
    const step = STEPS[currentStep || 0];
    if (!step) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Welcome to CV Builder
          </h2>
          <p className="text-gray-600">
            Let's start building your professional CV!
          </p>
        </div>
      );
    }

    const StepComponent = step.component;
    return <StepComponent />;
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (isLoading || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CV Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white shadow-sm border-b px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft size={16} />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-semibold">CV Builder</h1>
          <button
            onClick={togglePreview}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            {showPreview ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Main Content */}
        <div className={`flex-1 ${isMobile ? 'pb-20' : ''}`}>
          <StepWizard>{getCurrentStepComponent()}</StepWizard>
        </div>

        {/* Live Preview Sidebar */}
        <AnimatePresence>
          {(showPreview || !isMobile) && (
            <motion.div
              initial={isMobile ? { x: '100%' } : { opacity: 0 }}
              animate={isMobile ? { x: 0 } : { opacity: 1 }}
              exit={isMobile ? { x: '100%' } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${
                isMobile
                  ? 'fixed inset-0 z-50 bg-white'
                  : 'w-1/3 border-l border-gray-200 bg-white'
              } overflow-hidden`}
            >
              {isMobile && (
                <div className="flex items-center justify-between p-4 border-b">
                  <h2 className="text-lg font-semibold">Live Preview</h2>
                  <button
                    onClick={togglePreview}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaEyeSlash size={20} />
                  </button>
                </div>
              )}

              <div className="h-full overflow-auto">
                <LivePreview
                  formData={formData}
                  selectedTemplate={
                    useCVStore.getState()?.selectedTemplate || 'modern'
                  }
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Preview Toggle Button */}
      {isMobile && !showPreview && (
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          onClick={togglePreview}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <FaEye size={20} />
        </motion.button>
      )}
    </div>
  );
};

export default CVForm;
