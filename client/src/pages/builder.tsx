import { useState, useRef } from "react";
import { Link } from "wouter";
import { useResume } from "@/lib/resumeContext";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Download, 
  Save 
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TemplateSelector from "@/components/TemplateSelector";
import PersonalInfoForm from "@/components/PersonalInfoForm";
import SummaryForm from "@/components/SummaryForm";
import ExperienceForm from "@/components/ExperienceForm";
import EducationForm from "@/components/EducationForm";
import SkillsForm from "@/components/SkillsForm";
import ProjectsForm from "@/components/ProjectsForm";
import ResumePreview from "@/components/ResumePreview";
import { generatePdf } from "@/lib/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

export default function Builder() {
  const { 
    resumeData, 
    isLoading, 
    saveResume, 
    resetResume 
  } = useResume();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("My Resume");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Using 1 as a default user ID since we don't have authentication in this app
      await saveResume(resumeTitle, 1);
      setSaveDialogOpen(false);
    } catch (error) {
      console.error("Failed to save resume:", error);
      toast({
        variant: "destructive",
        title: "Failed to save resume",
        description: "An error occurred while saving your resume. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDownload = async () => {
    if (!resumePreviewRef.current) {
      toast({
        variant: "destructive",
        title: "Could not generate PDF",
        description: "The resume preview is not available.",
      });
      return;
    }
    
    try {
      setIsDownloading(true);
      await generatePdf(resumePreviewRef.current, resumeData);
      toast({
        title: "PDF Generated",
        description: "Your resume has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast({
        variant: "destructive",
        title: "Failed to generate PDF",
        description: "An error occurred while generating your PDF. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleReset = () => {
    resetResume();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Professional Resume Builder</h1>
          </div>
          <div className="flex space-x-3">
            <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={isSaving || isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Save Your Resume</AlertDialogTitle>
                  <AlertDialogDescription>
                    Give your resume a title so you can find it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="py-4">
                  <Label htmlFor="resume-title" className="text-right">
                    Resume Title
                  </Label>
                  <Input
                    id="resume-title"
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Resume"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button onClick={handleDownload} disabled={isDownloading || isLoading}>
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <TemplateSelector />
          <PersonalInfoForm />
          <SummaryForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />
          <ProjectsForm />
          
          <div className="flex justify-between items-center bg-white rounded-lg shadow p-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Reset Resume</h2>
              <p className="text-sm text-gray-500">Clear all data and start over</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Reset</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will reset all your resume data. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>Reset Resume</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-6 lg:self-start">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Live Preview</h2>
            <p className="text-sm text-gray-500 mb-4">This is how your resume will look when downloaded.</p>
            <div className="overflow-auto no-scrollbar max-h-[800px]">
              <div ref={resumePreviewRef} className="bg-white mx-auto scale-[0.7] origin-top">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
