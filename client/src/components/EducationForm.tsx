import { useResume } from "@/lib/resumeContext";
import { formatDescription } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";

export default function EducationForm() {
  const { 
    resumeData, 
    addEducation, 
    updateEducation, 
    removeEducation 
  } = useResume();
  const { education } = resumeData;
  
  const handleChange = (id: string, field: string, value: string | boolean) => {
    // If this is a description field, format it with bullet points
    if (field === "description" && typeof value === "string") {
      value = formatDescription(value);
    }
    updateEducation(id, { [field]: value });
  };
  
  const handleCurrentEducation = (id: string, checked: boolean) => {
    if (checked) {
      updateEducation(id, { current: true, endDate: "" });
    } else {
      updateEducation(id, { current: false });
    }
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Education</h2>
          <Button 
            onClick={addEducation} 
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        {education.map((edu, index) => (
          <div 
            key={edu.id} 
            className="education-item border border-gray-200 rounded-md p-4 mb-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-md font-medium">Education #{index + 1}</h3>
              <Button 
                onClick={() => removeEducation(edu.id)} 
                variant="ghost" 
                size="sm"
                className="text-red-500 h-auto p-1 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Institution</Label>
                <Input
                  placeholder="University Name"
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, "institution", e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-1">Degree</Label>
                <Input
                  placeholder="Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-1">Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, "startDate", e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-1">End Date</Label>
                <div className="flex items-center">
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => handleChange(edu.id, "endDate", e.target.value)}
                    disabled={edu.current}
                  />
                  <div className="ml-2 flex items-center">
                    <Checkbox
                      id={`current-edu-${edu.id}`}
                      checked={edu.current}
                      onCheckedChange={(checked) => handleCurrentEducation(edu.id, checked as boolean)}
                    />
                    <Label 
                      htmlFor={`current-edu-${edu.id}`} 
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
                  value={edu.location}
                  onChange={(e) => handleChange(edu.id, "location", e.target.value)}
                />
              </div>
              
              <div className="sm:col-span-2">
                <Label className="mb-1">Description (Optional)</Label>
                <Textarea
                  rows={2}
                  placeholder="Relevant coursework, achievements, etc."
                  value={edu.description}
                  onChange={(e) => handleChange(edu.id, "description", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        
        {education.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No education added yet. Click "Add" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
