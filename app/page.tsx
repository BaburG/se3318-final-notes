'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpenIcon, 
  CheckCircleIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
  BeakerIcon,
  CodeBracketIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationCards = [
    {
      href: '/study-notes',
      title: 'Study Notes',
      description: 'Comprehensive notes covering all 6 weeks of material',
      icon: BookOpenIcon,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      weeks: 'Weeks 9-14',
      topics: ['Working Classes', 'High Quality Routines', 'Variables', 'Loops', 'Conditionals', 'Defensive Programming']
    },
    {
      href: '/checkstyle',
      title: 'Checkstyle Reference',
      description: 'Complete guide to all Checkstyle rules and best practices',
      icon: CodeBracketIcon,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      weeks: '40+ Rules',
      topics: ['Class-Level Checks', 'Method-Level Checks', 'Variable Checks', 'Control Flow', 'Java-Specific']
    },
    {
      href: '/checkstyle-quiz',
      title: 'Checkstyle Quiz',
      description: 'Interactive game to test your knowledge of Checkstyle rules',
      icon: BeakerIcon,
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-50 to-purple-50',
      weeks: 'Game Mode',
      topics: ['Rule Recognition', 'Interactive Learning', 'Score Tracking', 'Self Assessment']
    },
    {
      href: '/quick-reference',
      title: 'Quick Reference',
      description: 'Last-minute study guide with essential concepts',
      icon: CpuChipIcon,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      weeks: 'Exam Prep',
      topics: ['Key Principles', 'Common Mistakes', 'Success Tips', 'Cheat Sheets']
    }
  ];

  const weeklyTopics = [
    { week: 9, title: 'Working Classes', color: 'bg-gradient-to-r from-blue-500 to-blue-600', topics: ['ADTs', 'LSP', 'Law of Demeter', 'Encapsulation'] },
    { week: 10, title: 'High Quality Routines', color: 'bg-gradient-to-r from-emerald-500 to-emerald-600', topics: ['Cohesion', 'Naming', 'Parameters', 'Checkstyle'] },
    { week: 11, title: 'Using Variables', color: 'bg-gradient-to-r from-purple-500 to-purple-600', topics: ['Declarations', 'Scope', 'Initialization', 'Live Time'] },
    { week: 12, title: 'Controlling Loops', color: 'bg-gradient-to-r from-orange-500 to-orange-600', topics: ['Loop Types', 'Control Variables', 'Exit Conditions'] },
    { week: '13-1', title: 'Using Conditionals', color: 'bg-gradient-to-r from-rose-500 to-rose-600', topics: ['if-then', 'switch Statements', 'Boolean Logic'] },
    { week: '13-2', title: 'Defensive Programming', color: 'bg-gradient-to-r from-indigo-500 to-indigo-600', topics: ['Barricades', 'Assertions', 'Exceptions', 'Error Handling'] },
    { week: 14, title: 'Table-Driven Methods', color: 'bg-gradient-to-r from-cyan-500 to-cyan-600', topics: ['Direct Access', 'Indexed Access', 'Stair-step Access'] }
  ];

  const stats = [
    { label: 'Study Weeks', value: '7', icon: ClockIcon },
    { label: 'Checkstyle Rules', value: '40+', icon: CheckCircleIcon },
    { label: 'Core Concepts', value: '50+', icon: BeakerIcon },
    { label: 'Code Examples', value: '150+', icon: DocumentTextIcon }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 sm:pb-16">
          <div className="text-center">
            <div className="floating-element">
              <AcademicCapIcon className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-indigo-600 mb-6 sm:mb-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">SE3318</span>
              <br />
              <span className="text-slate-800 text-shadow">Study Hub</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Master Software Construction concepts with our comprehensive study materials. 
              From Working Classes to Defensive Programming, we&apos;ve got you covered.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 sm:p-6 rounded-2xl">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-indigo-600 mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center mb-6 sm:mb-8 px-4">
              <div className="glass-card p-1 sm:p-2 rounded-2xl w-full max-w-md sm:max-w-none sm:w-auto">
                <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'weekly', label: 'Weekly Topics' },
                    { id: 'resources', label: 'Resources' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {navigationCards.map((card, index) => (
              <Link key={index} href={card.href} className="group">
                <div className="study-card p-6 sm:p-8 h-full">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${card.gradient} p-3 sm:p-4 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">{card.title}</h3>
                  <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{card.description}</p>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="text-sm font-semibold text-indigo-600 mb-2">{card.weeks}</div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {card.topics.slice(0, 3).map((topic, topicIndex) => (
                        <span key={topicIndex} className="text-xs px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                          {topic}
                        </span>
                      ))}
                      {card.topics.length > 3 && (
                        <span className="text-xs px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                          +{card.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-2 transition-transform duration-200 text-sm sm:text-base">
                    Start Learning
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'weekly' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {weeklyTopics.map((week, index) => (
              <div key={index} className="study-card p-4 sm:p-6 group hover:scale-105 transition-all duration-300">
                <div className={`${week.color} text-white p-3 sm:p-4 rounded-xl mb-3 sm:mb-4`}>
                  <div className="text-xs sm:text-sm font-medium opacity-90">Week {week.week}</div>
                  <div className="text-base sm:text-lg font-bold">{week.title}</div>
                </div>
                
                <div className="space-y-2">
                  {week.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center text-xs sm:text-sm text-slate-700">
                      <CheckCircleIcon className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="study-section">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                <StarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mr-2 sm:mr-3" />
                Study Features
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 text-sm sm:text-base">Interactive Content</div>
                    <div className="text-slate-600 text-xs sm:text-sm">Expandable sections, search functionality, and smooth navigation</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 text-sm sm:text-base">Complete Coverage</div>
                    <div className="text-slate-600 text-xs sm:text-sm">All course material from weeks 9-14 with detailed explanations</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 text-sm sm:text-base">Code Examples</div>
                    <div className="text-slate-600 text-xs sm:text-sm">Practical examples showing correct and incorrect usage</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-800 text-sm sm:text-base">Exam-Focused</div>
                    <div className="text-slate-600 text-xs sm:text-sm">Organized specifically for final exam preparation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="study-section">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 flex items-center">
                <BeakerIcon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-500 mr-2 sm:mr-3" />
                Study Tips
              </h3>
              <div className="space-y-3 sm:space-y-4 text-slate-700">
                <div className="p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="font-semibold text-blue-800 mb-1 text-sm sm:text-base">Start with Overview</div>
                  <div className="text-xs sm:text-sm text-blue-700">Begin with the study notes to understand core concepts</div>
                </div>
                <div className="p-3 sm:p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="font-semibold text-purple-800 mb-1 text-sm sm:text-base">Practice with Checkstyle</div>
                  <div className="text-xs sm:text-sm text-purple-700">Use the reference to understand rule violations</div>
                </div>
                <div className="p-3 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="font-semibold text-emerald-800 mb-1 text-sm sm:text-base">Review Before Exam</div>
                  <div className="text-xs sm:text-sm text-emerald-700">Use quick reference for last-minute preparation</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to Ace Your Final?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">Start with our comprehensive study notes and work your way through all the material.</p>
          <Link 
            href="/study-notes" 
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-semibold rounded-2xl hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Begin Studying
            <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}