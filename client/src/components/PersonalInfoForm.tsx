import { useResume } from "@/lib/resumeContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;
  
  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    updatePersonalInfo({ [field]: value });
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="mb-1">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              value={personalInfo.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="jobTitle" className="mb-1">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="Software Engineer"
              value={personalInfo.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="mb-1">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={personalInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="mb-1">Phone</Label>
            <Input
              id="phone"
              placeholder="(123) 456-7890"
              value={personalInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          
          <div className="sm:col-span-2">
            <Label htmlFor="address" className="mb-1">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St, City, Country"
              value={personalInfo.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="linkedin" className="mb-1">LinkedIn</Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/johndoe"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="website" className="mb-1">Website (Optional)</Label>
            <Input
              id="website"
              placeholder="johndoe.com"
              value={personalInfo.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
