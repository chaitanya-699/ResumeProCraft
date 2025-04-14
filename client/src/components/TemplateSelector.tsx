import { useResume } from "@/lib/resumeContext";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TemplateSelector() {
  const { resumeData, updateTemplate } = useResume();
  const selectedTemplate = resumeData.template;
  
  const templates = [
    { id: "classic", name: "Classic", free: true },
    { id: "modern", name: "Modern", free: true },
    { id: "minimal", name: "Minimal", free: true },
    { id: "premium", name: "Premium", free: false },
    { id: "executive", name: "Executive", free: false },
  ] as const;
  
  const handleTemplateChange = (templateId: "classic" | "modern" | "minimal" | "premium" | "executive") => {
    updateTemplate(templateId);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose a Template</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={cn(
                "template-card relative cursor-pointer border-2 rounded-md overflow-hidden hover:border-primary transition-colors duration-200",
                selectedTemplate === template.id ? "border-primary" : "border-gray-200"
              )}
              onClick={() => handleTemplateChange(template.id)}
            >
              {!template.free && (
                <Badge 
                  className="absolute top-2 right-2 z-10 bg-gradient-to-r from-blue-500 to-indigo-600" 
                  variant="secondary"
                >
                  Premium
                </Badge>
              )}
              
              {template.id === "classic" && (
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <div className="w-20 h-24 bg-white shadow-sm flex flex-col">
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
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <div className="w-20 h-24 bg-white shadow-sm flex">
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
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <div className="w-20 h-24 bg-white shadow-sm flex flex-col p-1">
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
              
              {template.id === "premium" && (
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <div className="w-20 h-24 bg-white shadow-md flex flex-col">
                    <div className="h-8 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">
                      <div className="w-12 h-1 bg-white opacity-80"></div>
                    </div>
                    <div className="flex-grow p-1 flex">
                      <div className="w-[70%] pr-1">
                        <div className="w-full h-1 bg-gray-300 mb-1"></div>
                        <div className="w-3/4 h-1 bg-gray-300 mb-1"></div>
                      </div>
                      <div className="w-[30%] bg-gray-50">
                        <div className="w-full h-1 bg-blue-200 mt-1 mx-auto"></div>
                        <div className="w-full h-1 bg-blue-200 mt-1 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {template.id === "executive" && (
                <div className="h-32 bg-gray-100 flex items-center justify-center">
                  <div className="w-20 h-24 bg-white shadow-md relative">
                    <div className="absolute top-0 left-0 bottom-0 w-1/5 bg-gray-900"></div>
                    <div className="ml-[25%] w-[75%] p-1">
                      <div className="w-full h-4 border-b border-gray-400 mb-1">
                        <div className="w-3/4 h-1 bg-gray-800 mt-1"></div>
                      </div>
                      <div className="flex gap-1 items-center mb-1">
                        <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                        <div className="w-8 h-[2px] bg-gray-300"></div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="w-1 h-1 rounded-full bg-gray-800"></div>
                        <div className="w-6 h-[2px] bg-gray-300"></div>
                      </div>
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
