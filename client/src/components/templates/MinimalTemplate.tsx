import { formatDateRange } from "@/lib/utils";
import { type ResumeData } from '@shared/schema';

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects = [] } = data;
  
  // Format skills as an array
  const skillsArray = skills?.split(',').map(skill => skill.trim()).filter(Boolean) || [];
  
  return (
    <div className="w-[210mm] h-[297mm] bg-white shadow-md mx-auto flex flex-col p-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-base text-gray-600 mt-1">{personalInfo.jobTitle || "Your Job Title"}</p>
        
        {/* Contact Line */}
        <div className="flex flex-wrap justify-center gap-x-2 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>
      
      {/* Divider */}
      <hr className="border-t border-gray-200 w-16 mx-auto mb-4" />
      
      {/* Summary */}
      {summary && (
        <div className="mb-4">
          <p className="text-center text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">{summary}</p>
        </div>
      )}
      
      {/* Two Column Layout */}
      <div className="flex-1 flex gap-x-4">
        {/* Main Content - 70% */}
        <div className="w-[70%]">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Experience</h2>
              <div className="space-y-3">
                {experience.map(job => (
                  <div key={job.id} className="text-xs">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-medium text-gray-800">{job.title}</h3>
                      <span className="text-gray-500">
                        {formatDateRange(job.startDate, job.endDate, job.current)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-gray-600 mb-1">
                      <span>{job.company}</span>
                      <span>{job.location}</span>
                    </div>
                    {job.description && (
                      <div className="text-gray-600 leading-relaxed pl-2 border-l border-gray-200">
                        {job.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                      <span className="text-gray-500">
                        {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-gray-600 mb-1">
                      <span>{edu.institution}</span>
                      <span>{edu.location}</span>
                    </div>
                    {edu.description && (
                      <div className="text-gray-600 leading-relaxed pl-2 border-l border-gray-200">
                        {edu.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar - 30% */}
        <div className="w-[30%]">
          {/* Skills */}
          {skillsArray.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skillsArray.map((skill, index) => (
                  <span key={index} className="text-gray-600 text-xs">
                    {skill}{index < skillsArray.length - 1 ? " •" : ""}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3">Projects</h2>
              <div className="space-y-2">
                {projects.map(project => (
                  <div key={project.id} className="text-xs">
                    <h3 className="font-medium text-gray-800">{project.name}</h3>
                    {project.url && (
                      <a href={project.url} className="text-gray-500 hover:text-gray-700 block text-[10px] mb-0.5">
                        {project.url.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                    {project.description && (
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
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
}
