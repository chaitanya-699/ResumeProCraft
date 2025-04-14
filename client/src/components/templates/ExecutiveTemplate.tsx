import React from 'react';
import { type ResumeData } from '@shared/schema';
import { formatDate } from '@/lib/utils';

interface ExecutiveTemplateProps {
  data: ResumeData;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;
  
  // Process skills into categories
  const skillsList = skills.split(',').map(skill => skill.trim()).filter(Boolean);
  
  return (
    <div className="w-[210mm] h-[297mm] bg-white shadow-lg text-gray-800 flex flex-col relative overflow-hidden">
      {/* Left Sidebar */}
      <div className="absolute top-0 left-0 bottom-0 w-[5rem] bg-gray-900"></div>
      
      {/* Header Section */}
      <div className="pl-[6rem] pr-[2rem] pt-[2rem] pb-[1.5rem] border-b-2 border-gray-900">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{personalInfo.fullName}</h1>
        <h2 className="text-lg tracking-wide text-gray-600 mt-1">{personalInfo.jobTitle}</h2>
        
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Main Column - 70% */}
        <div className="w-[70%] pl-[6rem] pr-[2rem] pt-[1.5rem]">
          {/* Summary */}
          {summary && (
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase text-gray-900 mb-2 tracking-wide border-b border-gray-300 pb-1">
                Professional Summary
              </h3>
              <div className="text-sm leading-relaxed text-gray-700">
                {summary}
              </div>
            </div>
          )}
          
          {/* Experience Section */}
          {experience.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase text-gray-900 mb-2 tracking-wide border-b border-gray-300 pb-1">
                Professional Experience
              </h3>
              
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l border-gray-300">
                    <div className="absolute -left-[4px] top-1.5 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <h4 className="text-sm font-bold">{exp.title}</h4>
                    <div className="flex justify-between items-baseline text-xs">
                      <h5 className="font-medium">
                        {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                      </h5>
                      <div className="text-gray-600">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                    
                    {exp.description && (
                      <div className="mt-1.5 text-xs leading-relaxed text-gray-700">{exp.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education Section */}
          {education.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase text-gray-900 mb-2 tracking-wide border-b border-gray-300 pb-1">
                Education
              </h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-3 border-l border-gray-300">
                    <div className="absolute -left-[4px] top-1.5 w-2 h-2 bg-gray-800 rounded-full"></div>
                    <h4 className="text-sm font-bold">{edu.degree}</h4>
                    <div className="flex justify-between items-baseline text-xs">
                      <h5 className="font-medium">
                        {edu.institution}{edu.location ? ` | ${edu.location}` : ''}
                      </h5>
                      <div className="text-gray-600">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </div>
                    </div>
                    
                    {edu.description && (
                      <div className="mt-1.5 text-xs leading-relaxed text-gray-700">{edu.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Column - 30% */}
        <div className="w-[30%] pr-[2rem] pt-[1.5rem]">
          {/* Skills Section */}
          {skillsList.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase text-gray-900 mb-2 tracking-wide border-b border-gray-300 pb-1">
                Skills
              </h3>
              
              <div className="space-y-1.5">
                {skillsList.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-gray-800 mr-2"></div>
                    <span className="text-xs">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase text-gray-900 mb-2 tracking-wide border-b border-gray-300 pb-1">
                Projects
              </h3>
              
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h4 className="text-xs font-bold">{project.name}</h4>
                    {project.url && (
                      <a href={project.url} className="text-[11px] text-blue-700 block mb-1">
                        {project.url.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                    
                    {project.description && (
                      <div className="mt-1 text-[11px] leading-relaxed text-gray-700">{project.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate; 