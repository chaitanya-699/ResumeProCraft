import React from 'react';
import { type ResumeData } from '@shared/schema';
import { formatDate } from '@/lib/utils';

interface PremiumTemplateProps {
  data: ResumeData;
}

const PremiumTemplate: React.FC<PremiumTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  
  // Process skills into categories
  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);
  
  return (
    <div className="w-[210mm] h-[297mm] bg-white shadow-lg text-gray-800 flex flex-col overflow-hidden">
      {/* Header Section with Accent */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{personalInfo.fullName}</h1>
            <h2 className="text-xl mt-1 opacity-90">{personalInfo.jobTitle}</h2>
            
            {summary && (
              <div className="mt-4 pr-4 text-sm leading-relaxed max-w-[70%] opacity-90">
                {summary}
              </div>
            )}
          </div>
          
          <div className="flex flex-col text-sm space-y-1">
            {personalInfo.email && (
              <div className="flex items-center">
                <span className="font-medium mr-2">Email:</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            
            {personalInfo.phone && (
              <div className="flex items-center">
                <span className="font-medium mr-2">Phone:</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            
            {personalInfo.address && (
              <div className="flex items-center">
                <span className="font-medium mr-2">Location:</span>
                <span>{personalInfo.address}</span>
              </div>
            )}
            
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="font-medium mr-2">LinkedIn:</span>
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            
            {personalInfo.website && (
              <div className="flex items-center">
                <span className="font-medium mr-2">Website:</span>
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Left Column - 70% */}
        <div className="w-[70%] p-6 border-r border-gray-200">
          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-700 border-b-2 border-blue-700 pb-1 mb-3">
                PROFESSIONAL EXPERIENCE
              </h3>
              
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-base font-bold">{exp.title}</h4>
                      <div className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <h5 className="text-sm font-medium text-blue-600">{exp.company}</h5>
                      {exp.location && <div className="text-sm text-gray-600">{exp.location}</div>}
                    </div>
                    
                    {exp.description && (
                      <div className="mt-2 text-sm whitespace-pre-line">{exp.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education Section */}
          {education.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-700 border-b-2 border-blue-700 pb-1 mb-3">
                EDUCATION
              </h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-base font-bold">{edu.degree}</h4>
                      <div className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-baseline">
                      <h5 className="text-sm font-medium text-blue-600">{edu.institution}</h5>
                      {edu.location && <div className="text-sm text-gray-600">{edu.location}</div>}
                    </div>
                    
                    {edu.description && (
                      <div className="mt-2 text-sm whitespace-pre-line">{edu.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-blue-700 border-b-2 border-blue-700 pb-1 mb-3">
                PROJECTS
              </h3>
              
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-base font-bold">{project.name}</h4>
                      {project.url && (
                        <a href={project.url} className="text-sm text-blue-600 underline">
                          {project.url.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </div>
                    
                    {project.description && (
                      <div className="mt-1 text-sm whitespace-pre-line">{project.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - 30% */}
        <div className="w-[30%] p-6 bg-gray-50">
          {/* Skills Section */}
          {skillsList.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-700 border-b-2 border-blue-700 pb-1 mb-3">
                SKILLS
              </h3>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {skillsList.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremiumTemplate; 