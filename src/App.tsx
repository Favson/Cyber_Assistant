/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { PageType } from './components/Navbar';
import { Home } from './pages/Home';
import { PhishingDetector } from './pages/PhishingDetector';
import { PasswordChecker } from './pages/PasswordChecker';
import { SocialMediaAnalyzer } from './pages/SocialMediaAnalyzer';
import { AmISafeAssistant } from './pages/AmISafeAssistant';
import { CyberCareerFinder } from './pages/CyberCareerFinder';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'phishing':
        return <PhishingDetector />;
      case 'password':
        return <PasswordChecker />;
      case 'social':
        return <SocialMediaAnalyzer />;
      case 'assistant':
        return <AmISafeAssistant />;
      case 'careers':
        return <CyberCareerFinder />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

