import { useResume } from "@/lib/resumeContext";
import { formatDateRange } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function ClassicTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects = [] } = resumeData;
  
  // Format skills as an array
  const skillsArray = skills?.split(',').map(skill => skill.trim()).filter(Boolean) || [];
  
  return (
    <div className="resume-paper bg-white shadow-md mx-auto">
      {/* Header */}
      <div className="p-8 border-b-2 border-primary">
        <h1 className="text-3xl font-bold text-center">{personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-xl text-center text-gray-600 mt-1">{personalInfo.jobTitle || "Your Job Title"}</h2>
        
        {/* Contact Information */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
        
        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {experience.map(job => (
                <div key={job.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{job.location}</p>
                      <p className="text-sm text-gray-500">
                        {formatDateRange(job.startDate, job.endDate, job.current)}
                      </p>
                    </div>
                  </div>
                  {job.description && (
                    <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">
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
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">{edu.location}</p>
                      <p className="text-sm text-gray-500">
                        {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                      </p>
                    </div>
                  </div>
                  {edu.description && (
                    <p className="mt-1 text-sm text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {skillsArray.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    {project.url && (
                      <a 
                        href={project.url} 
                        className="text-sm text-primary hover:underline"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {project.url}
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
