import { useResume } from "@/lib/resumeContext";
import { formatDateRange } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export default function ModernTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects = [] } = resumeData;
  
  // Format skills as an array
  const skillsArray = skills?.split(',').map(skill => skill.trim()).filter(Boolean) || [];
  
  return (
    <div className="resume-paper bg-white shadow-md mx-auto">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-primary text-white p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium">
              {personalInfo.jobTitle || "Your Job Title"}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b border-white pb-1 mb-3">Contact</h2>
            <div className="text-sm space-y-2">
              {personalInfo.email && (
                <p className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{personalInfo.email}</span>
                </p>
              )}
              
              {personalInfo.phone && (
                <p className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{personalInfo.phone}</span>
                </p>
              )}
              
              {personalInfo.address && (
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{personalInfo.address}</span>
                </p>
              )}
              
              {personalInfo.linkedin && (
                <p className="flex items-start">
                  <Linkedin className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{personalInfo.linkedin}</span>
                </p>
              )}
              
              {personalInfo.website && (
                <p className="flex items-start">
                  <Globe className="h-4 w-4 mr-2 mt-0.5" />
                  <span>{personalInfo.website}</span>
                </p>
              )}
            </div>
          </div>
          
          {/* Skills */}
          {skillsArray.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b border-white pb-1 mb-3">Skills</h2>
              <div className="text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  {skillsArray.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b border-white pb-1 mb-3">Education</h2>
              <div className="text-sm space-y-4">
                {education.map(edu => (
                  <div key={edu.id} className="mb-4">
                    <p className="font-semibold">{edu.degree}</p>
                    <p>{edu.institution}</p>
                    <p>{edu.location}</p>
                    <p className="text-sm">
                      {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    </p>
                    {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Content */}
        <div className="w-2/3 p-6">
          {/* Summary */}
          {summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-primary border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
              <p className="text-sm text-gray-700">{summary}</p>
            </div>
          )}
          
          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-primary border-b border-gray-300 pb-1 mb-3">Work Experience</h2>
              <div className="space-y-4">
                {experience.map(job => (
                  <div key={job.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{job.title}</p>
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
                      <div className="mt-2 text-sm text-gray-700">
                        <div className="whitespace-pre-line">{job.description}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-primary border-b border-gray-300 pb-1 mb-3">Projects</h2>
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-gray-800">{project.name}</p>
                      {project.url && (
                        <p className="text-sm text-gray-500 italic">
                          <a 
                            href={project.url} 
                            className="text-primary hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {project.url}
                          </a>
                        </p>
                      )}
                    </div>
                    {project.description && (
                      <div className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                        {project.description}
                      </div>
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
