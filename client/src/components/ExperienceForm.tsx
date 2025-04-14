import { useResume } from "@/lib/resumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";

export default function ExperienceForm() {
  const { 
    resumeData, 
    addExperience, 
    updateExperience, 
    removeExperience 
  } = useResume();
  const { experience } = resumeData;
  
  const handleChange = (id: string, field: string, value: string | boolean) => {
    updateExperience(id, { [field]: value });
  };
  
  const handleCurrentJob = (id: string, checked: boolean) => {
    if (checked) {
      updateExperience(id, { current: true, endDate: "" });
    } else {
      updateExperience(id, { current: false });
    }
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Work Experience</h2>
          <Button 
            onClick={addExperience} 
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        {experience.map((job, index) => (
          <div 
            key={job.id} 
            className="experience-item border border-gray-200 rounded-md p-4 mb-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-md font-medium">Experience #{index + 1}</h3>
              <Button 
                onClick={() => removeExperience(job.id)} 
                variant="ghost" 
                size="sm"
                className="text-red-500 h-auto p-1 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Company</Label>
                <Input
                  placeholder="Company Name"
                  value={job.company}
                  onChange={(e) => handleChange(job.id, "company", e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-1">Job Title</Label>
                <Input
                  placeholder="Job Title"
                  value={job.title}
                  onChange={(e) => handleChange(job.id, "title", e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-1">Start Date</Label>
                <Input
                  type="month"
                  value={job.startDate}
                  onChange={(e) => handleChange(job.id, "startDate", e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-1">End Date</Label>
                <div className="flex items-center">
                  <Input
                    type="month"
                    value={job.endDate}
                    onChange={(e) => handleChange(job.id, "endDate", e.target.value)}
                    disabled={job.current}
                  />
                  <div className="ml-2 flex items-center">
                    <Checkbox
                      id={`current-job-${job.id}`}
                      checked={job.current}
                      onCheckedChange={(checked) => handleCurrentJob(job.id, checked as boolean)}
                    />
                    <Label 
                      htmlFor={`current-job-${job.id}`} 
                      className="ml-2 text-sm text-gray-700"
                    >
                      Current
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <Label className="mb-1">Location</Label>
                <Input
                  placeholder="City, Country"
                  value={job.location}
                  onChange={(e) => handleChange(job.id, "location", e.target.value)}
                />
              </div>
              
              <div className="sm:col-span-2">
                <Label className="mb-1">Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Describe your responsibilities and achievements"
                  value={job.description}
                  onChange={(e) => handleChange(job.id, "description", e.target.value)}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Use bullet points (•) for better readability
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {experience.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No work experience added yet. Click "Add" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
