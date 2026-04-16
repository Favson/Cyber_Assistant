import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Key, CheckCircle2, XCircle, Info, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';

type StrengthLevel = 'Weak' | 'Medium' | 'Strong' | '';

export function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<StrengthLevel>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [crackTime, setCrackTime] = useState('');

  useEffect(() => {
    if (!password) {
      setStrength('');
      setSuggestions([]);
      setCrackTime('');
      return;
    }

    let score = 0;
    const newSuggestions: string[] = [];

    if (password.length < 8) {
      newSuggestions.push('Increase length to at least 8 characters (12+ is better)');
    } else {
      score += 1;
      if (password.length >= 12) score += 1;
    }

    if (!/[A-Z]/.test(password)) {
      newSuggestions.push('Add uppercase letters');
    } else {
      score += 1;
    }

    if (!/[a-z]/.test(password)) {
      newSuggestions.push('Add lowercase letters');
    } else {
      score += 1;
    }

    if (!/[0-9]/.test(password)) {
      newSuggestions.push('Add numbers');
    } else {
      score += 1;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      newSuggestions.push('Add special symbols (e.g., @, #, $, !)');
    } else {
      score += 1;
    }

    // Common words check (mock)
    const commonWords = ['password', '123456', 'qwerty', 'admin', 'welcome'];
    if (commonWords.some(word => password.toLowerCase().includes(word))) {
      newSuggestions.push('Avoid common words or sequences like "password" or "123"');
      score -= 2;
    }

    if (score <= 2) {
      setStrength('Weak');
      setCrackTime('Instantly');
    } else if (score <= 4) {
      setStrength('Medium');
      setCrackTime('A few hours to days');
    } else {
      setStrength('Strong');
      setCrackTime('Centuries');
    }

    setSuggestions(newSuggestions);
  }, [password]);

  const getStrengthColor = () => {
    switch (strength) {
      case 'Weak': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Strong': return 'bg-emerald-500';
      default: return 'bg-slate-200';
    }
  };

  const getStrengthBadgeVariant = () => {
    switch (strength) {
      case 'Weak': return 'danger';
      case 'Medium': return 'warning';
      case 'Strong': return 'success';
      default: return 'default';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-100 text-emerald-600 mb-2">
          <Key className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Password Checker</h1>
        <p className="text-slate-600">
          Type a password to see how strong it is. We don't save or send your password anywhere—it stays right here on your device.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"}
              placeholder="Enter a password to test..."
              className="pr-10 text-lg py-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Strength Meter */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">Strength</span>
              {strength && (
                <Badge variant={getStrengthBadgeVariant()}>{strength}</Badge>
              )}
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                style={{ 
                  width: strength === 'Weak' ? '33%' : 
                         strength === 'Medium' ? '66%' : 
                         strength === 'Strong' ? '100%' : '0%' 
                }}
              />
            </div>
          </div>

          {password && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6 pt-4 border-t border-slate-100"
            >
              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Estimated time to crack:</p>
                  <p className={`text-lg font-bold ${
                    strength === 'Weak' ? 'text-red-600' : 
                    strength === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {crackTime}
                  </p>
                </div>
              </div>

              {suggestions.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900">How to improve it:</h4>
                  <ul className="space-y-2">
                    {suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">Great job! This is a very strong password.</span>
                </div>
              )}
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Tip: Consider using a "passphrase" — a sentence made of random words (e.g., "PurpleElephantDancesFast!"). They are long, easy to remember, and very hard to crack.
        </p>
      </div>
    </motion.div>
  );
}
