import { useResume } from "@/lib/resumeContext";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

export default function ResumePreview() {
  const { resumeData } = useResume();
  const { template } = resumeData;
  
  // Render the selected template
  switch (template) {
    case "classic":
      return <ClassicTemplate />;
    case "modern":
      return <ModernTemplate />;
    case "minimal":
      return <MinimalTemplate />;
    default:
      return <ModernTemplate />;
  }
}
