import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_FORM_DATA = {
  personalInfo: {
    fullName: 'Alex Johnson',
    jobTitle: 'Senior Full Stack Developer',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA, USA',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    description:
      'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Strong background in agile development and team leadership.',
    aboutMe:
      'I am a dedicated software engineer who thrives on solving complex problems and creating innovative solutions. With a strong foundation in both frontend and backend technologies, I enjoy building user-centric applications that make a real impact. When not coding, I contribute to open-source projects and mentor junior developers.',
  },
  experience: [
    {
      jobTitle: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      duration: '2022 - Present',
      description:
        'Led development of enterprise SaaS platform serving 10,000+ users. Built scalable React applications with Node.js backends. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored team of 4 junior developers.',
    },
    {
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      duration: '2020 - 2022',
      description:
        'Developed MVP from scratch using React, Express.js, and PostgreSQL. Integrated payment systems and third-party APIs. Improved application performance by 40% through optimization. Collaborated with product team on feature requirements.',
    },
    {
      jobTitle: 'Frontend Developer',
      company: 'Digital Agency Inc',
      duration: '2019 - 2020',
      description:
        'Created responsive web applications for 15+ clients using React and Vue.js. Implemented pixel-perfect designs with 99% accuracy. Optimized websites for SEO and accessibility. Worked closely with designers and backend developers.',
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      graduationYear: '2019',
      description:
        'Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Web Development',
    },
    {
      degree: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      graduationYear: '2023',
      description:
        'Professional certification demonstrating expertise in designing distributed systems on AWS',
    },
  ],
  lists: {
    skills: [
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Python',
      'Java',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'Vue.js',
      'Angular',
      'Express.js',
      'Django',
      'Spring Boot',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'AWS',
      'Docker',
      'Kubernetes',
      'Git',
      'GraphQL',
      'REST APIs',
    ],
    interests: [
      'Machine Learning',
      'Cloud Computing',
      'Mobile Development',
      'DevOps',
      'Blockchain',
      'Artificial Intelligence',
      'Cybersecurity',
      'Open Source',
      'Photography',
      'Hiking',
      'Chess',
      'Cooking',
    ],
    languages: [
      'English (Native)',
      'Spanish (Fluent)',
      'French (Conversational)',
      'Mandarin (Basic)',
      'German (Basic)',
    ],
    projects: [
      'E-commerce Platform - Full-stack marketplace with 1000+ products',
      'Task Management App - Real-time collaboration tool with 500+ users',
      'Weather Dashboard - React app with geolocation and APIs',
      'Crypto Tracker - Cryptocurrency portfolio tracker with charts',
      'Social Media Analytics - Data visualization dashboard',
    ],
    courses: [
      'Advanced React Patterns - Frontend Masters',
      'System Design Fundamentals - Educative',
      'Machine Learning Specialization - Coursera',
      'AWS Solutions Architect - A Cloud Guru',
      'Docker & Kubernetes - Udemy',
      'GraphQL with React - Udemy',
    ],
  },
};

export const useCVStore = create(
  persist(
    (set, get) => ({
      // Form data
      formData: INITIAL_FORM_DATA,

      // UI state
      currentStep: 0,
      totalSteps: 5,
      selectedTemplate: 'minimal',
      isGenerating: false,
      isViewing: false,
      isLoading: false,

      // Theme and customization
      theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#7c3aed',
        fontFamily: 'Inter',
        fontSize: 'medium',
      },

      // Error handling
      errors: {},

      // Actions
      setFormData: (newData) => set({ formData: newData }),

      updatePersonalInfo: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            personalInfo: {
              ...state.formData.personalInfo,
              [field]: value,
            },
          },
        })),

      updateExperience: (index, field, value) =>
        set((state) => {
          const newExperience = [...state.formData.experience];
          newExperience[index] = { ...newExperience[index], [field]: value };
          return {
            formData: {
              ...state.formData,
              experience: newExperience,
            },
          };
        }),

      addExperience: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            experience: [
              ...state.formData.experience,
              { jobTitle: '', company: '', duration: '', description: '' },
            ],
          },
        })),

      removeExperience: (index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            experience: state.formData.experience.filter((_, i) => i !== index),
          },
        })),

      updateEducation: (index, field, value) =>
        set((state) => {
          const newEducation = [...state.formData.education];
          newEducation[index] = { ...newEducation[index], [field]: value };
          return {
            formData: {
              ...state.formData,
              education: newEducation,
            },
          };
        }),

      addEducation: () =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: [
              ...state.formData.education,
              {
                degree: '',
                institution: '',
                graduationYear: '',
                description: '',
              },
            ],
          },
        })),

      removeEducation: (index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            education: state.formData.education.filter((_, i) => i !== index),
          },
        })),

      updateList: (listName, index, value) =>
        set((state) => {
          const newList = [...state.formData.lists[listName]];
          newList[index] = value;
          return {
            formData: {
              ...state.formData,
              lists: {
                ...state.formData.lists,
                [listName]: newList,
              },
            },
          };
        }),

      addToList: (listName, value = '') =>
        set((state) => ({
          formData: {
            ...state.formData,
            lists: {
              ...state.formData.lists,
              [listName]: [...state.formData.lists[listName], value],
            },
          },
        })),

      removeFromList: (listName, index) =>
        set((state) => ({
          formData: {
            ...state.formData,
            lists: {
              ...state.formData.lists,
              [listName]: state.formData.lists[listName].filter(
                (_, i) => i !== index
              ),
            },
          },
        })),

      // Navigation
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),

      setStep: (step) =>
        set((state) => ({
          currentStep: Math.max(0, Math.min(step, state.totalSteps - 1)),
        })),

      // Template and theme
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),

      setTheme: (theme) => set({ theme }),

      updateTheme: (field, value) =>
        set((state) => ({
          theme: {
            ...state.theme,
            [field]: value,
          },
        })),

      // UI state
      setIsGenerating: (value) => set({ isGenerating: value }),
      setIsViewing: (value) => set({ isViewing: value }),
      setIsLoading: (value) => set({ isLoading: value }),

      // Error handling
      setErrors: (errors) => set({ errors }),
      clearErrors: () => set({ errors: {} }),

      // Reset
      resetForm: () =>
        set({ formData: INITIAL_FORM_DATA, currentStep: 0, errors: {} }),

      // Import/Export
      exportData: () => {
        const { formData, selectedTemplate, theme } = get();
        return {
          formData,
          selectedTemplate,
          theme,
          exportedAt: new Date().toISOString(),
        };
      },

      importData: (data) => {
        if (data.formData) set({ formData: data.formData });
        if (data.selectedTemplate)
          set({ selectedTemplate: data.selectedTemplate });
        if (data.theme) set({ theme: data.theme });
      },
    }),
    {
      name: 'cv-builder-storage',
      version: 1,
    }
  )
);
