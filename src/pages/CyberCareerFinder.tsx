import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Loader2, Code, Puzzle, Search, PenTool, MessageSquare, Brain, Lightbulb, Eye, Network, Users, Database, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';

type QuestionStep = 0 | 1 | 2;

interface CareerRecommendation {
  title: string;
  explanation: string;
  steps: string[];
  motivation: string;
  icon: React.ReactNode;
}

export function CyberCareerFinder() {
  const [step, setStep] = useState<QuestionStep>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<CareerRecommendation[] | null>(null);

  const questions = [
    {
      title: "What do you enjoy most?",
      options: [
        { id: 'coding', label: 'Coding & Building', icon: <Code className="w-5 h-5" /> },
        { id: 'puzzles', label: 'Solving Puzzles', icon: <Puzzle className="w-5 h-5" /> },
        { id: 'investigating', label: 'Investigating', icon: <Search className="w-5 h-5" /> },
        { id: 'designing', label: 'Designing Systems', icon: <PenTool className="w-5 h-5" /> },
        { id: 'communication', label: 'Communication', icon: <MessageSquare className="w-5 h-5" /> },
      ]
    },
    {
      title: "How would you describe yourself?",
      options: [
        { id: 'logical', label: 'Logical & Analytical', icon: <Brain className="w-5 h-5" /> },
        { id: 'creative', label: 'Creative & Out-of-the-box', icon: <Lightbulb className="w-5 h-5" /> },
        { id: 'curious', label: 'Curious & Inquisitive', icon: <Eye className="w-5 h-5" /> },
        { id: 'detail', label: 'Detail-oriented', icon: <Search className="w-5 h-5" /> },
      ]
    },
    {
      title: "What do you prefer working with?",
      options: [
        { id: 'systems', label: 'Networks & Systems', icon: <Network className="w-5 h-5" /> },
        { id: 'people', label: 'People & Teams', icon: <Users className="w-5 h-5" /> },
        { id: 'data', label: 'Data & Logs', icon: <Database className="w-5 h-5" /> },
        { id: 'tools', label: 'Security Tools', icon: <Shield className="w-5 h-5" /> },
      ]
    }
  ];

  const handleAnswer = (answerId: string) => {
    const newAnswers = [...answers, answerId];
    setAnswers(newAnswers);

    if (step < 2) {
      setStep((prev) => (prev + 1) as QuestionStep);
    } else {
      analyzeCareers(newAnswers);
    }
  };

  const analyzeCareers = (finalAnswers: string[]) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const recs: CareerRecommendation[] = [];

      // Simple logic to map answers to careers
      if (finalAnswers.includes('puzzles') || finalAnswers.includes('creative') || finalAnswers.includes('coding')) {
        recs.push({
          title: 'Ethical Hacker (Penetration Tester)',
          explanation: 'You enjoy problem-solving and thinking outside the box. Ethical hackers use these skills to find weaknesses before the bad guys do!',
          steps: [
            'Learn basic networking (how computers talk to each other)',
            'Understand Linux basics',
            'Play beginner hacking games like TryHackMe',
            'Learn basic web technologies (HTML, JS)'
          ],
          motivation: 'Your curiosity is your superpower. Keep exploring and breaking things (legally)!',
          icon: <Shield className="w-6 h-6 text-red-500" />
        });
      }

      if (finalAnswers.includes('investigating') || finalAnswers.includes('detail') || finalAnswers.includes('data')) {
        recs.push({
          title: 'Digital Forensics Investigator',
          explanation: 'You have a great eye for detail and love getting to the bottom of things. Investigators analyze data to figure out exactly how a cyber attack happened.',
          steps: [
            'Learn how operating systems store files',
            'Understand basic computer hardware',
            'Study how to safely copy and preserve data',
            'Familiarize yourself with basic forensic tools'
          ],
          motivation: 'Every piece of data tells a story. You have the mindset to uncover it!',
          icon: <Search className="w-6 h-6 text-blue-500" />
        });
      }

      if (finalAnswers.includes('communication') || finalAnswers.includes('people')) {
        recs.push({
          title: 'Cybersecurity Awareness Specialist',
          explanation: 'You enjoy working with people and communicating ideas. This role focuses on teaching employees how to stay safe and recognize threats like phishing.',
          steps: [
            'Learn common cyber threats (phishing, malware)',
            'Practice explaining technical concepts simply',
            'Create simple guides or presentations',
            'Understand basic human psychology in security'
          ],
          motivation: 'People are the first line of defense, and you can be the one to empower them!',
          icon: <Users className="w-6 h-6 text-emerald-500" />
        });
      }

      if (recs.length === 0 || finalAnswers.includes('systems') || finalAnswers.includes('logical')) {
        recs.push({
          title: 'Security Operations Center (SOC) Analyst',
          explanation: 'You are logical and like working with systems. SOC Analysts are the frontline defenders who monitor networks for suspicious activity.',
          steps: [
            'Learn basic networking concepts (IP addresses, ports)',
            'Understand what normal computer traffic looks like',
            'Familiarize yourself with security monitoring tools',
            'Learn how to read basic system logs'
          ],
          motivation: 'You are the digital guardian. Your logical mind is perfect for spotting anomalies!',
          icon: <Network className="w-6 h-6 text-purple-500" />
        });
      }

      // Ensure we only show top 2-3
      setRecommendations(recs.slice(0, 2));
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setRecommendations(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-100 text-blue-600 mb-2">
          <Briefcase className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Cyber Career Finder</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Not sure where to start in cybersecurity? Answer a few simple questions about your interests, and we'll recommend the best beginner-friendly career paths for you.
        </p>
      </div>

      {!recommendations && !isAnalyzing && (
        <Card className="max-w-2xl mx-auto overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-500">Question {step + 1} of 3</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`h-2 w-8 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-slate-200'}`} 
                />
              ))}
            </div>
          </div>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
              {questions[step].title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step].options.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="h-auto py-4 px-6 flex flex-col items-center gap-3 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  onClick={() => handleAnswer(option.id)}
                >
                  <div className="p-3 rounded-full bg-slate-100 text-slate-600">
                    {option.icon}
                  </div>
                  <span className="font-medium text-slate-900">{option.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <h3 className="text-xl font-medium text-slate-900">Analyzing your profile...</h3>
            <p className="text-slate-500">Finding the perfect cybersecurity roles for you.</p>
          </CardContent>
        </Card>
      )}

      {recommendations && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="text-center">
            <Badge variant="success" className="mb-4 text-sm px-4 py-1">Analysis Complete</Badge>
            <h2 className="text-2xl font-bold text-slate-900">Your Recommended Career Paths</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec, idx) => (
              <Card key={idx} className="flex flex-col h-full border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                      {rec.icon}
                    </div>
                    <CardTitle className="text-xl leading-tight">{rec.title}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-700 text-base mt-4">
                    {rec.explanation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Beginner Steps to Start:
                  </h4>
                  <ul className="space-y-3 mb-6 flex-1">
                    {rec.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-auto">
                    <p className="text-sm font-medium text-blue-800 italic">
                      "{rec.motivation}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={resetQuiz} variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Retake Quiz
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
