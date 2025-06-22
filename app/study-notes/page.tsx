'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  BookOpenIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  DocumentTextIcon,
  SparklesIcon,
  AcademicCapIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function StudyNotes() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['week9']);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const weeklyContent = [
    {
      id: 'week9',
      title: 'Week 9: Working Classes',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50/80 to-cyan-50/80',
      textColor: 'text-blue-900',
      sections: [
        {
          title: 'Abstract Data Types (ADTs)',
          content: [
            {
              subtitle: 'Core Concepts',
              items: [
                'Abstraction: Simplifying complex details by hiding lower-level implementations',
                'Modularity: Dividing system into independent components',
                'Encapsulation: Hiding internal details from the rest of the system',
                'Separation of Concerns: Making specific features belong to single modules',
                'User-Defined Types: Types defined by operations that can be performed on them'
              ]
            }
          ]
        },
        {
          title: 'Liskov Substitution Principle (LSP)',
          content: [
            {
              subtitle: 'Key Concept',
              items: [
                'Objects of a superclass should be replaceable with objects of its subclasses without breaking the application',
                'Overridden methods in subclasses need to accept same or less restrictive input parameter values'
              ]
            }
          ]
        },
        {
          title: 'Law of Demeter',
          content: [
            {
              subtitle: 'Rule',
              items: [
                'An object should only "talk" to its immediate friends',
                'Within a method, only call methods on: the object itself (this), objects passed as arguments, objects created within the method, direct component objects'
              ]
            },
            {
              subtitle: 'Example',
              items: [
                'Violation: a.getB().getC().doSomething()',
                'Better: a.doSomethingWithC() - where a handles B and C internally'
              ]
            }
          ]
        },
        {
          title: 'Good Encapsulation',
          content: [
            {
              subtitle: 'Hide Utility Class Constructor',
              items: [
                'Utility classes (only static methods) should have private constructors',
                'Prevents instantiation and signals class is not meant to be instantiated'
              ]
            }
          ]
        },
        {
          title: 'Good Abstractions',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Return Empty Array Instead of Null: Prevents NullPointerExceptions',
                'Avoid Primitive Wrapper Instantiation: Use autoboxing or static factory methods',
                'Inner Type Last: Nested classes/interfaces at bottom of top-level class'
              ]
            }
          ]
        },
        {
          title: 'Good Inheritance',
          content: [
            {
              subtitle: 'Guidelines',
              items: [
                'No Finalizer: Avoid finalize() method - use try-with-resources instead',
                'No Redundant Array Init: Arrays automatically initialized with default values',
                'No Clone: Avoid clone() unless necessary - consider copy constructors or factory methods'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'week10',
      title: 'Week 10: High Quality Routines',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50/80 to-teal-50/80',
      textColor: 'text-emerald-900',
      sections: [
        {
          title: 'Valid Reasons to Create a Routine',
          content: [
            {
              subtitle: 'Key Reasons',
              items: [
                'Understandable Abstraction: Hide complex logic behind simple names',
                'Avoid Duplicate Code: Follow DRY (Don\'t Repeat Yourself) principle',
                'Support Subclassing: Allow for polymorphic behavior and extensibility',
                'Improve Portability: Encapsulate non-portable aspects of code'
              ]
            }
          ]
        },
        {
          title: 'Design at Routine Level',
          content: [
            {
              subtitle: 'Cohesion Types',
              items: [
                'Functional Cohesion (Best): Performs one and only one operation',
                'Sequential Cohesion: Operations in specific order, sharing data step to step',
                'Communicational Cohesion: Make use of same data but not related otherwise',
                'Temporal Cohesion: Grouped because they occur at same time',
                'Logical Cohesion: Grouped by logical category (generally weak)'
              ]
            }
          ]
        },
        {
          title: 'Routine Names',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Describe Everything the Routine Does: Include all outputs and side effects',
                'Avoid Meaningless Verbs: Don\'t use Handle, Perform, Output, Process, DealWith',
                'Don\'t Differentiate by Number: Avoid Part1, Part2, OutputUser1, OutputUser2',
                'Use Description of Return Value: For functions returning values',
                'Use Strong Verb + Object: PrintDocument(), CalcMonthlyRevenues()'
              ]
            }
          ]
        },
        {
          title: 'Routine Parameters',
          content: [
            {
              subtitle: 'Guidelines',
              items: [
                'Use All Parameters: If passed to routine, must be used within it',
                'Don\'t Use Parameters as Working Variables: Create local working variables instead',
                'Make Parameters Final: Prevents accidental modification'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'week11',
      title: 'Week 11: General Issues in Using Variables',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50/80 to-violet-50/80',
      textColor: 'text-purple-900',
      sections: [
        {
          title: 'Making Variable Declarations',
          content: [
            {
              subtitle: 'Naming Conventions',
              items: [
                'MemberName: Instance variables - camel case, lowercase start',
                'LocalVariableName: Local non-final variables - camel case, lowercase start',
                'StaticVariableName: Static non-final variables - camel case, lowercase start',
                'LocalFinalVariableName: Local final variables - camel case, lowercase start',
                'FinalLocalVariable: Local variables never changed should be declared final'
              ]
            }
          ]
        },
        {
          title: 'Guidelines for Initializing Variables',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Initialize Each Variable as Declared: Assign value when declaring',
                'Initialize Close to First Use: Declare variables near first usage',
                'MultipleVariableDeclarations: Each variable on its own line',
                'ExplicitInitialization: Avoid initializing to default values',
                'Initialize Member Data in Constructor: Don\'t rely on default initialization'
              ]
            }
          ]
        },
        {
          title: 'Scope',
          content: [
            {
              subtitle: 'Minimizing Variable Scope',
              items: [
                'Keep Variables "Live" for Short Time: Minimize statements between declaration and last use',
                'Initialize Before Loop: Not at beginning of routine containing loop',
                'Don\'t Modify Control Variables: Avoid changing for loop control variables',
                'Minimize Declaration-Usage Distance: Declare close to first use',
                'Group Related Statements: Keep related code together',
                'Break into Separate Routines: Extract groups of related statements'
              ]
            }
          ]
        },
        {
          title: 'Using Each Variable for Exactly One Purpose',
          content: [
            {
              subtitle: 'Variable Usage Guidelines',
              items: [
                'One Purpose Only: Don\'t reuse variables for multiple unrelated purposes',
                'Avoid Hidden Meanings: Variable value shouldn\'t change its purpose',
                'Ensure All Variables Are Used: Remove unused declared variables',
                'UnusedLocalVariable Check: Catches declared but unused local variables'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'week12',
      title: 'Week 12: Controlling Loops',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50/80 to-amber-50/80',
      textColor: 'text-orange-900',
      sections: [
        {
          title: 'Selecting the Kind of Loop',
          content: [
            {
              subtitle: 'Loop Types',
              items: [
                'Counted Loop (for): When number of iterations is known in advance',
                'Iterator Loop (for-each): Performs action once for each element in container',
                'Continuously Evaluated Loop (while/do-while): Number of iterations not known beforehand',
                'Endless Loop: Executes forever - used in OS, embedded systems, or with internal exit conditions'
              ]
            }
          ]
        },
        {
          title: 'Controlling the Loop',
          content: [
            {
              subtitle: 'Loop Control Placement',
              items: [
                'Top (Pre-check): while loop - condition checked before loop body executes',
                'Bottom (Post-check): do-while loop - loop body executes at least once',
                'Middle (Loop-and-a-Half): while(true) with if condition and break inside',
                'Advantages of Loop-and-a-Half: Reduces redundant code, simplifies complex exit conditions',
                'Disadvantages: Can be less readable if exit point not immediately obvious'
              ]
            }
          ]
        },
        {
          title: 'Exiting the Loop',
          content: [
            {
              subtitle: 'Exit Methods',
              items: [
                'break statements: Exit from middle of loop',
                'return: Exit both loop and routine',
                'Error Handling: Use try-catch for exceptions without premature exit',
                'Avoid goto: Generally discouraged due to unstructured control flow'
              ]
            }
          ]
        },
        {
          title: 'Using Loop Variables',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Initialize Loop Variables: Initialize immediately before loop starts',
                'Increment Loop Variables: As part of loop control (for loop update clause)',
                'Use for One Purpose Only: Loop control variables should only control iteration',
                'Watch for Off-by-One Errors: Carefully check boundary conditions (< vs <=)',
                'Don\'t Modify Control Variable: Checkstyle ModifiedControlVariable prevents this'
              ]
            }
          ]
        },
        {
          title: 'Loop Length and Nesting',
          content: [
            {
              subtitle: 'Guidelines',
              items: [
                'Keep Loops Short: Shorter loops are easier to understand and verify',
                'Extract Long Loops: Break into separate routines if becoming very long',
                'Avoid Deep Nesting: 4+ levels significantly reduce comprehension',
                'Refactor Nested Loops: Consider separate, smaller routines for complex structures'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'week13-1',
      title: 'Week 13-1: Using Conditionals',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50/80 to-pink-50/80',
      textColor: 'text-rose-900',
      sections: [
        {
          title: 'Plain if-then Statements',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Write the Nominal Path First: Handle most common, expected scenario first',
                'Make Sure You Branch Correctly on Equality: Pay attention to boundary conditions (<, <=, >, >=, ==)',
                'Check Normal Case First in if: Prioritize most frequent condition in if block',
                'Follow if Clause with Meaningful Statement: Action should be clear and related to condition'
              ]
            }
          ]
        },
        {
          title: 'Chains of if-then Statements',
          content: [
            {
              subtitle: 'Ordering Strategies',
              items: [
                'Order by Frequency: Most likely to least likely conditions',
                'Order by Alphabetical Order: When no clear frequency pattern',
                'Order by Single Test: For mutually exclusive, specific value checks',
                'Check Each Condition: Ensure all possible cases are covered',
                'Correct Logic with else Clause: Handle all uncovered cases explicitly'
              ]
            }
          ]
        },
        {
          title: 'Switch Statements (case Statements)',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Use for Mutually Exclusive Conditions: Single variable with distinct values',
                'Always Include default Clause: For error detection, robustness, and documentation',
                'Clearly Identify Fall-Throughs: Document intentional fall-through with comments',
                'Use enum Types When Appropriate: More robust than integer constants or strings'
              ]
            },
            {
              subtitle: 'Checkstyle Rules',
              items: [
                'MissingSwitchDefault: Ensures switch statements have default clause',
                'FallsThrough: Checks for unintentional fall-through in switch statements'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'week13-2',
      title: 'Week 13-2: Defensive Programming',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-50/80 to-blue-50/80',
      textColor: 'text-indigo-900',
      sections: [
        {
          title: 'Barricade Your Program',
          content: [
            {
              subtitle: 'Concept',
              items: [
                'Create "barricade" around parts dealing with "dirty" data',
                'Dirty Data: External input (users, files, network) - potentially invalid',
                'Clean Data: Validated and sanitized by barricade classes',
                'Public Methods: Assume data is unsafe, validate and sanitize',
                'Private Methods: Assume data is clean, simplifies logic and improves performance'
              ]
            }
          ]
        },
        {
          title: 'Assertions',
          content: [
            {
              subtitle: 'Purpose and Characteristics',
              items: [
                'Catch Programming Errors: Detect bugs during development and testing',
                'Document Assumptions: State programmer assumptions about program state',
                'Development-Time Only: Compiled out of production code',
                'NOT for User Input Validation: Use regular error handling instead',
                'NOT for Recoverable Errors: Use for internal consistency checks only'
              ]
            },
            {
              subtitle: 'Correct Usage',
              items: [
                'Preconditions: Check conditions true at method beginning',
                'Postconditions: Check conditions true at method end',
                'Parameter/Return Value Validation: For values that should be valid by definition',
                'Never Put Executable Code in Assertions: Only check conditions, no side effects'
              ]
            }
          ]
        },
        {
          title: 'Exceptions',
          content: [
            {
              subtitle: 'When to Use',
              items: [
                'For errors that cannot be handled locally',
                'For truly "exceptional" conditions (not normal operation)',
                'When error occurs at different level than handling'
              ]
            },
            {
              subtitle: 'Alternatives',
              items: [
                'Return Neutral Value: null, empty string, 0, -1',
                'Return Error Code: Specific code indicating error type',
                'Change Return to Boolean: For simple success/failure',
                'Die (Crash): For severe, unrecoverable errors'
              ]
            },
            {
              subtitle: 'When NOT to Use',
              items: [
                'For Normal Flow Control: Don\'t replace if-then-else',
                'For User Input Validation: Handle with conditionals and prompts'
              ]
            }
          ]
        },
        {
          title: 'Error Handling Techniques',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Determine How to Handle Errors: Develop strategy for each error type',
                'Handle Errors Only Once: Detect low, handle high',
                'Report Errors, Don\'t Suppress: Make errors visible',
                'Log Errors Appropriately: Use logging frameworks with context',
                'Centralize Error Handling: Standardize error reporting and recovery',
                'Consider Clean vs. Dirty Data: Continuously apply barricade principle'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'week14',
      title: 'Week 14: Table-Driven Methods',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50/80 to-blue-50/80',
      textColor: 'text-cyan-900',
      sections: [
        {
          title: 'General Considerations',
          content: [
            {
              subtitle: 'Benefits',
              items: [
                'Simpler than Complicated Logic: Replace intricate if-then-else with data lookup',
                'Easier to Modify: Update data in table rather than program logic',
                'More Efficient: Can be faster in compute time or memory usage'
              ]
            }
          ]
        },
        {
          title: 'Direct Access Tables',
          content: [
            {
              subtitle: 'Concept',
              items: [
                'Use input value directly as index into array/data structure',
                'Example: charTypeTable[97] for character \'a\' (ASCII 97)'
              ]
            },
            {
              subtitle: 'Trade-offs',
              items: [
                'Advantages: Very fast lookup (O(1) complexity)',
                'Disadvantages: Can use lots of memory if input range is large and sparse',
                'Requires: Input values in contiguous, manageable range'
              ]
            }
          ]
        },
        {
          title: 'Indexed Access Tables',
          content: [
            {
              subtitle: 'Concept',
              items: [
                'Map range of inputs to an index rather than using input directly',
                'Example: charTypeTable[charToIndexMap[inputChar]]',
                'Handle non-contiguous or large input values'
              ]
            },
            {
              subtitle: 'Trade-offs',
              items: [
                'Advantages: More memory-efficient for sparse input ranges',
                'Disadvantages: Extra lookup step to determine index'
              ]
            }
          ]
        },
        {
          title: 'Stair-Step Access Tables',
          content: [
            {
              subtitle: 'Concept',
              items: [
                'Table entries valid for ranges of data rather than distinct points',
                'Iterate through table until input falls within defined range',
                'Example: Grading program with grade ranges (>=90%: A, <90% but >=75%: B, etc.)'
              ]
            },
            {
              subtitle: 'Implementation',
              items: [
                'Two arrays: rangeLimit and corresponding values',
                'Loop through rangeLimit until condition met',
                'Sequential searching required'
              ]
            },
            {
              subtitle: 'Trade-offs',
              items: [
                'Advantages: Handles continuous/range-based inputs efficiently',
                'Disadvantages: Sequential search (O(N)) - not as fast as direct access'
              ]
            }
          ]
        }
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
                  <BookOpenIcon className="h-10 w-10 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">Study Notes</h1>
                  <p className="text-lg text-slate-600">SE3318: Software Construction</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="glass-card px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-indigo-600">Weeks 9-14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Navigation */}
      <div className="sticky top-0 z-40 glass-card border-0 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
            <SparklesIcon className="h-5 w-5 mr-2 text-indigo-500" />
            Quick Navigation
          </h2>
          <div className="flex flex-wrap gap-2">
            {weeklyContent.map((week) => (
              <button
                key={week.id}
                onClick={() => {
                  const element = document.getElementById(week.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-sm font-medium bg-white/60 hover:bg-white/80 text-slate-700 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                {week.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {weeklyContent.map((week) => (
            <div key={week.id} id={week.id} className="study-card">
              <div className="p-8 border-b border-slate-200/60">
                <button
                  onClick={() => toggleSection(week.id)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${week.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                      <AcademicCapIcon className="w-full h-full text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">{week.title}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="glass-card px-3 py-1 rounded-full">
                      <ClockIcon className="h-4 w-4 text-slate-500 inline mr-1" />
                      <span className="text-sm text-slate-600">{week.sections.length} topics</span>
                    </div>
                    {expandedSections.includes(week.id) ? (
                      <ChevronDownIcon className="h-6 w-6 text-slate-500 transition-transform duration-200" />
                    ) : (
                      <ChevronRightIcon className="h-6 w-6 text-slate-500 transition-transform duration-200" />
                    )}
                  </div>
                </button>
              </div>

              {expandedSections.includes(week.id) && (
                <div className="p-8">
                  <div className="space-y-8">
                    {week.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className={`study-section bg-gradient-to-br ${week.bgColor} border-white/40`}>
                        <h3 className={`text-2xl font-bold mb-6 flex items-center ${week.textColor}`}>
                          <DocumentTextIcon className="h-7 w-7 mr-3" />
                          {section.title}
                        </h3>
                        
                        <div className="space-y-6">
                          {section.content.map((contentBlock, contentIndex) => (
                            <div key={contentIndex}>
                              <h4 className={`text-xl font-semibold mb-4 flex items-center ${week.textColor}`}>
                                <LightBulbIcon className="h-6 w-6 mr-3" />
                                {contentBlock.subtitle}
                              </h4>
                              <ul className="space-y-3">
                                {contentBlock.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start group">
                                    <CheckCircleIcon className="h-5 w-5 mr-4 mt-1 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-slate-700 leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Study Tips */}
        <div className="mt-16 study-section bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/40">
          <div className="flex items-center mb-8">
            <ExclamationTriangleIcon className="h-10 w-10 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-indigo-900">Study Tips for Final Exam Success</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                <SparklesIcon className="h-6 w-6 mr-2" />
                Focus Areas
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Understand WHY each Checkstyle rule exists (readability, maintainability, preventing errors)</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Know common violations and correct usage examples for key rules</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Master the principles: LSP, Law of Demeter, cohesion types</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Understand defensive programming concepts: assertions vs exceptions</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                <AcademicCapIcon className="h-6 w-6 mr-2" />
                Key Concepts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Method naming: Strong verb + object, describe return value and side effects</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Variable scope: Keep "live time" short, declare close to first use</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Loop control: Don't modify control variables, watch for off-by-one errors</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Table-driven methods: Direct vs Indexed vs Stair-step access patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-0 border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-slate-600 text-lg">
              SE3318: Software Construction - Study Notes (Weeks 9-14)
            </p>
            <p className="text-slate-500 mt-2">
              Review regularly and practice with code examples! 📚✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 