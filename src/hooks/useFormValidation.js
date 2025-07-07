import { useState, useEffect } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  personalInfo: yup.object().shape({
    fullName: yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phone: yup.string().matches(/^[+]?[0-9\s\-()]+$/, 'Invalid phone number format'),
    jobTitle: yup.string().required('Job title is required'),
    description: yup.string().min(50, 'Description must be at least 50 characters').max(500, 'Description must be less than 500 characters'),
    aboutMe: yup.string().min(50, 'About me must be at least 50 characters').max(500, 'About me must be less than 500 characters'),
    linkedin: yup.string().url('Invalid LinkedIn URL'),
    github: yup.string().url('Invalid GitHub URL'),
  }),
  experience: yup.array().of(
    yup.object().shape({
      jobTitle: yup.string().required('Job title is required'),
      company: yup.string().required('Company is required'),
      duration: yup.string().required('Duration is required'),
      description: yup.string().min(20, 'Description must be at least 20 characters'),
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      degree: yup.string().required('Degree is required'),
      institution: yup.string().required('Institution is required'),
      graduationYear: yup.string().required('Graduation year is required'),
    })
  ),
  lists: yup.object().shape({
    skills: yup.array().min(1, 'At least one skill is required'),
    languages: yup.array().min(1, 'At least one language is required'),
  }),
});

export const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateField = async (fieldPath, value) => {
    try {
      await yup.reach(validationSchema, fieldPath).validate(value);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldPath];
        return newErrors;
      });
      return true;
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [fieldPath]: error.message
      }));
      return false;
    }
  };

  const validateStep = async (stepName) => {
    const stepData = getStepData(stepName, formData);
    const stepSchema = getStepSchema(stepName);
    
    try {
      await stepSchema.validate(stepData, { abortEarly: false });
      // Clear errors for this step
      setErrors(prev => {
        const newErrors = { ...prev };
        Object.keys(newErrors).forEach(key => {
          if (key.startsWith(stepName)) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });
      return true;
    } catch (error) {
      const stepErrors = {};
      error.inner.forEach(err => {
        stepErrors[`${stepName}.${err.path}`] = err.message;
      });
      setErrors(prev => ({ ...prev, ...stepErrors }));
      return false;
    }
  };

  const validateAll = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      setIsValid(true);
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      setIsValid(false);
      return false;
    }
  };

  const getStepData = (stepName, data) => {
    switch (stepName) {
      case 'personal':
        return data.personalInfo;
      case 'experience':
        return data.experience;
      case 'education':
        return data.education;
      case 'skills':
        return data.lists;
      default:
        return {};
    }
  };

  const getStepSchema = (stepName) => {
    switch (stepName) {
      case 'personal':
        return validationSchema.fields.personalInfo;
      case 'experience':
        return yup.object().shape({
          experience: validationSchema.fields.experience
        });
      case 'education':
        return yup.object().shape({
          education: validationSchema.fields.education
        });
      case 'skills':
        return validationSchema.fields.lists;
      default:
        return yup.object();
    }
  };

  const getFieldError = (fieldPath) => {
    return errors[fieldPath] || '';
  };

  const clearErrors = () => {
    setErrors({});
  };

  useEffect(() => {
    validateAll();
  }, [formData]);

  return {
    errors,
    isValid,
    validateField,
    validateStep,
    validateAll,
    getFieldError,
    clearErrors,
  };
}; 