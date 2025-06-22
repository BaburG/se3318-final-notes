'use client';

import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  RocketLaunchIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  SparklesIcon,
  BookOpenIcon,
  CodeBracketIcon,
  BeakerIcon,
  CpuChipIcon,
  AcademicCapIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function QuickReference() {
  const essentialConcepts = [
    {
      title: 'Abstract Data Types (ADTs)',
      icon: BookOpenIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50/80 to-cyan-50/80',
      textColor: 'text-blue-900',
      points: [
        'Abstraction: Hide complex implementation details',
        'Modularity: Independent, reusable components',
        'Encapsulation: Internal details hidden from outside',
        'User-defined types defined by their operations'
      ]
    },
    {
      title: 'Liskov Substitution Principle',
      icon: CodeBracketIcon,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50/80 to-teal-50/80',
      textColor: 'text-emerald-900',
      points: [
        'Subclass objects must be substitutable for superclass objects',
        'Overridden methods accept same or less restrictive inputs',
        'Maintains behavioral compatibility in inheritance',
        'Critical for polymorphism to work correctly'
      ]
    },
    {
      title: 'Law of Demeter',
      icon: BeakerIcon,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50/80 to-violet-50/80',
      textColor: 'text-purple-900',
      points: [
        'Objects should only talk to immediate friends',
        'Call methods on: this, parameters, created objects, direct components',
        'Avoid: a.getB().getC().doSomething()',
        'Better: a.doSomethingWithC() - encapsulate the chain'
      ]
    },
    {
      title: 'Defensive Programming',
      icon: CpuChipIcon,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50/80 to-amber-50/80',
      textColor: 'text-orange-900',
      points: [
        'Barricade: Separate dirty (external) from clean (internal) data',
        'Assertions: For development-time error detection',
        'Exceptions: For runtime errors that can be handled',
        'Public methods validate, private methods assume clean data'
      ]
    }
  ];

  const checkstyleCheatSheet = [
    {
      category: 'Class-Level',
      color: 'bg-blue-500',
      rules: [
        'VisibilityModifier: Fields should be private',
        'FinalClass: Utility classes should be final',
        'HideUtilityClassConstructor: Private constructor for utility classes'
      ]
    },
    {
      category: 'Method-Level',
      color: 'bg-emerald-500',
      rules: [
        'MissingOverride: Use @Override annotation',
        'MethodName: camelCase naming convention',
        'MethodLength: Keep methods under 150 lines',
        'FinalParameters: Declare parameters as final'
      ]
    },
    {
      category: 'Variable-Level',
      color: 'bg-purple-500',
      rules: [
        'MemberName: Instance variables in camelCase',
        'LocalVariableName: Local variables in camelCase',
        'StaticVariableName: Static vars camelCase, constants UPPER_CASE',
        'UnusedLocalVariable: Remove unused variables'
      ]
    },
    {
      category: 'Control-Flow',
      color: 'bg-orange-500',
      rules: [
        'ModifiedControlVariable: Don\'t modify for loop control vars',
        'MissingSwitchDefault: Always include default in switch',
        'SimplifyBooleanExpression: Avoid redundant == true',
        'SimplifyBooleanReturn: Return boolean directly'
      ]
    },
    {
      category: 'Java-Specific',
      color: 'bg-rose-500',
      rules: [
        'CovariantEquals: Override equals(Object), not just equals(MyType)',
        'DefaultComesLast: Put default clause last in switch',
        'StringLiteralEquality: Use .equals(), not ==',
        'EqualsHashCode: Override both equals() and hashCode()'
      ]
    }
  ];

  const tableDrivenMethods = [
    {
      type: 'Direct Access',
      icon: RocketLaunchIcon,
      color: 'from-blue-500 to-blue-600',
      description: 'Use input value directly as array index',
      example: 'charTypeTable[97] for character \'a\'',
      advantages: ['Very fast lookup (O(1))', 'Simple implementation'],
      disadvantages: ['Can waste memory if sparse', 'Requires contiguous input range'],
      bestFor: 'Small, contiguous input ranges'
    },
    {
      type: 'Indexed Access',
      icon: BeakerIcon,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Map input to index, then use index for lookup',
      example: 'charTypeTable[charToIndexMap[inputChar]]',
      advantages: ['Memory efficient for sparse ranges', 'Handles non-contiguous inputs'],
      disadvantages: ['Extra lookup step', 'More complex implementation'],
      bestFor: 'Large or sparse input ranges'
    },
    {
      type: 'Stair-Step Access',
      icon: CpuChipIcon,
      color: 'from-purple-500 to-purple-600',
      description: 'Table entries valid for ranges of data',
      example: 'Grade ranges: >=90% A, >=75% B, etc.',
      advantages: ['Handles continuous ranges well', 'Natural for range-based logic'],
      disadvantages: ['Sequential search (O(N))', 'Slower than direct access'],
      bestFor: 'Range-based or continuous input values'
    }
  ];

  const examSuccessTips = [
    {
      title: 'Understanding Over Memorization',
      icon: LightBulbIcon,
      color: 'text-yellow-600',
      tips: [
        'Focus on WHY each rule exists, not just what it checks',
        'Understand the principles behind good software design',
        'Connect rules to real-world maintenance problems',
        'Practice explaining concepts in your own words'
      ]
    },
    {
      title: 'Code Analysis Skills',
      icon: CodeBracketIcon,
      color: 'text-indigo-600',
      tips: [
        'Practice identifying rule violations in code samples',
        'Know common violation patterns for each rule',
        'Understand correct usage examples',
        'Be able to fix violations, not just identify them'
      ]
    },
    {
      title: 'Time Management',
      icon: RocketLaunchIcon,
      color: 'text-emerald-600',
      tips: [
        'Start with concepts you know well to build confidence',
        'Don\'t spend too long on any single question',
        'Review your answers if time permits',
        'Use process of elimination for multiple choice'
      ]
    }
  ];

  const commonMistakes = [
    {
      category: 'Checkstyle Rules',
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      mistakes: [
        'Confusing when to use @Override vs when not to',
        'Mixing up camelCase vs UPPER_CASE naming conventions',
        'Forgetting that utility classes need private constructors',
        'Not understanding the difference between assertions and exceptions'
      ]
    },
    {
      category: 'Design Principles',
      icon: BeakerIcon,
      color: 'text-orange-600',
      mistakes: [
        'Confusing LSP with simple inheritance',
        'Not understanding when Law of Demeter applies',
        'Mixing up cohesion types (functional vs temporal)',
        'Forgetting the "why" behind defensive programming'
      ]
    },
    {
      category: 'Implementation Details',
      icon: CpuChipIcon,
      color: 'text-purple-600',
      mistakes: [
        'Modifying loop control variables inside the loop body',
        'Using == for string comparison instead of .equals()',
        'Forgetting default clauses in switch statements',
        'Not understanding table-driven method trade-offs'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh"></div>
        <div className="relative glass-card border-0 rounded-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-8">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="nav-link text-slate-600 hover:text-slate-800"
                >
                  <ArrowLeftIcon className="h-5 w-5 mr-2" />
                  Back to Hub
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="floating-element">
                  <RocketLaunchIcon className="h-10 w-10 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">Quick Reference</h1>
                  <p className="text-lg text-slate-600">Last-minute exam preparation</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="glass-card px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-purple-600">Exam Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Essential Concepts */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <StarIcon className="h-10 w-10 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-slate-800">Essential Concepts</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {essentialConcepts.map((concept, index) => (
              <div key={index} className={`study-section bg-gradient-to-br ${concept.bgColor} border-white/40`}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${concept.color} p-3 mr-4`}>
                    <concept.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${concept.textColor}`}>{concept.title}</h3>
                </div>
                <ul className="space-y-3">
                  {concept.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start group">
                      <CheckCircleIcon className="h-5 w-5 mr-3 mt-1 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-slate-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Checkstyle Cheat Sheet */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <CheckCircleIcon className="h-10 w-10 text-emerald-600 mr-4" />
            <h2 className="text-3xl font-bold text-slate-800">Checkstyle Cheat Sheet</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkstyleCheatSheet.map((category, index) => (
              <div key={index} className="study-card p-6">
                <div className="flex items-center mb-4">
                  <div className={`w-4 h-4 rounded-full ${category.color} mr-3`}></div>
                  <h3 className="text-xl font-bold text-slate-800">{category.category}</h3>
                </div>
                <ul className="space-y-3">
                  {category.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-medium">{rule.split(':')[0]}:</span>
                      <span className="text-slate-600"> {rule.split(':')[1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Table-Driven Methods */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <BeakerIcon className="h-10 w-10 text-cyan-600 mr-4" />
            <h2 className="text-3xl font-bold text-slate-800">Table-Driven Methods Comparison</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {tableDrivenMethods.map((method, index) => (
              <div key={index} className="study-card p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${method.color} p-3 mr-4`}>
                    <method.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800">{method.type}</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">Description</h4>
                    <p className="text-slate-700">{method.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">Example</h4>
                    <code className="text-sm bg-slate-100 px-3 py-1 rounded-lg text-slate-800">{method.example}</code>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-emerald-700 mb-2 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Advantages
                    </h4>
                    <ul className="space-y-1">
                      {method.advantages.map((advantage, advIndex) => (
                        <li key={advIndex} className="text-sm text-slate-700 flex items-start">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {advantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-red-700 mb-2 flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                      Disadvantages
                    </h4>
                    <ul className="space-y-1">
                      {method.disadvantages.map((disadvantage, disIndex) => (
                        <li key={disIndex} className="text-sm text-slate-700 flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {disadvantage}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-indigo-800 mb-1">Best For</h4>
                    <p className="text-sm text-indigo-700">{method.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Exam Success Tips */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <AcademicCapIcon className="h-10 w-10 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-slate-800">Final Exam Success Tips</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {examSuccessTips.map((tipCategory, index) => (
              <div key={index} className="study-card p-8">
                <div className="flex items-center mb-6">
                  <tipCategory.icon className={`h-10 w-10 ${tipCategory.color} mr-4`} />
                  <h3 className="text-2xl font-bold text-slate-800">{tipCategory.title}</h3>
                </div>
                <ul className="space-y-4">
                  {tipCategory.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start group">
                      <FireIcon className="h-5 w-5 mr-3 mt-1 text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-slate-700 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes to Avoid */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <ExclamationTriangleIcon className="h-10 w-10 text-red-600 mr-4" />
            <h2 className="text-3xl font-bold text-slate-800">Common Mistakes to Avoid</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {commonMistakes.map((mistakeCategory, index) => (
              <div key={index} className="study-section bg-gradient-to-br from-red-50/80 to-orange-50/80 border-red-200/40">
                <div className="flex items-center mb-6">
                  <mistakeCategory.icon className={`h-10 w-10 ${mistakeCategory.color} mr-4`} />
                  <h3 className="text-2xl font-bold text-red-900">{mistakeCategory.category}</h3>
                </div>
                <ul className="space-y-4">
                  {mistakeCategory.mistakes.map((mistake, mistakeIndex) => (
                    <li key={mistakeIndex} className="flex items-start group">
                      <span className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></span>
                      <span className="text-slate-700 leading-relaxed">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Final Motivation */}
        <section className="study-section bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/40">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <RocketLaunchIcon className="h-16 w-16 text-indigo-600 mr-4" />
              <h2 className="text-4xl font-bold text-indigo-900">You've Got This! 🚀</h2>
            </div>
            <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              You've covered all the essential material. Trust your preparation, stay calm during the exam, 
              and remember that understanding the principles behind the rules is more important than 
              memorizing every detail.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="glass-card px-6 py-3 rounded-2xl">
                <span className="text-lg font-semibold text-indigo-600">✨ Stay Confident</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-2xl">
                <span className="text-lg font-semibold text-emerald-600">🎯 Focus on Understanding</span>
              </div>
              <div className="glass-card px-6 py-3 rounded-2xl">
                <span className="text-lg font-semibold text-purple-600">🚀 You're Ready!</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="glass-card border-0 border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-slate-600 text-lg">
              SE3318: Quick Reference - Final Exam Preparation
            </p>
            <p className="text-slate-500 mt-2">
              Best of luck on your final exam! You've prepared well. 🌟💪
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 