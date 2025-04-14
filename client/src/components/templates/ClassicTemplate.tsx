import { formatDateRange } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { type ResumeData } from '@shared/schema';

interface ClassicTemplateProps {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects = [] } = data;
  
  // Format skills as an array
  const skillsArray = skills?.split(',').map(skill => skill.trim()).filter(Boolean) || [];
  
  return (
    <div className="w-[210mm] h-[297mm] bg-white shadow-md mx-auto p-6 flex flex-col">
      {/* Header */}
      <div className="mb-4 pb-3 border-b-2 border-gray-200">
        <h1 className="text-xl font-bold text-center text-gray-800">{personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-base text-center text-gray-600 mt-1">{personalInfo.jobTitle || "Your Job Title"}</h2>
        
        {/* Contact Information */}
        <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-3 w-3 mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-3 w-3 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 flex gap-x-4">
        {/* Main Content - 70% */}
        <div className="w-[70%]">
          {/* Summary */}
          {summary && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Professional Summary</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Work Experience</h2>
              <div className="space-y-3">
                {experience.map(job => (
                  <div key={job.id} className="text-xs">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-800">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">{job.location}</p>
                        <p className="text-gray-500">
                          {formatDateRange(job.startDate, job.endDate, job.current)}
                        </p>
                      </div>
                    </div>
                    {job.description && (
                      <div className="text-gray-600 leading-relaxed pl-2 border-l border-gray-200 mt-1">
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
              <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Education</h2>
              <div className="space-y-3">
                {education.map(edu => (
                  <div key={edu.id} className="text-xs">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">{edu.location}</p>
                        <p className="text-gray-500">
                          {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                        </p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-600 leading-relaxed pl-2 border-l border-gray-200 mt-1">
                        {edu.description}
                      </p>
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
              <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skillsArray.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">Projects</h2>
              <div className="space-y-2">
                {projects.map(project => (
                  <div key={project.id} className="text-xs">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    {project.url && (
                      <a href={project.url} className="text-blue-600 hover:underline block text-[10px] mb-0.5">
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
