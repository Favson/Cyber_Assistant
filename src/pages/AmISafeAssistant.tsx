import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Loader2, Send, Shield, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  risk?: 'Low' | 'Medium' | 'High';
  advice?: string;
}

export function AmISafeAssistant() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      text: 'Hi! I am your CyberSafe Assistant. Ask me any question about online safety, like "Is public WiFi safe?" or "Should I save my credit card on my browser?"'
    }
  ]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI response logic
    setTimeout(() => {
      const lowerInput = userMsg.text.toLowerCase();
      let responseText = "That's a great question. In general, it's always best to be cautious online. Make sure you use strong passwords and don't share personal information with strangers.";
      let risk: 'Low' | 'Medium' | 'High' = 'Low';
      let advice = "Stay alert and trust your instincts.";

      if (lowerInput.includes('wifi') || lowerInput.includes('wi-fi') || lowerInput.includes('cafe') || lowerInput.includes('airport')) {
        responseText = "Public WiFi networks (like in cafes or airports) are often unsecured. This means hackers could potentially see what you are doing online, including passwords you type.";
        risk = 'High';
        advice = "Avoid logging into bank accounts or entering passwords on public WiFi. If you must, use a VPN (Virtual Private Network) to scramble your data.";
      } else if (lowerInput.includes('save') && (lowerInput.includes('card') || lowerInput.includes('password'))) {
        responseText = "Saving passwords or credit cards in your browser is convenient, but it means anyone who gets access to your unlocked computer can use them.";
        risk = 'Medium';
        advice = "Use a dedicated Password Manager app instead. They are much safer and lock all your data behind one strong master password.";
      } else if (lowerInput.includes('antivirus') || lowerInput.includes('virus')) {
        responseText = "Yes, having antivirus software is still important! It acts like a security guard for your computer, catching malicious files before they can do harm.";
        risk = 'Low';
        advice = "Keep your computer's built-in security (like Windows Defender or macOS XProtect) turned on and updated. You usually don't need to buy expensive third-party ones.";
      } else if (lowerInput.includes('update') || lowerInput.includes('software')) {
        responseText = "Software updates often contain critical security fixes. When companies find a hole in their software that hackers could use, they send an update to patch it.";
        risk = 'Low';
        advice = "Always install updates for your phone, computer, and apps as soon as possible. Turn on 'Automatic Updates' to make it easy.";
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: responseText,
        risk,
        advice
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedQuestions = [
    "Is public WiFi safe?",
    "Should I save my passwords in Chrome?",
    "Do I really need to update my phone?"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-6 flex flex-col h-[calc(100vh-12rem)]"
    >
      <div className="text-center space-y-2 shrink-0">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-100 text-amber-600 mb-2">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">"Am I Safe?" Assistant</h1>
        <p className="text-slate-600 text-sm">
          Ask any cybersecurity question. No technical jargon, just simple answers.
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 shadow-sm">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-slate-100 text-slate-800 rounded-bl-sm'
              }`}>
                {msg.type === 'assistant' && msg.id !== '1' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-200">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Analysis</span>
                    {msg.risk && (
                      <Badge variant={
                        msg.risk === 'High' ? 'danger' : 
                        msg.risk === 'Medium' ? 'warning' : 'success'
                      } className="ml-auto text-[10px] px-2 py-0">
                        {msg.risk} Risk
                      </Badge>
                    )}
                  </div>
                )}
                
                <p className="text-sm leading-relaxed">{msg.text}</p>
                
                {msg.advice && (
                  <div className="mt-3 pt-3 border-t border-slate-200/50">
                    <div className="flex items-start gap-2 text-sm">
                      <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <span className="font-medium text-slate-900">{msg.advice}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm p-4 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                <span className="text-sm text-slate-500">Thinking...</span>
              </div>
            </div>
          )}
        </CardContent>
        
        <div className="p-4 bg-white border-t border-slate-100">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={handleSend} className="flex gap-2">
            <Input 
              placeholder="Type your question here..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-full px-4"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full shrink-0 bg-blue-600 hover:bg-blue-700"
              disabled={!input.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}
