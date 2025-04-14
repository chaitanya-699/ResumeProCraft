import { useResume } from "@/lib/resumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SummaryForm() {
  const { resumeData, updateSummary } = useResume();
  
  const handleChange = (value: string) => {
    updateSummary(value);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Professional Summary</h2>
        <div>
          <Label htmlFor="summary" className="mb-1">Summary</Label>
          <Textarea
            id="summary"
            placeholder="Write a 2-4 sentence summary of your professional background and key strengths"
            rows={4}
            value={resumeData.summary}
            onChange={(e) => handleChange(e.target.value)}
            className="resize-none"
          />
          <p className="mt-1 text-sm text-gray-500">
            Concise overview of your professional background, expertise, and key strengths.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
