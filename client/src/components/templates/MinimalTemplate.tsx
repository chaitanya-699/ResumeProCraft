import { useResume } from "@/lib/resumeContext";
import { formatDateRange } from "@/lib/utils";

export default function MinimalTemplate() {
  const { resumeData } = useResume();
  const { personalInfo, summary, experience, education, skills, projects = [] } = resumeData;
  
  // Format skills as an array
  const skillsArray = skills?.split(',').map(skill => skill.trim()).filter(Boolean) || [];
  
  return (
    <div className="resume-paper bg-white shadow-md mx-auto p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-xl text-gray-600 mt-1">{personalInfo.jobTitle || "Your Job Title"}</p>
        
        {/* Contact Line */}
        <div className="flex flex-wrap justify-center gap-x-4 mt-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>
      
      {/* Divider */}
      <hr className="border-t border-primary w-1/4 mx-auto mb-6" />
      
      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <p className="text-center text-gray-700 max-w-3xl mx-auto">{summary}</p>
        </div>
      )}
      
      {/* Skills */}
      {skillsArray.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-center mb-3">Skills</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {skillsArray.map((skill, index) => (
              <span key={index} className="text-gray-700">
                {skill}{index < skillsArray.length - 1 ? " •" : ""}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-center mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map(job => (
              <div key={job.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{job.title}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDateRange(job.startDate, job.endDate, job.current)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600 mb-2">
                  <span>{job.company}</span>
                  <span className="text-sm">{job.location}</span>
                </div>
                {job.description && (
                  <div className="text-sm text-gray-700 whitespace-pre-line">
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
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-center mb-4">Education</h2>
          <div className="space-y-6">
            {education.map(edu => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-600 mb-2">
                  <span>{edu.institution}</span>
                  <span className="text-sm">{edu.location}</span>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-center mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold">{project.name}</h3>
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
                  <p className="text-sm text-gray-700 whitespace-pre-line">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
