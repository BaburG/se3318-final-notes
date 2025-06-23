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
  ClockIcon,
  QuestionMarkCircleIcon,
  PhotoIcon,
  RocketLaunchIcon,
  CodeBracketIcon,
  EyeSlashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Type definitions
interface ImageDescription {
  description: string;
}

interface CodeExample {
  title: string;
  language: string;
  type: string;
  code: string[];
}

interface PopQuiz {
  question: string;
  answer: string;
  imageDescription?: string;
  answerImageDescription?: string;
}

interface ContentBlock {
  subtitle: string;
  items?: string[];
  imageDescriptions?: ImageDescription[];
  codeExamples?: CodeExample[];
  popQuizzes?: PopQuiz[];
}

interface Section {
  title: string;
  content: ContentBlock[];
}

interface WeekContent {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  textColor: string;
  sections: Section[];
}

// A dedicated component for rendering code blocks
const CodeBlock = ({ title, code, type = 'neutral' }: { title: string, code: string[], type?: 'good' | 'bad' | 'neutral' }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const getColorClasses = () => {
    switch (type) {
      case 'good':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          icon: 'text-emerald-600'
        };
      case 'bad':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-600'
        };
      default:
        return {
          bg: 'bg-slate-50',
          border: 'border-slate-200',
          text: 'text-slate-800',
          icon: 'text-slate-600'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-3 sm:p-4 my-4 sm:my-6`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center">
          <CodeBracketIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.icon} mr-2 sm:mr-3`} />
          <span className={`font-semibold ${colors.text} text-sm sm:text-base`}>{title}</span>
        </div>
        {isCollapsed ? (
          <ChevronRightIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.text}`} />
        ) : (
          <ChevronDownIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.text}`} />
        )}
      </button>
      
      {!isCollapsed && (
        <div className="mt-2 sm:mt-3">
          <pre className={`${colors.text} text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto`}>
            {code.join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
};

// Component for Pop Quizzes
const PopQuizBlock = ({ question, answer, imageDescription, answerImageDescription }: { question: string, answer: string, imageDescription?: string, answerImageDescription?: string }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 sm:p-6 my-4 sm:my-6">
      <div className="flex items-center mb-3 sm:mb-4">
        <QuestionMarkCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mr-2 sm:mr-3" />
        <h4 className="text-base sm:text-lg font-semibold text-yellow-800">Pop Quiz</h4>
      </div>
      
      <p className="text-slate-700 mb-3 sm:mb-4 text-sm sm:text-base font-medium">{question}</p>
      
      {imageDescription && (
        <div className="bg-white/60 border border-yellow-200 rounded-lg p-3 mb-3 sm:mb-4">
          <div className="flex items-center mb-2">
            <PhotoIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 mr-2" />
            <span className="text-xs sm:text-sm font-medium text-slate-600">Visual Reference</span>
          </div>
          <p className="text-slate-700 text-xs sm:text-sm italic">{imageDescription}</p>
        </div>
      )}
      
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-yellow-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-yellow-700 transition-colors duration-200"
      >
        {showAnswer ? (
          <>
            <EyeSlashIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Hide Answer
          </>
        ) : (
          <>
            <EyeIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Show Answer
          </>
        )}
      </button>
      
      {showAnswer && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/80 border border-emerald-200 rounded-lg">
          <div className="flex items-center mb-2">
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mr-2" />
            <span className="text-sm sm:text-base font-medium text-emerald-800">Answer</span>
          </div>
          <p className="text-slate-700 text-sm sm:text-base">{answer}</p>
          
          {answerImageDescription && (
            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <PhotoIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mr-2" />
                <span className="text-xs sm:text-sm font-medium text-emerald-700">Answer Visual</span>
              </div>
              <p className="text-emerald-700 text-xs sm:text-sm italic">{answerImageDescription}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Component for Image/Diagram Descriptions
const ImageDescriptionBlock = ({ description }: { description: string }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-4 my-3 sm:my-4">
    <div className="flex items-center mb-2 sm:mb-3">
      <PhotoIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-500 mr-2" />
      <span className="text-sm sm:text-base font-medium text-slate-600">Visual Reference</span>
    </div>
    <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">{description}</p>
  </div>
);


export default function StudyNotes() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['week9']);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const weeklyContent: WeekContent[] = [
    {
      id: 'week9',
      title: 'Week 9: Working Classes',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50/80 to-cyan-50/80',
      textColor: 'text-blue-900',
      sections: [
        {
          title: 'Abstract Data Types (ADTs) & Key Principles',
          content: [
            {
              subtitle: 'Core Concepts',
              items: [
                'Abstraction: Hiding low-level details with a simpler, higher-level idea.',
                'Modularity: System can be divided into independent, testable components.',
                'Encapsulation: Hiding implementation details and enforcing access through public interfaces.',
                'Separation of Concerns: A feature is the responsibility of a single module.'
              ]
            },
            {
              subtitle: 'Liskov Substitution Principle (LSP)',
              items: [
                'Objects of a superclass shall be replaceable with objects of its subclasses without breaking the application.',
                'Preconditions: A subclass method\'s precondition must be weaker than or equal to the superclass\'s. (You can accept more, not less).',
                'Postconditions: A subclass method\'s postcondition must be stronger than or equal to the superclass\'s. (You must deliver as much or more).',
              ]
            },
            {
              subtitle: 'Law of Demeter (Principle of Least Knowledge)',
              items: [
                'An object should only "talk" to its immediate friends.',
                'Avoid "reaching through" objects. This creates tight coupling and makes code brittle.',
              ],
              imageDescriptions: [
                {
                  description: 'A diagram shows an object `a:A` correctly calling methods (`doB()`, `dox()`) on its direct friend `b:B`. An invalid call is shown as a red line where `a` tries to "reach through" `b` to call a method (`doC()`) on an inner object `c:C`.'
                }
              ]
            }
          ]
        },
        {
          title: 'Good Encapsulation (with Checkstyle Rules)',
          content: [
            {
              subtitle: 'Check: VisibilityModifier',
              items: ['Ensures proper visibility of class members. By default, fields should be private.'],
              codeExamples: [
                {
                  title: 'VisibilityModifier Violations',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'class Example1 {',
                    '    // violation below, must have a visibility modifier \'must be private\'',
                    '    int field1;',
                    '    // violation below, protected not allowed \'must be private\'',
                    '    protected String field2;',
                    '    // violation below, not final \'must be private\'',
                    '    public int field3 = 42;',
                    '    // violation below, public immutable fields are not allowed \'must be private\'',
                    '    public final int field5 = 42;',
                    '    // violation below, HashSet is mutable \'must be private\'',
                    '    public final Set<String> mySet1 = new HashSet<>();',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: 'Check: FinalClass',
              items: ['Ensures that classes that cannot or should not be subclassed are marked as `final`. This applies to classes with only private constructors.'],
              codeExamples: [
                {
                  title: 'FinalClass Violation',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'class B { // violation, \'Class B should be declared as final.\'',
                    '    private B() {',
                    '    }',
                    '}'
                  ]
                }
              ],
              popQuizzes: [
                {
                  question: 'When do you need private constructors?',
                  answer: 'For design patterns like the Singleton Pattern (to ensure only one instance is ever created) or the Factory Pattern (to control object creation through a static method).'
                }
              ]
            },
            {
              subtitle: 'Check: HideUtilityClassConstructor',
              items: ['Utility classes (those with only static members) should have a private constructor to prevent instantiation.'],
              codeExamples: [
                {
                  title: 'Correct Utility Class with Exception',
                  language: 'java',
                  type: 'good',
                  code: [
                    'public class StringUtils // not final to allow subclassing',
                    '{',
                    '    protected StringUtils() {',
                    '        // prevents calls from subclass',
                    '        throw new UnsupportedOperationException();',
                    '    }',
                    '    public static int count(char c, String s) { ... }',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: 'Check: DesignForExtension',
              items: ['Protects superclasses from being broken by subclasses. Overridable methods in non-final classes must be abstract, have an empty "hook" implementation, or be documented with Javadoc.'],
              codeExamples: [
                {
                  title: 'Bad Design for Extension',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'public abstract class Plant {',
                    '    // This method can be overridden, but has a concrete implementation.',
                    '    // A subclass might forget to call super.validate(), breaking the contract.',
                    '    protected void validate() {',
                    '        if (roots == null) throw new IllegalArgumentException("No roots!");',
                    '    }',
                    '}'
                  ]
                },
                {
                  title: 'Good Design for Extension (Hook Method)',
                  language: 'java',
                  type: 'good',
                  code: [
                    'public abstract class Plant {',
                    '    private void validate() {',
                    '        if (roots == null) throw new ...;',
                    '        validateEx(); // Call the hook for subclasses',
                    '    }',
                    '    // Subclasses can override this empty hook to add their own validation.',
                    '    protected void validateEx() {}',
                    '}'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Good Abstraction & Inheritance',
          content: [
            {
              subtitle: 'Check: AbstractClassName',
              items: ['Ensures abstract class names conform to a pattern, typically starting with "Abstract".'],
              codeExamples: [
                {
                  title: 'AbstractClassName Examples',
                  language: 'java',
                  type: 'neutral',
                  code: [
                    'class Example1 {',
                    '    abstract class AbstractFirst {} // OK',
                    '    abstract class Second {} // violation \'must match pattern\'',
                    '    class AbstractThird {} // violation \'must be declared as \'abstract\'\'',
                    '    abstract class GeneratorFifth {} // violation \'must match pattern\'',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: 'Check: ClassDataAbstractionCoupling & ClassFanOutComplexity',
              items: [
                'These checks measure coupling. High coupling (depending on many other classes) is bad.',
                'ClassDataAbstractionCoupling: Counts instantiations of other classes.',
                'ClassFanOutComplexity: Counts all types a class relies on (imports, fields, etc.).',
                'Aim for LOW coupling.'
              ]
            },
            {
              subtitle: 'Check: InterfaceIsType',
              items: ['An interface should define a type (behavior) by having methods, not just be a holder for constants.'],
              codeExamples: [
                {
                  title: 'InterfaceIsType Violation',
                  language: 'java',
                  type: 'bad',
                  code: [
                    '// violation, interfaces should describe a type and hence have methods.',
                    'interface Test1 {',
                    '    int a = 3;',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: 'Check: AvoidStarImport',
              items: ['Avoid `import java.util.*;`. Be explicit about dependencies to reduce coupling and avoid name clashes.'],
            },
            {
              subtitle: 'Check: MissingOverride',
              items: ['Verifies that the `@Override` annotation is present when a method overrides a superclass method.'],
            }
          ]
        },
        {
          title: 'Member Functions & Class Internals',
          content: [
            {
              subtitle: 'Check: MissingCtor',
              items: ['Checks that non-abstract classes define a constructor instead of relying on the default one.'],
            },
            {
              subtitle: 'Check: OverloadedMethodsDeclarationOrder',
              items: ['Checks that overloaded methods are grouped together in the source file.'],
            },
            {
              subtitle: 'Check: InnerTypeLast',
              items: ['Ensures nested classes/interfaces are declared at the bottom of the class for better readability.'],
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
          title: 'Reasons to Create a Routine',
          content: [
            {
              subtitle: 'Core Motivations',
              items: [
                'Understandable Abstraction: Hide complex logic behind a simple, well-named routine.',
                'Avoid Duplicate Code: Follow the DRY (Don\'t Repeat Yourself) principle.',
                'Support Subclassing: Create methods that can be overridden by subclasses.',
                'Improve Portability: Isolate non-portable code (OS/hardware dependencies) in one place.'
              ],
              codeExamples: [
                {
                  title: 'Abstraction Example',
                  language: 'pseudocode',
                  type: 'good',
                  code: [
                    '// Instead of this complex logic:',
                    'if (node <> NULL) then',
                    '  while (node.next <> NULL) do',
                    '    node = node.next',
                    '    leafName = node.name',
                    '  end while',
                    'else',
                    '  leafName = ""',
                    'end if',
                    '',
                    '// Use a simple, abstract routine:',
                    'leafName = GetLeafName(node)'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Cohesion in Routines',
          content: [
            {
              subtitle: 'Types of Cohesion (Best to Worst)',
              items: [
                'Functional Cohesion (Best): Performs one and only one operation.',
                'Sequential Cohesion: Operations must be performed in a specific order, sharing data between steps.',
                'Communicational Cohesion: Operations use the same data but are otherwise unrelated.',
                'Temporal Cohesion: Operations are grouped because they happen at the same time (e.g., `startup()`).',
                'Logical Cohesion (Worst): Operations are grouped into a grab-bag routine, and a flag decides which one to run.'
              ]
            },
            {
              subtitle: 'Pop Quizzes on Cohesion',
              popQuizzes: [
                {
                  question: 'Does the following `printReport` routine have functional cohesion?',
                  imageDescription: 'A diagram shows `dostuff(data)` calling `printReport(data)`. The implementation of `printReport(data)` then calls `doCalculation(stuffSummary(data))`. This means the print routine is also doing calculations.',
                  answer: 'No. Because `printReport` was doing more than just printing. It was also performing a calculation, which violates the principle of functional cohesion. A better design would be to perform the calculation outside and pass the result to the print routine.'
                },
                {
                  question: 'Is the following method communicationally cohesive?',
                  imageDescription: 'A diagram shows `doStuff(birthDate)` calling `calculateRetirement(age, birthDate)`. The implementation of `calculateRetirement` calls `checkBirthdate(birthDate)` and `calculateStuff(age)`. The two operations use different data passed into the same routine.',
                  answer: 'It could be better. It would be more communicationally cohesive if it only took `birthDate` as a parameter and calculated the age internally, since both operations ultimately derive from the birth date. This would make the routine operate on a more unified set of data.'
                },
                {
                  question: 'How would the refactored `calculateRetirement` routine look if it were functionally cohesive?',
                  imageDescription: 'The previous answer refactored `calculateRetirement` to take only `birthDate`. It then calls `checkBirthdate`, calculates age, and calls `calculateStuff`.',
                  answer: 'To be truly functionally cohesive, it should be broken down further. The `calculateRetirement` routine could call two other routines: `checkBirthdate(birthDate)` and a new, more focused `calculateRetirementTime(birthDate)`. This separates the validation from the calculation.',
                  answerImageDescription: 'A new diagram shows `calculateRetirement(birthDate)` calling `checkBirthdate(birthDate)` and `calculateRetirementTime(birthDate)`. The `calculateRetirementTime` routine then contains the age calculation and the final calculation.'
                },
                {
                  question: 'Is the last design functionally cohesive enough?',
                  imageDescription: 'The previous answer refactored `calculateRetirementTime` to calculate age internally.',
                  answer: 'It is better, but to be ideal, the age calculation itself should be in its own functionally cohesive method, `calculateAge(birthDate)`. This makes the `calculateAge` routine highly reusable and focused on a single task.',
                  answerImageDescription: 'The final diagram shows `calculateRetirementTime` calling a new `calculateAge(birthDate)` method instead of calculating it inline.'
                }
              ]
            }
          ]
        },
        {
          title: 'Routine Naming and Parameters',
          content: [
            {
              subtitle: 'Naming Best Practices',
              items: [
                'Describe Everything the Routine Does: The name must be an honest summary of its behavior and ALL side effects.',
                'Avoid Meaningless Verbs: Don\'t use vague words like `Handle`, `Perform`, `Process`. Be specific.',
                'Use Strong Verb + Object: `PrintDocument()`, `CheckOrderInfo()`.',
                'For functions, describe the return value: `printer.isReady()`, `customerId.next()`.',
              ]
            },
            {
              subtitle: 'Parameter Best Practices',
              items: [
                'Use All Parameters: If a parameter is passed, it must be used. If not, remove it.',
                'Don\'t Use Parameters as Working Variables: Assign the parameter to a local variable and modify that instead. The `FinalParameters` Checkstyle rule helps enforce this.',
              ]
            }
          ]
        },
        {
          title: 'Checkstyle for Routines',
          content: [
            {
              subtitle: 'Key Checks',
              items: [
                '`MethodName`: Enforces naming conventions (e.g., camelCase).',
                '`MethodLength`: Restricts the number of lines in a method to encourage refactoring.',
                '`FinalParameters`: Ensures parameters are marked `final`.',
                '`ParameterNumber`: Limits the number of parameters a method can have.',
                '`ReturnCount`: Restricts the number of `return` statements.',
                '`RequireThis`: Enforces explicit use of `this` for instance members to avoid ambiguity.',
                '`CovariantEquals`, `SuperClone`, `SuperFinalize`: Enforce correct implementation of core Java methods.'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'week11',
      title: 'Week 11: Using Variables',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50/80 to-violet-50/80',
      textColor: 'text-purple-900',
      sections: [
        {
          title: 'Variable Declarations & Initialization',
          content: [
            {
              subtitle: 'Best Practices & Related Checks',
              items: [
                'Follow Naming Conventions: Use `MemberName`, `LocalVariableName`, `StaticVariableName`, `LocalFinalVariableName` to enforce consistent naming.',
                'One Declaration Per Line: Avoid `int x, y;`. (See `MultipleVariableDeclarations` check).',
                'Initialize Close to First Use: This minimizes the variable\'s "live time". (See `VariableDeclarationUsageDistance` check).',
                'Avoid Redundant Initialization: Don\'t initialize to default values like `int x = 0;` or `Object o = null;`. (See `ExplicitInitialization` check).',
                'Unchanged variables should be `final`. (See `FinalLocalVariable` check).'
              ],
              codeExamples: [
                {
                  title: 'Check: MultipleVariableDeclarations',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'int lower, higher; // violation',
                    'int value,',
                    '    index; // violation'
                  ]
                },
                {
                  title: 'Check: ExplicitInitialization',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'private int intField1 = 0; // violation',
                    'private Obj objField1 = null; // violation'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Scope and "Live Time"',
          content: [
            {
              subtitle: 'Minimizing Variable Scope',
              items: [
                'Live Time: The total number of statements over which a variable is "live" (from its first to last use). A shorter live time is better.',
                'Principle: Keep variables live for as short a time as possible by declaring them close to their first use.',
              ],
              codeExamples: [
                {
                  title: 'Long Live Time (Average: 54)',
                  language: 'pseudocode',
                  type: 'bad',
                  code: [
                    '1  // initialize all variables at top of routine',
                    '2  recordIndex = 0;',
                    '3  total = 0;',
                    '4  done = false;',
                    '...',
                    '28 // Last reference to recordIndex (Live Time: 27)',
                    '...',
                    '69 // Last reference to total (Live Time: 67)',
                    '70 // Last reference to done (Live Time: 67)'
                  ]
                },
                {
                  title: 'Short Live Time (Average: 7)',
                  language: 'pseudocode',
                  type: 'good',
                  code: [
                    '...',
                    '25 recordIndex = 0; // Declared right before use',
                    '26 while(recordIndex < recordCount) {',
                    '28   // Last reference to recordIndex (Live Time: 4)',
                    '}',
                    '...',
                    '62 total = 0; // Declared right before use',
                    '63 done = false;',
                    '64 while(!done) {',
                    '69   // Last reference to total (Live Time: 8)',
                    '70   // Last reference to done (Live Time: 8)',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: 'Check: VariableDeclarationUsageDistance',
              items: [
                'This check enforces the principle of minimizing scope by flagging variables declared too far from their first use.'
              ],
              codeExamples: [
                {
                  title: 'Violation of Usage Distance',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'public void foo() {',
                    '    int num; // violation, distance = 4',
                    '    System.out.println("Statement 1");',
                    '    System.out.println("Statement 2");',
                    '    System.out.println("Statement 3");',
                    '    num = 1;',
                    '}'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'One Purpose Per Variable',
          content: [
            {
              subtitle: 'Avoid Reusing Variables',
              items: [
                'Using a variable for multiple, unrelated purposes makes the code extremely difficult to understand and maintain.',
                'Avoid "hidden meanings" where a variable\'s value changes its purpose (e.g., `pageCount = -1` means an error). Use separate status variables instead.',
                'All declared variables must be used. (See `UnusedLocalVariable` check).'
              ],
              codeExamples: [
                {
                  title: 'Bad Practice: Reusing `temp`',
                  language: 'cpp',
                  type: 'bad',
                  code: [
                    '// temp is used for the discriminant',
                    'temp = Sqrt( b*b - 4*a*c );',
                    'root[0] = ( -b + temp ) / ( 2 * a );',
                    '// ...',
                    '// temp is reused for swapping',
                    'temp = root[0];',
                    'root[0] = root[1];',
                    'root[1] = temp;'
                  ]
                },
                {
                  title: 'Good Practice: Separate Variables',
                  language: 'cpp',
                  type: 'good',
                  code: [
                    'discriminant = Sqrt( b*b - 4*a*c );',
                    'root[0] = ( -b + discriminant ) / ( 2 * a );',
                    '// ...',
                    'oldRoot = root[0];',
                    'root[0] = root[1];',
                    'root[1] = oldRoot;'
                  ]
                }
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
          title: 'Loop Selection & Control',
          content: [
            {
              subtitle: 'Choosing the Right Loop',
              items: [
                'Don\'t abuse a `for` loop\'s structure for logic that fits better in a `while` loop.',
              ],
              codeExamples: [
                {
                  title: 'Abusive `for` Loop',
                  language: 'cpp',
                  type: 'bad',
                  code: [
                    '// read all the records from a file',
                    'for (inputFile.MoveToStart(), recordCount = 0;',
                    '     !inputFile.EndOfFile();',
                    '     recordCount++ ) {',
                    '    inputFile.GetRecord();',
                    '}'
                  ]
                },
                {
                  title: 'Appropriate `while` Loop',
                  language: 'cpp',
                  type: 'good',
                  code: [
                    'inputFile.MoveToStart();',
                    'recordCount = 0;',
                    'while (!inputFile.EndOfFile()) {',
                    '    inputFile.GetRecord();',
                    '    recordCount++;',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: 'Processing the Middle of the Loop',
              items: [
                'Always use braces `{}` to enclose loop statements (`NeedBraces`).',
                'Avoid empty loops. If a loop is empty, it\'s often a bug or can be rewritten more clearly (`EmptyBlock`).'
              ],
              codeExamples: [
                {
                  title: 'Unclear Empty Loop',
                  language: 'cpp',
                  type: 'bad',
                  code: [
                    'while ( ( inputChar = dataFile.GetChar() ) != CharType_Eof ) { ;',
                    '}'
                  ]
                },
                {
                  title: 'Clearer `do-while` Loop',
                  language: 'cpp',
                  type: 'good',
                  code: [
                    'do {',
                    '    inputChar = dataFile.GetChar();',
                    '} while (inputChar != CharType_Eof);'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Loop Exits',
          content: [
            {
              subtitle: 'Check: ModifiedControlVariable',
              items: [
                'To terminate a `for` loop early, use a `break` statement. Directly manipulating the loop index is confusing and error-prone.',
              ],
              codeExamples: [
                {
                  title: 'Bad Practice: Monkeying with Loop Index',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'for (int i = 0; i < 100; i++) {',
                    '    if ( ... ) {',
                    '        i = 100; // Here is the monkeying.',
                    '    }',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: '`break` vs. Boolean Flags',
              items: [
                'Using `break` is often clearer and less error-prone than setting a boolean flag to control loop termination.'
              ]
            },
            {
              subtitle: 'Using `continue`',
              items: [
                '`continue` should be used sparingly, and preferably at the top of a loop to skip an iteration based on a simple condition. If the logic is complex, a nested `if` is usually clearer.'
              ]
            }
          ]
        },
        {
          title: 'Loop Variables, Length, and Nesting',
          content: [
            {
              subtitle: 'Use Meaningful Names',
              items: [
                'Generic names like `i`, `j`, `k` are acceptable for short, simple loops, but descriptive names are better for nested or complex loops.',
              ],
              codeExamples: [
                {
                  title: 'Bad Loop Variable Names',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'for ( int i = 0; i < numPayCodes; i++ ) {',
                    '    for ( int j = 0; j < 12; j++ ) {',
                    '        for ( int k = 0; k < numDivisions; k++ ) {',
                    '            sum = sum + transaction[j][i][k];',
                    '        }',
                    '    }',
                    '}'
                  ]
                },
                {
                  title: 'Good Loop Variable Names',
                  language: 'java',
                  type: 'good',
                  code: [
                    'for ( int payCodeIdx = 0; payCodeIdx < numPayCodes; payCodeIdx++ ) {',
                    '    for (int month = 0; month < 12; month++ ) {',
                    '        for ( int divisionIdx = 0; ... ) {',
                    '            sum = sum + transaction[month][payCodeIdx][divisionIdx];',
                    '        }',
                    '    }',
                    '}'
                  ]
                }
              ]
            },
            {
              subtitle: 'Length and Nesting Guidelines',
              items: [
                'Keep loops short enough to be viewed all at once.',
                'Limit nesting to three levels. Deeper nesting becomes very hard to comprehend and should be refactored into separate routines.'
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
          title: '`if-then-else` Statements',
          content: [
            {
              subtitle: 'Handle the Normal Case First',
              items: [
                'Structure your code so the normal, most frequent path of execution is clear and not interrupted by nested error-handling.',
              ],
              codeExamples: [
                {
                  title: 'Haphazard Error Handling',
                  language: 'vb',
                  type: 'bad',
                  code: [
                    'OpenFile( inputFile, status )',
                    'If ( status = Status_Error ) Then',
                    '    errorType = FileOpenError',
                    'Else',
                    '    ReadFile( inputFile, fileData, status )',
                    '    If ( status = Status_Success ) Then ...',
                    'End If'
                  ]
                },
                {
                  title: 'Systematic "Follow the Normal Path" Handling',
                  language: 'vb',
                  type: 'good',
                  code: [
                    'OpenFile( inputFile, status )',
                    'If ( status = Status_Success ) Then',
                    '    ReadFile( inputFile, fileData, status )',
                    '    If ( status = Status_Success ) Then',
                    '        // ... nominal path continues',
                    '    Else',
                    '        errorType = ErrorType_FileReadError',
                    '    End If',
                    'Else',
                    '    errorType = ErrorType_FileOpenError',
                    'End If'
                  ]
                }
              ]
            },
            {
              subtitle: 'Simplify with Boolean Functions',
              items: [
                'Instead of long, complex boolean expressions in an `if` statement, encapsulate the logic in a well-named boolean function.'
              ]
            },
            {
              subtitle: 'Related Checkstyle Rules',
              items: [
                '`NestedIfDepth`: Restricts how deeply `if` statements can be nested.',
                '`NeedBraces`: Enforces the use of `{}` for all conditional blocks.',
                '`EmptyStatement`: Catches stray semicolons like `if (condition);`.',
                '`SimplifyBooleanExpression`: Simplifies expressions like `if (b == true)`.',
                '`SimplifyBooleanReturn`: Simplifies `if (c) return true; else return false;` to `return c;`.'
              ]
            }
          ]
        },
        {
          title: '`switch` Statements',
          content: [
            {
              subtitle: 'Best Practices',
              items: [
                'Use for a single variable with many distinct, mutually exclusive values.',
                'Order cases effectively: alphabetically, numerically, or by frequency.',
                'Always include a `default` clause to handle unexpected cases. (`MissingSwitchDefault`)',
                'The `default` clause should come last. (`DefaultComesLast`)',
                'Clearly comment any intentional fall-throughs. (`FallsThrough`)'
              ]
            },
            {
              subtitle: 'Polymorphism vs. `switch`',
              items: [
                'Using a `switch` statement to perform different actions based on an object\'s type is often a sign that you should be using polymorphism instead.',
              ],
              codeExamples: [
                {
                  title: 'Bad Practice: `switch` on Type',
                  language: 'java',
                  type: 'bad',
                  code: [
                    'switch (a.getType()) {',
                    '    case CLASSA:',
                    '        System.out.println("class a");',
                    '        break;',
                    '    case CLASSB:',
                    '        System.out.println("class b");',
                    '        break;',
                    '}'
                  ]
                },
                {
                  title: 'Good Practice: Polymorphism',
                  language: 'java',
                  type: 'good',
                  code: [
                    '// Each class implements the doWork() method from an interface',
                    'a.doWork(); // Java determines which implementation to call'
                  ]
                }
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
          title: 'Barricades: Separating Clean and Dirty Data',
          content: [
            {
              subtitle: 'The Concept',
              items: [
                'A &quot;barricade&quot; is a boundary in your code that separates trusted (&quot;clean&quot;) data from untrusted (&quot;dirty&quot;) data.',
                'Public methods form the barricade. They must validate and sanitize all external inputs.',
                'Private methods exist inside the barricade and can assume the data they receive is clean and safe.'
              ],
              imageDescriptions: [
                {
                  description: 'A diagram shows external data sources (GUI, CLI, Files) as &quot;dirty and untrusted&quot;. This data flows into &quot;the barricade,&quot; which consists of validation classes. Data that passes through the barricade flows to the internal classes, which can assume the data is &quot;clean and trusted&quot;.'
                }
              ]
            }
          ]
        },
        {
          title: 'Assertions vs. Exceptions',
          content: [
            {
              subtitle: 'Key Differences',
              items: [
                'Assertions: For development-time checks to catch programming errors (bugs). They check for conditions that should be IMPOSSIBLE if the code is correct. They are disabled in production.',
                'Exceptions: For handling errors that can occur at runtime, even with correct code (e.g., file not found). They are part of the program&apos;s normal error-handling flow.',
                'An assertion failure means there is a bug in the code. An exception means an external condition or user action caused an error that the program might be able to recover from.'
              ]
            },
            {
              subtitle: 'Using Assertions for Preconditions and Postconditions',
              items: [
                'Assertions are an excellent way to document and verify the "contract" of a routine.'
              ],
              codeExamples: [
                {
                  title: 'Documenting Pre/Postconditions with Assertions',
                  language: 'vb',
                  type: 'good',
                  code: [
                    'Private Function CalculateVelocity(...)',
                    '    \' Preconditions',
                    '    Debug.Assert ( -90 <= latitude And latitude <= 90 )',
                    '    Debug.Assert ( 0 <= longitude And longitude < 360 )',
                    '    ...',
                    '    \' Postconditions',
                    '    Debug.Assert ( 0 <= returnVelocity And returnVelocity <= 600 )',
                    'End Function'
                  ]
                }
              ]
            },
            {
              subtitle: 'CRITICAL: Do NOT Put Executable Code in Assertions',
              items: [
                'Code inside an `assert` statement will not run in production, leading to critical bugs if it has side effects.',
              ],
              codeExamples: [
                {
                  title: 'Dangerous Use of Assertion',
                  language: 'vb',
                  type: 'bad',
                  code: [
                    'Debug.Assert( PerformAction() ) \' This call disappears in production!'
                  ]
                },
                {
                  title: 'Safe Use of Assertion',
                  language: 'vb',
                  type: 'good',
                  code: [
                    'actionPerformed = PerformAction()',
                    'Debug.Assert( actionPerformed ) \' Checks the result without side effects'
                  ]
                }
              ]
            }
          ]
        },
        {
            title: 'Exception Handling',
            content: [
                {
                    subtitle: 'Best Practices',
                    items: [
                        'Throw an exception only for conditions that are truly exceptional, not for normal control flow.',
                        'Avoid throwing exceptions in constructors and destructors, as it can lead to resource leaks in some languages (like C++).',
                        'Throw exceptions at the right level of abstraction. A business object `Employee` should throw `EmployeeDataNotAvailable`, not a low-level `EOFException`.',
                        'Include all relevant information in the exception message to aid in debugging.',
                        'Avoid empty `catch` blocks. At a minimum, log the exception.'
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
          title: 'Replacing Logic with Tables',
          content: [
            {
              subtitle: 'Benefit: Simplicity and Maintainability',
              items: [
                'Complex conditional logic can often be replaced by a simple data lookup, making the code cleaner and easier to update.',
              ],
              codeExamples: [
                {
                  title: 'Complicated Logic',
                  language: 'java',
                  type: 'bad',
                  code: [
                    "if ((( 'a' <= inputChar ) && ( inputChar <= 'z' )) || ... ) {",
                    "    charType = CharacterType.Letter;",
                    "} else if (( inputChar == '.' ) || ... ) {",
                    "    charType = CharacterType.Punctuation;",
                    "}"
                  ]
                },
                {
                  title: 'Lookup Table (Direct Access)',
                  language: 'java',
                  type: 'good',
                  code: [
                    '// Assuming charTypeTable is pre-filled',
                    'charType = charTypeTable[ inputChar ];'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Types of Table Access',
          content: [
            {
              subtitle: 'Direct Access',
              items: [
                'Use the input value directly as an index. Fastest method (O(1)).',
                'Best for small, dense, contiguous input ranges (e.g., months 1-12).',
                'Wastes memory if the range is large and sparse.'
              ],
              codeExamples: [
                {
                  title: 'Direct Access for Days in Month',
                  language: 'vb',
                  type: 'good',
                  code: [
                    'Dim daysPerMonth() As Integer = { 31, 28, 31, ... }',
                    'days = daysPerMonth( month - 1 )'
                  ]
                }
              ]
            },
            {
              subtitle: 'Indexed Access',
              items: [
                'Use an intermediate index to map a sparse input range to a smaller, dense data table.',
                'More memory-efficient for sparse data than direct access.',
                'Requires an extra lookup step.'
              ],
              imageDescriptions: [
                {
                  description: 'A diagram shows a large, mostly empty array of indexes. A few entries in this array point to a smaller, dense lookup table. This illustrates how a large, sparse input range can be mapped to a compact data table.'
                }
              ]
            },
            {
              subtitle: 'Stair-Step Access',
              items: [
                'Used when a value corresponds to a range of inputs (e.g., grading, tax brackets).',
                'Involves searching through an array of range boundaries.',
                'Typically uses a sequential search (O(N)), which is slower than direct access. Can be optimized with a binary search.',
                'Endpoints are critical: be careful with `<` vs. `<=`.',
              ],
              codeExamples: [
                {
                  title: 'Stair-Step Table for Grading',
                  language: 'vb',
                  type: 'good',
                  code: [
                    'Dim rangeLimit() As Double = { 50.0, 65.0, 75.0, 90.0, 100.0 }',
                    'Dim grade() As String = { "F", "D", "C", "B", "A" }',
                    '...',
                    'gradeLevel = 0',
                    'studentGrade = "A"',
                    'While ( ( studentGrade = "A") and ( gradeLevel < maxGradeLevel ) )',
                    '    If ( studentScore < rangeLimit( gradeLevel ) ) Then',
                    '        studentGrade = grade( gradeLevel )',
                    '    End If',
                    '    gradeLevel = gradeLevel + 1',
                    'Wend'
                  ]
                }
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 sm:py-8 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4 order-2 sm:order-1">
                <Link
                  href="/"
                  className="nav-link text-slate-600 hover:text-slate-800 flex items-center text-sm sm:text-base"
                >
                  <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  Back to Hub
                </Link>
                <Link
                  href="/quick-reference"
                  className="nav-link text-slate-600 hover:text-slate-800 flex items-center text-sm sm:text-base"
                >
                  <RocketLaunchIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  Quick Reference
                </Link>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 order-1 sm:order-2">
                <div className="floating-element">
                  <BookOpenIcon className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">Study Notes</h1>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-600">SE3318: Software Construction</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 order-3">
                <div className="glass-card px-2 sm:px-3 py-1 rounded-full">
                  <span className="text-xs sm:text-sm font-medium text-indigo-600">Weeks 9-14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Navigation */}
      <div className="sticky top-0 z-40 glass-card border-0 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2 sm:mb-3 flex items-center">
            <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-500" />
            Quick Navigation
          </h2>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {weeklyContent.map((week) => (
              <button
                key={week.id}
                onClick={() => {
                  const element = document.getElementById(week.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                  if (!expandedSections.includes(week.id)) {
                    toggleSection(week.id);
                  }
                }}
                className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium bg-white/60 hover:bg-white/80 text-slate-700 rounded-xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                {week.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {weeklyContent.map((week) => (
            <div key={week.id} id={week.id} className="study-card scroll-mt-24">
              <div className="p-6 sm:p-8 border-b border-slate-200/60">
                <button
                  onClick={() => toggleSection(week.id)}
                  className="w-full flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r ${week.color} p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300`}>
                      <AcademicCapIcon className="w-full h-full text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">{week.title}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="glass-card px-2 sm:px-3 py-1 rounded-full">
                      <ClockIcon className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500 inline mr-1" />
                      <span className="text-xs sm:text-sm text-slate-600">{week.sections.length} topics</span>
                    </div>
                    {expandedSections.includes(week.id) ? (
                      <ChevronDownIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500 transition-transform duration-200" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500 transition-transform duration-200" />
                    )}
                  </div>
                </button>
              </div>

              {expandedSections.includes(week.id) && (
                <div className="p-6 sm:p-8">
                  <div className="space-y-6 sm:space-y-8">
                    {week.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className={`study-section bg-gradient-to-br ${week.bgColor} border-white/40`}>
                        <h3 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center ${week.textColor}`}>
                          <DocumentTextIcon className="h-6 w-6 sm:h-7 sm:w-7 mr-2 sm:mr-3" />
                          {section.title}
                        </h3>
                        
                        <div className="space-y-4 sm:space-y-6">
                          {section.content.map((contentBlock, contentIndex) => (
                            <div key={contentIndex}>
                              <h4 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center ${week.textColor}`}>
                                <LightBulbIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                                {contentBlock.subtitle}
                              </h4>
                              {contentBlock.items && (
                                <ul className="space-y-2 sm:space-y-3">
                                  {contentBlock.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start group">
                                      <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-3 sm:mr-4 mt-1 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                                      <span className="text-slate-700 leading-relaxed text-sm sm:text-base">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {contentBlock.imageDescriptions && contentBlock.imageDescriptions.map((desc: ImageDescription, descIndex: number) => (
                                <ImageDescriptionBlock key={descIndex} description={desc.description} />
                              ))}
                              {contentBlock.codeExamples && contentBlock.codeExamples.map((ex: CodeExample, exIndex: number) => (
                                <CodeBlock key={exIndex} title={ex.title} code={ex.code} type={ex.type as 'good' | 'bad' | 'neutral'} />
                              ))}
                              {contentBlock.popQuizzes && contentBlock.popQuizzes.map((quiz: PopQuiz, quizIndex: number) => (
                                <PopQuizBlock key={quizIndex} question={quiz.question} answer={quiz.answer} imageDescription={quiz.imageDescription} answerImageDescription={quiz.answerImageDescription} />
                              ))}
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
        <div className="mt-12 sm:mt-16 study-section bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border-indigo-200/40">
          <div className="flex items-center mb-6 sm:mb-8">
            <ExclamationTriangleIcon className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600 mr-3 sm:mr-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900">Study Tips for Final Exam Success</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 flex items-center">
                <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                Focus Areas
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Understand WHY each Checkstyle rule exists (readability, maintainability, preventing errors).</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Know common violations and correct usage examples for key rules.</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Master the principles: LSP, Law of Demeter, Cohesion types.</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Understand defensive programming concepts: Assertions vs. Exceptions.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 flex items-center">
                <AcademicCapIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                Key Concepts
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Method naming: Strong verb + object, describe return value and side effects.</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Variable scope: Keep &quot;live time&quot; short, declare close to first use.</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Loop control: Don&apos;t modify control variables, watch for off-by-one errors.</span>
                </li>
                <li className="flex items-start group">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-500 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                  <span className="text-slate-700 text-sm sm:text-base">Table-driven methods: Know the trade-offs of Direct vs. Indexed vs. Stair-step access.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-0 border-t border-white/20 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <p className="text-slate-600 text-base sm:text-lg">
              SE3318: Software Construction - Study Notes (Weeks 9-14)
            </p>
            <p className="text-slate-500 mt-2 text-sm sm:text-base">
              Review regularly and practice with code examples! 📚✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}