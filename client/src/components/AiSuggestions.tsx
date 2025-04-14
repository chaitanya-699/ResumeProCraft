import { useState } from "react";
import { useResume } from "@/lib/resumeContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Edit, Check, Loader2 } from "lucide-react";

// Mock suggestions for demonstration (in a real app, these would come from an API)
const mockSuggestions = {
  summary: [
    "Start with a powerful action verb to capture attention.",
    "Quantify your achievements with numbers and percentages when possible.",
    "Keep your summary concise (3-5 sentences) and focused on relevant skills.",
    "Tailor your summary to match the specific job description you're applying for."
  ],
  experience: [
    "Use bullet points to make your experience easy to scan.",
    "Focus on achievements rather than just responsibilities.",
    "Include metrics and specific results to demonstrate your impact.",
    "Use present tense for current roles and past tense for previous positions."
  ],
  skills: [
    "List technical skills first, followed by soft skills.",
    "Remove outdated skills that aren't relevant to your target position.",
    "Consider organizing skills into categories for better readability.",
    "Include skill level indicators for technical skills (e.g., proficient, experienced)."
  ]
};

export default function AiSuggestions() {
  const { resumeData } = useResume();
  const [activeSuggestionType, setActiveSuggestionType] = useState<"summary" | "experience" | "skills">("summary");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Function to simulate AI suggestions generation
  const generateSuggestions = () => {
    setIsGenerating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1500);
  };
  
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg text-primary">
          <Lightbulb className="mr-2 h-5 w-5" />
          AI Resume Assistant
        </CardTitle>
        <CardDescription>
          Get AI-powered suggestions to improve your resume and stand out to employers
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!hasGenerated ? (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-center text-gray-600 mb-4">
              Our AI can analyze your resume and provide personalized suggestions to make it more effective.
            </p>
            <Button 
              onClick={generateSuggestions} 
              disabled={isGenerating} 
              className="bg-gradient-to-r from-blue-600 to-indigo-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate Suggestions
                </>
              )}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="summary" onValueChange={(value) => setActiveSuggestionType(value as any)}>
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-0">
              <div className="space-y-3">
                {mockSuggestions.summary.map((suggestion, index) => (
                  <SuggestionItem key={index} text={suggestion} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-0">
              <div className="space-y-3">
                {mockSuggestions.experience.map((suggestion, index) => (
                  <SuggestionItem key={index} text={suggestion} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="mt-0">
              <div className="space-y-3">
                {mockSuggestions.skills.map((suggestion, index) => (
                  <SuggestionItem key={index} text={suggestion} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}

// Individual suggestion item component
function SuggestionItem({ text }: { text: string }) {
  const [isApplied, setIsApplied] = useState(false);
  
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
      <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
      <div className="flex-grow">
        <p className="text-sm text-gray-700">{text}</p>
      </div>
      <Button 
        variant={isApplied ? "outline" : "default"} 
        size="sm" 
        onClick={() => setIsApplied(!isApplied)}
        className="flex-shrink-0"
      >
        {isApplied ? (
          <>
            <Check className="mr-1 h-3 w-3" />
            Applied
          </>
        ) : (
          <>
            <Edit className="mr-1 h-3 w-3" />
            Apply
          </>
        )}
      </Button>
    </div>
  );
} 