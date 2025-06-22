'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  SparklesIcon,
  BeakerIcon,
  CpuChipIcon,
  XMarkIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

export default function CheckstyleReference() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const checkstyleSections = [
    {
      id: 'class-level',
      title: '1. Class-Level Checks',
      description: 'These checks apply to the overall structure, naming, and dependencies of classes.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50/80 to-cyan-50/80',
      textColor: 'text-blue-900',
      icon: DocumentTextIcon,
      rules: [
        {
          name: 'VisibilityModifier',
          whereUsed: 'Class (Fields)',
          whatItChecks: 'Ensures proper visibility of class members. By default, fields should be private. Only static final or truly immutable fields may be public.',
          whyItMatters: 'Enforces good encapsulation; hides implementation details; reduces external dependencies.',
          commonViolations: [
            'public int num1; // non-final public field',
            'protected String field2; // protected field often disallowed'
          ],
          correctUsage: [
            'private int num1; // proper private field',
            'public static final int CONSTANT = 5; // acceptable public constant'
          ]
        },
        {
          name: 'FinalClass',
          whereUsed: 'Class Declaration',
          whatItChecks: 'Ensures utility classes (classes with only static methods) are declared final.',
          whyItMatters: 'Prevents unnecessary inheritance of utility classes; signals design intent.',
          commonViolations: [
            'public class MathUtils { // should be final',
            '  public static int add(int a, int b) { return a + b; }',
            '}'
          ],
          correctUsage: [
            'public final class MathUtils {',
            '  private MathUtils() {} // private constructor',
            '  public static int add(int a, int b) { return a + b; }',
            '}'
          ]
        },
        {
          name: 'HideUtilityClassConstructor',
          whereUsed: 'Utility Classes',
          whatItChecks: 'Utility classes should have private constructors to prevent instantiation.',
          whyItMatters: 'Prevents meaningless instantiation; saves memory; clarifies design intent.',
          commonViolations: [
            'public class StringUtils {',
            '  // no constructor - default public constructor available',
            '  public static boolean isEmpty(String s) { ... }',
            '}'
          ],
          correctUsage: [
            'public final class StringUtils {',
            '  private StringUtils() { // private constructor',
            '    throw new UnsupportedOperationException();',
            '  }',
            '  public static boolean isEmpty(String s) { ... }',
            '}'
          ]
        }
      ]
    },
    {
      id: 'method-level',
      title: '2. Method-Level Checks',
      description: 'These checks focus on method structure, naming, parameters, and implementation quality.',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50/80 to-teal-50/80',
      textColor: 'text-emerald-900',
      icon: CodeBracketIcon,
      rules: [
        {
          name: 'MissingOverride',
          whereUsed: 'Method Declarations',
          whatItChecks: 'Methods that override superclass methods should have @Override annotation.',
          whyItMatters: 'Prevents errors from typos in method names; documents intent; enables compiler checking.',
          commonViolations: [
            'public boolean equals(Object obj) { // missing @Override',
            '  return super.equals(obj);',
            '}'
          ],
          correctUsage: [
            '@Override',
            'public boolean equals(Object obj) {',
            '  return super.equals(obj);',
            '}'
          ]
        },
        {
          name: 'MethodName',
          whereUsed: 'Method Declarations',
          whatItChecks: 'Method names should follow camelCase convention.',
          whyItMatters: 'Consistency in naming improves readability; follows Java conventions.',
          commonViolations: [
            'public void Calculate_Total() { ... } // underscore not allowed',
            'public void SHOWTOTAL() { ... } // all caps not allowed'
          ],
          correctUsage: [
            'public void calculateTotal() { ... } // proper camelCase',
            'public void showTotal() { ... } // proper camelCase'
          ]
        },
        {
          name: 'MethodLength',
          whereUsed: 'Method Body',
          whatItChecks: 'Methods should not exceed a maximum number of lines (typically 150).',
          whyItMatters: 'Long methods are harder to understand, test, and maintain; encourages good design.',
          commonViolations: [
            '// Method with 200+ lines of code',
            'public void processData() {',
            '  // ... 200 lines of complex logic',
            '}'
          ],
          correctUsage: [
            'public void processData() {',
            '  validateInput();',
            '  transformData();',
            '  saveResults();',
            '} // Each helper method < 150 lines'
          ]
        },
        {
          name: 'FinalParameters',
          whereUsed: 'Method Parameters',
          whatItChecks: 'Method parameters should be declared final to prevent modification.',
          whyItMatters: 'Prevents accidental parameter modification; improves code clarity.',
          commonViolations: [
            'public void process(String data) {',
            '  data = data.trim(); // modifying parameter',
            '}'
          ],
          correctUsage: [
            'public void process(final String data) {',
            '  String trimmed = data.trim(); // use local variable',
            '}'
          ]
        }
      ]
    },
    {
      id: 'variable-level',
      title: '3. Variable-Level Checks',
      description: 'These checks ensure proper variable declaration, naming, and usage patterns.',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50/80 to-violet-50/80',
      textColor: 'text-purple-900',
      icon: BeakerIcon,
      rules: [
        {
          name: 'MemberName',
          whereUsed: 'Instance Variables',
          whatItChecks: 'Instance variable names should follow camelCase convention.',
          whyItMatters: 'Consistent naming improves code readability and maintainability.',
          commonViolations: [
            'private String user_name; // underscore not allowed',
            'private int MAX_SIZE; // constant-style naming for non-constant'
          ],
          correctUsage: [
            'private String userName; // proper camelCase',
            'private int maxSize; // proper camelCase for variable'
          ]
        },
        {
          name: 'LocalVariableName',
          whereUsed: 'Local Variables',
          whatItChecks: 'Local variable names should follow camelCase convention.',
          whyItMatters: 'Maintains consistency with Java naming conventions.',
          commonViolations: [
            'String file_name = "test.txt"; // underscore',
            'int Total_Count = 0; // mixed case with underscore'
          ],
          correctUsage: [
            'String fileName = "test.txt"; // proper camelCase',
            'int totalCount = 0; // proper camelCase'
          ]
        },
        {
          name: 'StaticVariableName',
          whereUsed: 'Static Variables',
          whatItChecks: 'Static variable names should follow camelCase (non-final) or UPPER_CASE (final).',
          whyItMatters: 'Distinguishes between constants and static variables.',
          commonViolations: [
            'static String default_value = "none"; // should be camelCase',
            'static final String default_timeout = "30"; // should be UPPER_CASE'
          ],
          correctUsage: [
            'static String defaultValue = "none"; // camelCase for non-final',
            'static final String DEFAULT_TIMEOUT = "30"; // UPPER_CASE for final'
          ]
        },
        {
          name: 'UnusedLocalVariable',
          whereUsed: 'Method Body',
          whatItChecks: 'Local variables that are declared but never used.',
          whyItMatters: 'Removes dead code; improves readability; may indicate logic errors.',
          commonViolations: [
            'public void calculate() {',
            '  int unusedVar = 10; // declared but never used',
            '  System.out.println("Done");',
            '}'
          ],
          correctUsage: [
            'public void calculate() {',
            '  // Remove unused variables',
            '  System.out.println("Done");',
            '}'
          ]
        }
      ]
    },
    {
      id: 'control-flow',
      title: '4. Loop/Control-Flow Checks',
      description: 'These checks ensure proper control flow structures and loop management.',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50/80 to-amber-50/80',
      textColor: 'text-orange-900',
      icon: CpuChipIcon,
      rules: [
        {
          name: 'ModifiedControlVariable',
          whereUsed: 'for Loops',
          whatItChecks: 'Control variables in for loops should not be modified within the loop body.',
          whyItMatters: 'Prevents confusing loop behavior; makes loop bounds predictable.',
          commonViolations: [
            'for (int i = 0; i < 10; i++) {',
            '  i += 2; // modifying control variable',
            '  System.out.println(i);',
            '}'
          ],
          correctUsage: [
            'for (int i = 0; i < 10; i += 2) { // modify in update clause',
            '  System.out.println(i);',
            '}'
          ]
        },
        {
          name: 'MissingSwitchDefault',
          whereUsed: 'switch Statements',
          whatItChecks: 'All switch statements should have a default clause.',
          whyItMatters: 'Handles unexpected values; improves robustness; documents all cases considered.',
          commonViolations: [
            'switch (dayOfWeek) {',
            '  case 1: return "Monday";',
            '  case 2: return "Tuesday";',
            '  // missing default clause',
            '}'
          ],
          correctUsage: [
            'switch (dayOfWeek) {',
            '  case 1: return "Monday";',
            '  case 2: return "Tuesday";',
            '  default: throw new IllegalArgumentException("Invalid day");',
            '}'
          ]
        },
        {
          name: 'SimplifyBooleanExpression',
          whereUsed: 'Boolean Expressions',
          whatItChecks: 'Boolean expressions that can be simplified.',
          whyItMatters: 'Improves readability; reduces complexity; eliminates redundancy.',
          commonViolations: [
            'if (condition == true) { ... } // redundant == true',
            'return (x > 0) ? true : false; // redundant ternary'
          ],
          correctUsage: [
            'if (condition) { ... } // simplified',
            'return x > 0; // direct boolean return'
          ]
        },
        {
          name: 'SimplifyBooleanReturn',
          whereUsed: 'Return Statements',
          whatItChecks: 'Boolean return statements that can be simplified.',
          whyItMatters: 'Reduces code complexity; improves readability.',
          commonViolations: [
            'if (x > 0) {',
            '  return true;',
            '} else {',
            '  return false;',
            '}'
          ],
          correctUsage: [
            'return x > 0; // simplified boolean return'
          ]
        }
      ]
    },
    {
      id: 'java-specific',
      title: '5. Java-Specific Checks',
      description: 'These checks address Java-specific patterns, conventions, and best practices.',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50/80 to-pink-50/80',
      textColor: 'text-rose-900',
      icon: SparklesIcon,
      rules: [
        {
          name: 'CovariantEquals',
          whereUsed: 'equals() Methods',
          whatItChecks: 'Classes that define equals(SomeType) should also override equals(Object).',
          whyItMatters: 'Ensures proper equals contract; prevents subtle bugs with collections.',
          commonViolations: [
            'public class Person {',
            '  public boolean equals(Person other) { ... } // covariant only',
            '  // missing equals(Object obj)',
            '}'
          ],
          correctUsage: [
            'public class Person {',
            '  @Override',
            '  public boolean equals(Object obj) { ... } // proper override',
            '}'
          ]
        },
        {
          name: 'DefaultComesLast',
          whereUsed: 'switch Statements',
          whatItChecks: 'The default clause should be the last clause in switch statements.',
          whyItMatters: 'Follows conventional ordering; improves readability.',
          commonViolations: [
            'switch (value) {',
            '  default: handleDefault(); break;',
            '  case 1: handleOne(); break; // default should be last',
            '}'
          ],
          correctUsage: [
            'switch (value) {',
            '  case 1: handleOne(); break;',
            '  case 2: handleTwo(); break;',
            '  default: handleDefault(); break; // default last',
            '}'
          ]
        },
        {
          name: 'StringLiteralEquality',
          whereUsed: 'String Comparisons',
          whatItChecks: 'String literals should not be compared using == or !=.',
          whyItMatters: 'Prevents bugs from reference vs. value comparison.',
          commonViolations: [
            'if (str == "hello") { ... } // reference comparison',
            'if (name != "admin") { ... } // reference comparison'
          ],
          correctUsage: [
            'if ("hello".equals(str)) { ... } // value comparison',
            'if (!"admin".equals(name)) { ... } // value comparison'
          ]
        },
        {
          name: 'EqualsHashCode',
          whereUsed: 'Class Definitions',
          whatItChecks: 'Classes that override equals() must also override hashCode().',
          whyItMatters: 'Maintains equals-hashCode contract; prevents bugs in hash-based collections.',
          commonViolations: [
            'public class Person {',
            '  @Override',
            '  public boolean equals(Object obj) { ... }',
            '  // missing hashCode() override',
            '}'
          ],
          correctUsage: [
            'public class Person {',
            '  @Override',
            '  public boolean equals(Object obj) { ... }',
            '  @Override',
            '  public int hashCode() { ... } // both overridden',
            '}'
          ]
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', count: checkstyleSections.reduce((acc, section) => acc + section.rules.length, 0) },
    ...checkstyleSections.map(section => ({
      id: section.id,
      label: section.title.replace(/^\d+\.\s*/, ''),
      count: section.rules.length
    }))
  ];

  const filteredSections = checkstyleSections.filter(section => {
    if (selectedCategory !== 'all' && section.id !== selectedCategory) return false;
    if (!searchTerm) return true;
    
    return section.rules.some(rule => 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whatItChecks.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whereUsed.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }).map(section => ({
    ...section,
    rules: section.rules.filter(rule =>
      !searchTerm || 
      rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whatItChecks.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.whereUsed.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

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
                  <CheckCircleIcon className="h-10 w-10 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold gradient-text">Checkstyle Reference</h1>
                  <p className="text-lg text-slate-600">Complete rules guide with examples</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="glass-card px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-emerald-600">33+ Rules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="sticky top-0 z-40 glass-card border-0 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search rules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-white/60 hover:bg-white/80 text-slate-700 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredSections.length === 0 ? (
          <div className="text-center py-16">
            <ExclamationTriangleIcon className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No rules found</h3>
            <p className="text-slate-500">Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredSections.map((section) => (
              <div key={section.id} className="study-card">
                <div className="p-8 border-b border-slate-200/60">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${section.color} p-3`}>
                      <section.icon className="w-full h-full text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">{section.title}</h2>
                      <p className="text-lg text-slate-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid gap-8">
                    {section.rules.map((rule, ruleIndex) => (
                      <div key={ruleIndex} className={`study-section bg-gradient-to-br ${section.bgColor} border-white/40`}>
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className={`text-2xl font-bold ${section.textColor} mb-2`}>{rule.name}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-slate-600 bg-white/60 px-3 py-1 rounded-full">
                                {rule.whereUsed}
                              </span>
                            </div>
                          </div>
                          <LightBulbIcon className={`h-8 w-8 ${section.textColor} opacity-60`} />
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className={`text-lg font-semibold ${section.textColor} mb-3 flex items-center`}>
                              <DocumentTextIcon className="h-5 w-5 mr-2" />
                              What it checks
                            </h4>
                            <p className="text-slate-700 leading-relaxed">{rule.whatItChecks}</p>
                          </div>

                          <div>
                            <h4 className={`text-lg font-semibold ${section.textColor} mb-3 flex items-center`}>
                              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                              Why it matters
                            </h4>
                            <p className="text-slate-700 leading-relaxed">{rule.whyItMatters}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                                <XMarkIcon className="h-5 w-5 mr-2" />
                                Common Violations
                              </h4>
                              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <pre className="text-sm text-red-800 whitespace-pre-wrap font-mono">
                                  {rule.commonViolations.join('\n')}
                                </pre>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center">
                                <CheckCircleIcon className="h-5 w-5 mr-2" />
                                Correct Usage
                              </h4>
                              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                <pre className="text-sm text-emerald-800 whitespace-pre-wrap font-mono">
                                  {rule.correctUsage.join('\n')}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Reference Tips */}
        <div className="mt-16 study-section bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/40">
          <div className="flex items-center mb-8">
            <SparklesIcon className="h-10 w-10 text-indigo-600 mr-4" />
            <h2 className="text-3xl font-bold text-indigo-900">Quick Reference Tips</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                <LightBulbIcon className="h-6 w-6 mr-2" />
                Understanding Rule Categories
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Class-Level:</strong> Focus on overall class design and structure</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Method-Level:</strong> Ensure good method design and implementation</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Variable-Level:</strong> Proper variable naming and usage patterns</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700"><strong>Control-Flow:</strong> Ensure clear and predictable program flow</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                <BeakerIcon className="h-6 w-6 mr-2" />
                Study Strategy
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Focus on the "Why it matters" - understand the reasoning behind each rule</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Practice identifying violations in code examples</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Remember that these rules promote readability and maintainability</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700">Use the search function to quickly find specific rules during review</span>
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
              SE3318: Checkstyle Reference - Complete Rules Guide
            </p>
            <p className="text-slate-500 mt-2">
              Understanding the "why" behind each rule is key to writing better code! 🎯✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 