import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  FileText, 
  Download, 
  User, 
  CheckCircle, 
  Edit3, 
  Layout, 
  Award,
  Target,
  Users,
  ArrowRight
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Professional Resume Builder</h1>
          <Link href="/builder">
            <Button>
              Create Resume
              <FileText className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-4">Create a Professional Resume in Minutes</h2>
          <p className="text-xl mb-8 max-w-3xl">
            Build beautiful, job-winning resumes with our easy-to-use builder. Choose from professional templates and customize to match your unique style.
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="text-primary font-semibold">
              Get Started For Free
              <FileText className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Resume Builder?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Layout className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from modern, classic, or minimal designs - all professionally crafted to make your resume stand out.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Edit3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Customization</h3>
              <p className="text-gray-600">
                Simple editing tools let you personalize every detail of your resume to match your unique style and experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Download className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant PDF Download</h3>
              <p className="text-gray-600">
                Generate a perfectly formatted PDF resume with a single click - ready to share with employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Build Your Resume in 3 Easy Steps</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Choose a Template</h3>
              <p className="text-gray-600">
                Select from our professional templates designed to match your career and industry.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Fill in Your Details</h3>
              <p className="text-gray-600">
                Add your personal information, work experience, education, skills, and more.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Download and Share</h3>
              <p className="text-gray-600">
                Download your resume as a PDF, ready to share with potential employers.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/builder">
              <Button size="lg" className="font-semibold">
                Create Your Resume Now
                <FileText className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-lg">S</div>
                <div className="ml-3">
                  <h3 className="font-semibold">Sarah J.</h3>
                  <p className="text-sm text-gray-500">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "This resume builder helped me land my dream job! The templates are modern and professional, and the PDF download was perfect quality."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-lg">M</div>
                <div className="ml-3">
                  <h3 className="font-semibold">Michael T.</h3>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I tried several resume builders, but this one was by far the easiest to use. The real-time preview feature was a game-changer."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-lg">J</div>
                <div className="ml-3">
                  <h3 className="font-semibold">Jessica R.</h3>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The customization options are amazing! I was able to tailor my resume perfectly for my industry, and the layout was beautifully balanced."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise & Premium Features</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Take your resume to the next level with our advanced professional tools
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Premium Templates</h3>
              <p className="text-center opacity-90">
                Access exclusive, professionally designed templates that make your resume stand out from the competition.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Job Match Analysis</h3>
              <p className="text-center opacity-90">
                Analyze how well your resume matches specific job descriptions and get tailored recommendations to improve.
              </p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Team Collaboration</h3>
              <p className="text-center opacity-90">
                Collaborate with team members, career coaches, and HR professionals to perfect your resume.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="text-primary font-semibold">
                Try Enterprise Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Professional Resume Builder</h2>
            <p className="mb-4">Create beautiful, professional resumes in minutes.</p>
            <Link href="/builder">
              <Button variant="outline" className="text-white border-white hover:bg-gray-700">
                Start Building Your Resume
              </Button>
            </Link>
            <p className="mt-8 text-sm">© 2023 Professional Resume Builder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
