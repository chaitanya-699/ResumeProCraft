import { useResume } from "@/lib/resumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SkillsForm() {
  const { resumeData, updateSkills } = useResume();
  
  const handleChange = (value: string) => {
    updateSkills(value);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
        <div>
          <Label htmlFor="skills" className="mb-1">Skills (comma separated)</Label>
          <Textarea
            id="skills"
            rows={3}
            placeholder="JavaScript, React, Node.js, etc."
            value={resumeData.skills}
            onChange={(e) => handleChange(e.target.value)}
          />
          <p className="mt-1 text-sm text-gray-500">
            List your skills in order of proficiency. Technical skills first, then soft skills.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
