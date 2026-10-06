/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventInfo } from './components/EventInfo';
import { About } from './components/About';
import { Schedule } from './components/Schedule';
import { Speakers } from './components/Speakers';
import { Societies } from './components/Societies';
import { RegisterCTA } from './components/RegisterCTA';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { LoadingScreen } from './components/LoadingScreen';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  // Check if user already saw the intro in this tab session
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('innovatex_intro_seen');
    if (hasSeenIntro === 'true') {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    sessionStorage.setItem('innovatex_intro_seen', 'true');
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans selection:bg-[#00629B] selection:text-white">
      {/* Slim Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Cinematic 3-second opening experience / loader */}
      {showLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Sticky Navigation Bar with Elegant Audio Controls */}
      <Navbar onOpenRegisterModal={handleOpenRegisterModal} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Immersive 3D Hero Section */}
        <Hero onOpenRegisterModal={handleOpenRegisterModal} />

        {/* 2. Event Information Section */}
        <EventInfo onOpenRegisterModal={handleOpenRegisterModal} />

        {/* 3. About the Event (Technical Pillars) */}
        <About />

        {/* 4. Event Schedule (Interactive Futuristic Timeline) */}
        <Schedule />

        {/* 5. Keynote Speakers (Interactive 3D Tilt Cards) */}
        <Speakers />

        {/* 6. Society / Organization Section (Interconnected Topology) */}
        <Societies />

        {/* 7. Register Call to Action (3D Magnetic Button) */}
        <RegisterCTA onOpenRegisterModal={handleOpenRegisterModal} />
      </main>

      {/* 8. Integrated Official Footer */}
      <Footer />

      {/* 9. Floating INNOVA-AI Gemini Assistant (Bottom-Right) */}
      <AIAssistantModal onOpenRegisterModal={handleOpenRegisterModal} />

      {/* Interactive Registration Dialog */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
      />
    </div>
  );
}
