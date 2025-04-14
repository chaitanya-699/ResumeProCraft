import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  type ResumeData, 
  type PersonalInfo, 
  type Experience, 
  type Education, 
  type Project,
  resumeDataSchema
} from '@shared/schema';
import { apiRequest } from './queryClient';
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';

// Default values for new resume
const defaultPersonalInfo: PersonalInfo = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  website: ''
};

const defaultExperienceItem: Experience = {
  id: nanoid(),
  company: '',
  title: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: ''
};

const defaultEducationItem: Education = {
  id: nanoid(),
  institution: '',
  degree: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: ''
};

const defaultProjectItem: Project = {
  id: nanoid(),
  name: '',
  url: '',
  description: ''
};

const defaultResumeData: ResumeData = {
  personalInfo: defaultPersonalInfo,
  summary: '',
  experience: [defaultExperienceItem],
  education: [defaultEducationItem],
  skills: '',
  projects: [defaultProjectItem],
  template: 'modern'
};

// Define the context type
type ResumeContextType = {
  resumeData: ResumeData;
  currentResumeId: number | null;
  isLoading: boolean;
  
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  updateSkills: (skills: string) => void;
  updateTemplate: (template: 'classic' | 'modern' | 'minimal') => void;
  
  // Experience operations
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  
  // Education operations
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Project operations
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  // Resume save/load operations
  saveResume: (title: string, userId: number) => Promise<void>;
  loadResume: (id: number) => Promise<void>;
  resetResume: () => void;
};

// Create the context
const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Provider component
export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentResumeId, setCurrentResumeId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const validatedData = resumeDataSchema.parse(parsedData);
        setResumeData(validatedData);
      } catch (error) {
        console.error('Failed to load saved resume data:', error);
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Personal info update
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  // Summary update
  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  // Skills update
  const updateSkills = (skills: string) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  // Template update
  const updateTemplate = (template: 'classic' | 'modern' | 'minimal') => {
    setResumeData(prev => ({ ...prev, template }));
  };

  // Experience operations
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...defaultExperienceItem, id: nanoid() }]
    }));
  };

  const updateExperience = (id: string, data: Partial<Experience>) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Education operations
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { ...defaultEducationItem, id: nanoid() }]
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Project operations
  const addProject = () => {
    const projects = resumeData.projects || [];
    setResumeData(prev => ({
      ...prev,
      projects: [...projects, { ...defaultProjectItem, id: nanoid() }]
    }));
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    if (!resumeData.projects) return;
    
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects?.map(proj => 
        proj.id === id ? { ...proj, ...data } : proj
      )
    }));
  };

  const removeProject = (id: string) => {
    if (!resumeData.projects) return;
    
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects?.filter(proj => proj.id !== id)
    }));
  };

  // Save resume to API
  const saveResume = async (title: string, userId: number) => {
    try {
      setIsLoading(true);
      
      const payload = {
        userId,
        title,
        template: resumeData.template,
        data: JSON.stringify(resumeData)
      };
      
      if (currentResumeId) {
        // Update existing resume
        await apiRequest('PUT', `/api/resumes/${currentResumeId}`, payload);
        toast({
          title: 'Resume Updated',
          description: 'Your resume has been updated successfully',
        });
      } else {
        // Create new resume
        const response = await apiRequest('POST', '/api/resumes', payload);
        const newResume = await response.json();
        setCurrentResumeId(newResume.id);
        toast({
          title: 'Resume Saved',
          description: 'Your resume has been saved successfully',
        });
      }
    } catch (error) {
      console.error('Failed to save resume:', error);
      toast({
        title: 'Save Failed',
        description: 'Failed to save your resume',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load resume from API
  const loadResume = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/resumes/${id}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to load resume');
      }
      
      const resume = await response.json();
      const resumeData = JSON.parse(resume.data);
      setResumeData(resumeData);
      setCurrentResumeId(id);
      
      toast({
        title: 'Resume Loaded',
        description: 'Your resume has been loaded successfully',
      });
    } catch (error) {
      console.error('Failed to load resume:', error);
      toast({
        title: 'Load Failed',
        description: 'Failed to load your resume',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset resume to default
  const resetResume = () => {
    setResumeData(defaultResumeData);
    setCurrentResumeId(null);
    toast({
      title: 'Resume Reset',
      description: 'Your resume has been reset to default',
    });
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      currentResumeId,
      isLoading,
      updatePersonalInfo,
      updateSummary,
      updateSkills,
      updateTemplate,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addProject,
      updateProject,
      removeProject,
      saveResume,
      loadResume,
      resetResume
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook for using the resume context
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
