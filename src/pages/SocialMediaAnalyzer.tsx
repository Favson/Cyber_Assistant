import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Share2, Loader2, MapPin, Calendar, CreditCard, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Textarea } from '@/src/components/ui/Textarea';
import { Badge } from '@/src/components/ui/Badge';

type RiskLevel = 'Safe' | 'Warning' | 'Danger' | null;

interface AnalysisResult {
  risk: RiskLevel;
  issues: string[];
  alternative: string;
}

export function SocialMediaAnalyzer() {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let risk: RiskLevel = 'Safe';
      const issues: string[] = [];
      let alternative = 'Your post looks good to go! Just remember to check your privacy settings so only friends can see it.';

      // Mock logic for detecting sensitive info
      if (lowerInput.includes('school') || lowerInput.includes('at') || lowerInput.includes('live in') || lowerInput.includes('address')) {
        issues.push('Reveals your physical location');
        risk = 'Warning';
      }
      if (lowerInput.includes('vacation') || lowerInput.includes('away') || lowerInput.includes('leaving for')) {
        issues.push('Tells people your home might be empty');
        risk = 'Warning';
      }
      if (lowerInput.match(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/) || lowerInput.includes('card') || lowerInput.includes('bank')) {
        issues.push('Contains financial information');
        risk = 'Danger';
      }
      if (lowerInput.includes('phone') || lowerInput.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/)) {
        issues.push('Contains a phone number');
        risk = 'Danger';
      }
      if (lowerInput.includes('birthday') || lowerInput.includes('born')) {
        issues.push('Reveals your exact birth date (often used for security questions)');
        risk = 'Warning';
      }

      if (risk === 'Danger') {
        alternative = 'Please remove the sensitive numbers or financial details entirely before posting. Never share this information publicly.';
      } else if (risk === 'Warning') {
        if (issues[0].includes('location')) {
          alternative = 'Instead of saying exactly where you are right now, consider posting the photos *after* you have left the location.';
        } else if (issues[0].includes('vacation')) {
          alternative = 'Consider sharing your vacation photos after you return home, rather than announcing that you are currently away.';
        } else {
          alternative = 'Try to rephrase your post to remove the specific personal details.';
        }
      }

      setResult({ risk, issues, alternative });
      setIsAnalyzing(false);
    }, 1500);
  };

  const loadExample = () => {
    setInput("Having so much fun at XYZ High School right now! Can't wait for my birthday tomorrow (May 15th) 🎉");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-purple-100 text-purple-600 mb-2">
          <Share2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Social Media Safety</h1>
        <p className="text-slate-600">
          Before you hit "post", paste your text here. We'll check if you're accidentally sharing too much personal information.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <Textarea 
            placeholder="What's on your mind? Paste your draft post here..."
            className="min-h-[120px] text-base resize-y"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Button variant="outline" onClick={loadExample} className="w-full sm:w-auto">
              Try Example
            </Button>
            <Button 
              onClick={handleAnalyze} 
              disabled={!input.trim() || isAnalyzing}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Post'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className={`border-2 ${
            result.risk === 'Danger' ? 'border-red-200 bg-red-50/50' : 
            result.risk === 'Warning' ? 'border-amber-200 bg-amber-50/50' : 
            'border-emerald-200 bg-emerald-50/50'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Safety Analysis</CardTitle>
                <Badge variant={
                  result.risk === 'Danger' ? 'danger' : 
                  result.risk === 'Warning' ? 'warning' : 'success'
                } className="text-sm px-3 py-1">
                  {result.risk}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.issues.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">Why it might be unsafe:</h4>
                  <ul className="space-y-2">
                    {result.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <div className="mt-1 shrink-0">
                          {issue.includes('location') && <MapPin className="w-4 h-4 text-amber-500" />}
                          {issue.includes('birth') && <Calendar className="w-4 h-4 text-amber-500" />}
                          {issue.includes('financial') && <CreditCard className="w-4 h-4 text-red-500" />}
                          {(!issue.includes('location') && !issue.includes('birth') && !issue.includes('financial')) && <User className="w-4 h-4 text-amber-500" />}
                        </div>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-slate-700">We didn't detect any obvious sensitive information like locations, phone numbers, or financial details.</p>
              )}

              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-1">Safer Alternative:</h4>
                <p className="text-sm text-slate-600 italic">"{result.alternative}"</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
