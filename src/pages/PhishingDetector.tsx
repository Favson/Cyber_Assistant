import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ShieldAlert, ShieldCheck, AlertTriangle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Textarea } from '@/src/components/ui/Textarea';
import { Badge } from '@/src/components/ui/Badge';

type RiskLevel = 'Low' | 'Medium' | 'High' | null;

interface AnalysisResult {
  risk: RiskLevel;
  explanation: string;
  patterns: string[];
}

export function PhishingDetector() {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Mock AI analysis logic
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let risk: RiskLevel = 'Low';
      let explanation = 'This message looks relatively safe, but always verify the sender if it asks for personal info.';
      const patterns: string[] = [];

      if (lowerInput.includes('won') || lowerInput.includes('prize') || lowerInput.includes('₦') || lowerInput.includes('$')) {
        patterns.push('Suspicious reward or money mentioned');
        risk = 'High';
      }
      if (lowerInput.includes('urgent') || lowerInput.includes('immediately') || lowerInput.includes('now')) {
        patterns.push('Creates a false sense of urgency');
        risk = risk === 'Low' ? 'Medium' : 'High';
      }
      if (lowerInput.includes('click here') || lowerInput.includes('http')) {
        patterns.push('Contains links that might be malicious');
        risk = risk === 'Low' ? 'Medium' : risk;
      }
      if (lowerInput.includes('password') || lowerInput.includes('account') || lowerInput.includes('verify')) {
        patterns.push('Asks for account verification or sensitive data');
        risk = 'High';
      }

      if (risk === 'High') {
        explanation = 'This message has strong signs of being a phishing scam. Do not click any links or provide personal information.';
      } else if (risk === 'Medium') {
        explanation = 'This message has some suspicious elements. Be cautious and verify the sender through official channels before proceeding.';
      }

      setResult({ risk, explanation, patterns });
      setIsAnalyzing(false);
    }, 1500);
  };

  const loadExample = () => {
    setInput("URGENT: Your account has been compromised! You've won ₦50,000 as compensation. Click here now to claim your prize and verify your password.");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-100 text-blue-600 mb-2">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Phishing Detector</h1>
        <p className="text-slate-600">
          Paste an email, text message, or DM below. We'll analyze it to see if it's a scam trying to steal your information.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <Textarea 
            placeholder="Paste the suspicious message here..."
            className="min-h-[150px] text-base resize-y"
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
              className="w-full sm:w-auto"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Message'
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
            result.risk === 'High' ? 'border-red-200 bg-red-50/50' : 
            result.risk === 'Medium' ? 'border-amber-200 bg-amber-50/50' : 
            'border-emerald-200 bg-emerald-50/50'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {result.risk === 'High' && <ShieldAlert className="w-6 h-6 text-red-600" />}
                  {result.risk === 'Medium' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                  {result.risk === 'Low' && <ShieldCheck className="w-6 h-6 text-emerald-600" />}
                  Analysis Result
                </CardTitle>
                <Badge variant={
                  result.risk === 'High' ? 'danger' : 
                  result.risk === 'Medium' ? 'warning' : 'success'
                } className="text-sm px-3 py-1">
                  {result.risk} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700 font-medium">{result.explanation}</p>
              
              {result.patterns.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Suspicious Patterns Found:</h4>
                  <ul className="space-y-2">
                    {result.patterns.map((pattern, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 bg-white/60 p-2 rounded-lg border border-slate-200/60">
                        <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <span>{pattern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 p-4 bg-white rounded-xl border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-1">What should I do?</h4>
                <p className="text-sm text-slate-600">
                  {result.risk === 'High' ? "Do not reply, click any links, or download attachments. Delete the message immediately." :
                   result.risk === 'Medium' ? "Do not click links. If it claims to be from a company you know, contact them directly using their official website or phone number." :
                   "Even if it looks safe, never share your passwords or sensitive personal information over email or text."}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
