import { useResume } from "@/lib/resumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

export default function ProjectsForm() {
  const { 
    resumeData, 
    addProject, 
    updateProject, 
    removeProject 
  } = useResume();
  const { projects = [] } = resumeData;
  
  const handleChange = (id: string, field: string, value: string) => {
    updateProject(id, { [field]: value });
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Projects (Optional)</h2>
          <Button 
            onClick={addProject} 
            size="sm"
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
        
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-item border border-gray-200 rounded-md p-4 mb-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-md font-medium">Project #{index + 1}</h3>
              <Button 
                onClick={() => removeProject(project.id)} 
                variant="ghost" 
                size="sm"
                className="text-red-500 h-auto p-1 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-1">Project Name</Label>
                <Input
                  placeholder="Project Name"
                  value={project.name}
                  onChange={(e) => handleChange(project.id, "name", e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-1">Project URL (Optional)</Label>
                <Input
                  placeholder="https://project-url.com"
                  value={project.url}
                  onChange={(e) => handleChange(project.id, "url", e.target.value)}
                />
              </div>
              
              <div className="sm:col-span-2">
                <Label className="mb-1">Description</Label>
                <Textarea
                  rows={3}
                  placeholder="Brief description of your project"
                  value={project.description}
                  onChange={(e) => handleChange(project.id, "description", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No projects added yet. Click "Add" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
