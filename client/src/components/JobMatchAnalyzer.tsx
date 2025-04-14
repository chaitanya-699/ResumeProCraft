import { useState } from "react";
import { useResume } from "@/lib/resumeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, Loader2, AlertCircle, CheckCircle2, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function JobMatchAnalyzer() {
  const { resumeData } = useResume();
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResults | null>(null);
  
  const analyzeMatch = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // In a real app, this would be an API call to a backend service
    // For this demo, we'll use a timeout and mock data
    setTimeout(() => {
      const mockResults: MatchResults = generateMockAnalysis(resumeData, jobDescription);
      setMatchResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg text-primary">
          <Target className="mr-2 h-5 w-5" />
          Job Match Analyzer
        </CardTitle>
        <CardDescription>
          Paste a job description to see how well your resume matches the requirements
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!matchResults ? (
          <div className="space-y-4">
            <Textarea 
              placeholder="Paste the job description here..." 
              className="h-32 resize-none"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <Button 
              onClick={analyzeMatch} 
              disabled={isAnalyzing || !jobDescription.trim()} 
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Analyze Match
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Overall Match Score</h3>
                <span className="text-sm font-semibold">{matchResults.overallScore}%</span>
              </div>
              <Progress value={matchResults.overallScore} className="h-3" />
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Key Skills Analysis</h3>
                <div className="grid grid-cols-2 gap-2">
                  {matchResults.skills.map((skill, index) => (
                    <SkillMatchItem key={index} skill={skill} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Missing Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {matchResults.missingKeywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-red-600 border-red-300 bg-red-50">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Improvement Suggestions</h3>
                <ScrollArea className="h-[200px] rounded-md border p-3">
                  <ul className="space-y-2">
                    {matchResults.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm flex items-start gap-2 pb-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </div>
            
            <Button variant="outline" onClick={() => setMatchResults(null)}>
              Analyze Another Job
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SkillMatchItem({ skill }: { skill: SkillMatch }) {
  return (
    <div className={`p-2 rounded-md flex items-center gap-2 ${
      skill.found ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'
    }`}>
      {skill.found ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <AlertCircle className="h-4 w-4 text-gray-400" />
      )}
      <span className="text-xs font-medium truncate">{skill.name}</span>
    </div>
  );
}

// Types
interface SkillMatch {
  name: string;
  found: boolean;
}

interface MatchResults {
  overallScore: number;
  skills: SkillMatch[];
  missingKeywords: string[];
  suggestions: string[];
}

// Mock analysis generator
function generateMockAnalysis(resumeData: any, jobDescription: string): MatchResults {
  const skills = resumeData.skills.toLowerCase().split(',').map((s: string) => s.trim());
  const jobDescLower = jobDescription.toLowerCase();
  
  // Extract some keywords from the job description
  const commonKeywords = ['experience', 'years', 'team', 'development', 'management', 
    'project', 'skills', 'knowledge', 'degree', 'bachelor', 'master', 'phd', 
    'leadership', 'communication', 'collaboration', 'analysis', 'data', 'research'];
  
  const extractedKeywords = commonKeywords
    .filter(word => jobDescLower.includes(word))
    .slice(0, 8);
  
  // Generate a random score between 65-95
  const score = Math.floor(Math.random() * 31) + 65;
  
  // Generate skill matches (some real from resume, some random)
  const techSkills = [
    'javascript', 'react', 'node.js', 'python', 'java', 'sql', 'html', 'css', 
    'aws', 'docker', 'kubernetes', 'agile', 'scrum', 'git', 'ci/cd', 'testing'
  ];
  
  const skillMatches: SkillMatch[] = [
    ...skills.slice(0, 4).map((skill: string) => ({ name: skill, found: true })),
    ...techSkills
      .filter(skill => !skills.includes(skill))
      .slice(0, 4)
      .map(skill => ({ 
        name: skill, 
        found: Math.random() > 0.5
      }))
  ];
  
  // Generate missing keywords
  const missingKeywords = [
    ...techSkills
      .filter(skill => !skills.includes(skill) && Math.random() > 0.7)
      .slice(0, 3),
    ...extractedKeywords
      .filter(keyword => !jobDescLower.includes(keyword.toLowerCase()))
      .slice(0, 2)
  ];
  
  // Generate suggestions
  const suggestions = [
    "Add more specific technical skills that match the job requirements.",
    `Highlight your experience with ${techSkills[Math.floor(Math.random() * techSkills.length)]} more prominently.`,
    "Quantify your achievements with specific metrics and results.",
    "Use more industry-specific keywords throughout your resume.",
    "Customize your summary to directly address the company's needs mentioned in the job description.",
    "Consider adding a separate section for certifications or relevant projects.",
    "Use more action verbs to describe your experience and accomplishments."
  ];
  
  return {
    overallScore: score,
    skills: skillMatches,
    missingKeywords: missingKeywords,
    suggestions: suggestions
  };
}