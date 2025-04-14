import { useResume } from "@/lib/resumeContext";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export default function TemplateSelector() {
  const { resumeData, updateTemplate } = useResume();
  const selectedTemplate = resumeData.template;
  
  const templates = [
    { id: "classic", name: "Classic" },
    { id: "modern", name: "Modern" },
    { id: "minimal", name: "Minimal" },
  ] as const;
  
  const handleTemplateChange = (templateId: "classic" | "modern" | "minimal") => {
    updateTemplate(templateId);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose a Template</h2>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={cn(
                "template-card cursor-pointer border-2 rounded-md overflow-hidden hover:border-primary transition-colors duration-200",
                selectedTemplate === template.id ? "border-primary" : "border-gray-200"
              )}
              onClick={() => handleTemplateChange(template.id)}
            >
              {template.id === "classic" && (
                <div className="h-24 bg-gray-100 flex items-center justify-center">
                  <div className="w-16 h-20 bg-white shadow-sm flex flex-col">
                    <div className="h-4 bg-primary"></div>
                    <div className="flex-grow p-1">
                      <div className="w-full h-1 bg-gray-300 mb-1"></div>
                      <div className="w-3/4 h-1 bg-gray-300 mb-1"></div>
                      <div className="w-full h-1 bg-gray-300 mb-1"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {template.id === "modern" && (
                <div className="h-24 bg-gray-100 flex items-center justify-center">
                  <div className="w-16 h-20 bg-white shadow-sm flex">
                    <div className="w-1/3 bg-primary"></div>
                    <div className="w-2/3 p-1">
                      <div className="w-full h-1 bg-gray-300 mb-1"></div>
                      <div className="w-3/4 h-1 bg-gray-300 mb-1"></div>
                      <div className="w-full h-1 bg-gray-300 mb-1"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {template.id === "minimal" && (
                <div className="h-24 bg-gray-100 flex items-center justify-center">
                  <div className="w-16 h-20 bg-white shadow-sm flex flex-col p-1">
                    <div className="h-3 flex items-center justify-center">
                      <div className="w-8 h-1 bg-primary"></div>
                    </div>
                    <div className="flex-grow">
                      <div className="w-full h-1 bg-gray-300 mb-1"></div>
                      <div className="w-3/4 h-1 bg-gray-300 mb-1"></div>
                      <div className="w-full h-1 bg-gray-300 mb-1"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-2 text-center text-sm font-medium bg-gray-50">
                {template.name}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
