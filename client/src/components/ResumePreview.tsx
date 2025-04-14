import { useResume } from "@/lib/resumeContext";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import PremiumTemplate from "./templates/PremiumTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";

export default function ResumePreview() {
  const { resumeData } = useResume();
  const { template } = resumeData;
  
  // Render the selected template
  switch (template) {
    case "classic":
      return <ClassicTemplate data={resumeData} />;
    case "modern":
      return <ModernTemplate data={resumeData} />;
    case "minimal":
      return <MinimalTemplate data={resumeData} />;
    case "premium":
      return <PremiumTemplate data={resumeData} />;
    case "executive":
      return <ExecutiveTemplate data={resumeData} />;
    default:
      return <ModernTemplate data={resumeData} />;
  }
}
