import React from 'react';
import { motion } from 'motion/react';
import { Mail, Key, Share2, HelpCircle, Briefcase, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { PageType } from '@/src/components/Navbar';

interface HomeProps {
  setActivePage: (page: PageType) => void;
}

export function Home({ setActivePage }: HomeProps) {
  const features = [
    {
      id: 'phishing' as PageType,
      title: 'Phishing Detector',
      description: 'Analyze emails and messages to see if they are trying to trick you.',
      icon: <Mail className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      id: 'password' as PageType,
      title: 'Password Checker',
      description: 'Find out how strong your password is and how to improve it.',
      icon: <Key className="w-8 h-8 text-emerald-500" />,
      color: 'bg-emerald-50',
    },
    {
      id: 'social' as PageType,
      title: 'Social Media Safety',
      description: 'Check your posts for sensitive information before you share them.',
      icon: <Share2 className="w-8 h-8 text-purple-500" />,
      color: 'bg-purple-50',
    },
    {
      id: 'assistant' as PageType,
      title: 'Am I Safe? Assistant',
      description: 'Ask any cybersecurity question and get simple, beginner-friendly answers.',
      icon: <HelpCircle className="w-8 h-8 text-amber-500" />,
      color: 'bg-amber-50',
    },
    {
      id: 'careers' as PageType,
      title: 'Cyber Career Finder',
      description: 'Discover the perfect cybersecurity career path based on your interests and skills.',
      icon: <Briefcase className="w-8 h-8 text-indigo-500" />,
      color: 'bg-indigo-50',
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-8">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
          Your Personal Cybersecurity Assistant
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Welcome to <span className="text-blue-600">CyberSafe AI</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Staying safe online doesn't have to be complicated. We provide simple, easy-to-use tools to help you identify threats, create strong passwords, and protect your personal information.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="h-full cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 border-slate-200 overflow-hidden group"
              onClick={() => setActivePage(feature.id)}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base mt-2">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:underline">
                  Try this tool <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}
