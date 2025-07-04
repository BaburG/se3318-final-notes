'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  BeakerIcon,
  TrophyIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function CheckstyleQuiz() {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [shuffledRules, setShuffledRules] = useState<typeof checkstyleRules>([]);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // All Checkstyle rules data from the reference page
  const checkstyleRules = useMemo(() => [
    // Class-Level Checks
    {
      name: 'VisibilityModifier',
      category: 'Class-Level',
      whereUsed: 'Class Members',
      whatItChecks: 'Ensures proper visibility of class members. By default, fields should be private. Only static final or truly immutable fields may be public.',
      whyItMatters: 'Enforces good encapsulation; hides implementation details; reduces external dependencies.',
      commonViolations: 'int field1; // violation, must have a visibility modifier',
      correctUsage: 'private int myPrivateField1;'
    },
    {
      name: 'FinalClass',
      category: 'Class-Level',
      whereUsed: 'Class Declaration',
      whatItChecks: 'Ensures that classes that can be effectively final are marked as such (e.g., classes with only private constructors).',
      whyItMatters: 'Prevents unnecessary or unsafe subclassing; signals design intent.',
      commonViolations: 'class B { private B() {} } // violation, should be final',
      correctUsage: 'final class A { private A() {} }'
    },
    {
      name: 'HideUtilityClassConstructor',
      category: 'Class-Level',
      whereUsed: 'Utility Classes',
      whatItChecks: 'Utility classes (those with only static members) should have a private constructor to prevent instantiation.',
      whyItMatters: 'Prevents meaningless instantiation; clarifies design intent.',
      commonViolations: 'class Test { public Test() {} public static void fun() {} }',
      correctUsage: 'class Foo { private Foo() {} static int n; }'
    },
    {
      name: 'DesignForExtension',
      category: 'Class-Level',
      whereUsed: 'Class Methods',
      whatItChecks: 'Checks that overridable methods in non-final classes are either abstract or have an empty implementation (hook).',
      whyItMatters: 'Protects superclasses from being broken by subclasses and forces a clear extension contract.',
      commonViolations: 'protected void validate() { if (roots == null) throw new ...; }',
      correctUsage: 'private void validate() { validateEx(); } protected void validateEx() {}'
    },
    {
      name: 'AbstractClassName',
      category: 'Class-Level',
      whereUsed: 'Abstract Class Declaration',
      whatItChecks: 'Ensures abstract class names conform to a pattern, typically starting with "Abstract".',
      whyItMatters: 'Improves readability by making abstract base classes easily identifiable.',
      commonViolations: 'abstract class Second {} // violation',
      correctUsage: 'abstract class AbstractFirst {}'
    },
    {
      name: 'InterfaceIsType',
      category: 'Class-Level',
      whereUsed: 'Interface Declaration',
      whatItChecks: 'Ensures an interface defines a type by having methods, not just constants.',
      whyItMatters: 'Follows the principle that interfaces should define behavior (types), not just be constant holders.',
      commonViolations: 'interface Test1 { int a = 3; } // no methods',
      correctUsage: 'interface Test3 { int a = 3; void test(); }'
    },
    {
      name: 'ClassDataAbstractionCoupling',
      category: 'Class-Level',
      whereUsed: 'Class Body',
      whatItChecks: 'Measures the number of other classes instantiated within a given class, indicating coupling.',
      whyItMatters: 'High coupling makes a class harder to maintain and test, as it depends on many other types.',
      commonViolations: 'Too many different class instantiations in one class',
      correctUsage: 'Limited number of class dependencies'
    },
    {
      name: 'ClassFanOutComplexity',
      category: 'Class-Level',
      whereUsed: 'Class Dependencies',
      whatItChecks: 'Counts the number of other types a class relies on (imports, fields, etc.).',
      whyItMatters: 'High fan-out indicates high coupling, making the class brittle and hard to maintain.',
      commonViolations: 'Class with too many imports and dependencies',
      correctUsage: 'Class with focused, limited dependencies'
    },
    {
      name: 'AvoidStarImport',
      category: 'Class-Level',
      whereUsed: 'Import Statements',
      whatItChecks: 'Checks that there are no import statements that use the * notation.',
      whyItMatters: 'Star imports can pull in unexpected classes, lead to naming conflicts, and obscure dependencies.',
      commonViolations: 'import java.util.*; // violation',
      correctUsage: 'import java.util.List; import java.util.ArrayList;'
    },
    {
      name: 'MissingCtor',
      category: 'Class-Level',
      whereUsed: 'Class Declaration',
      whatItChecks: 'Checks that non-abstract classes define a constructor instead of relying on the default one.',
      whyItMatters: 'Ensures that object creation is an explicit, considered action.',
      commonViolations: 'class InvalidExample { public void test() {} }',
      correctUsage: 'class ExampleOk { ExampleOk(int a) { ... } }'
    },
    {
      name: 'InnerTypeLast',
      category: 'Class-Level',
      whereUsed: 'Class Body',
      whatItChecks: 'Ensures nested classes/interfaces are declared at the bottom of the class.',
      whyItMatters: 'Improves readability by placing primary class members (fields, constructors, methods) first.',
      commonViolations: 'Method declared after inner class',
      correctUsage: 'Inner classes at the bottom of the class'
    },

    // Method-Level Checks
    {
      name: 'MethodName',
      category: 'Method-Level',
      whereUsed: 'Method Declarations',
      whatItChecks: 'Method names should follow camelCase convention, starting with a lowercase letter.',
      whyItMatters: 'Consistency in naming improves readability; follows Java conventions.',
      commonViolations: 'public void Method3() {} // starts with uppercase',
      correctUsage: 'public void method1() {}'
    },
    {
      name: 'MethodLength',
      category: 'Method-Level',
      whereUsed: 'Method Body',
      whatItChecks: 'Methods should not exceed a maximum number of lines.',
      whyItMatters: 'Long methods are harder to understand, test, and maintain; encourages refactoring.',
      commonViolations: 'Method with too many lines of code',
      correctUsage: 'Concise, focused methods'
    },
    {
      name: 'FinalParameters',
      category: 'Method-Level',
      whereUsed: 'Method Parameters',
      whatItChecks: 'Method, constructor, and catch block parameters should be declared final.',
      whyItMatters: 'Prevents accidental parameter modification and improves code clarity.',
      commonViolations: 'public void methodTwo(int x) { } // x should be final',
      correctUsage: 'public void methodOne(final int x) { }'
    },
    {
      name: 'ParameterNumber',
      category: 'Method-Level',
      whereUsed: 'Method & Constructor Declaration',
      whatItChecks: 'Checks for a maximum number of parameters (default is 7).',
      whyItMatters: 'Methods with too many parameters can be a sign of poor cohesion and are hard to use.',
      commonViolations: 'Method with more than 7 parameters',
      correctUsage: 'Use parameter objects for numerous parameters'
    },
    {
      name: 'MethodTypeParameterName',
      category: 'Method-Level',
      whereUsed: 'Generic Method Declaration',
      whatItChecks: 'Ensures generic type parameter names conform to a pattern (usually a single uppercase letter).',
      whyItMatters: 'Follows standard Java conventions for generics, improving readability.',
      commonViolations: 'public <a> void method2() {} // should be uppercase',
      correctUsage: 'public <T> void method1() {}'
    },
    {
      name: 'OverloadedMethodsDeclarationOrder',
      category: 'Method-Level',
      whereUsed: 'Class Body',
      whatItChecks: 'Checks that overloaded methods are grouped together in the source file.',
      whyItMatters: 'Improves readability by keeping related methods physically close.',
      commonViolations: 'Overloaded methods separated by other methods',
      correctUsage: 'Overloaded methods grouped together'
    },
    {
      name: 'ReturnCount',
      category: 'Method-Level',
      whereUsed: 'Method Body',
      whatItChecks: 'Restricts the number of return statements in a method.',
      whyItMatters: 'Promotes single-exit-point design, which can be easier to reason about and debug.',
      commonViolations: 'Too many return statements in one method',
      correctUsage: 'Limited return statements per method'
    },
    {
      name: 'RequireThis',
      category: 'Method-Level',
      whereUsed: 'Method Body',
      whatItChecks: 'Checks that references to instance variables and methods use this. explicitly.',
      whyItMatters: 'Avoids ambiguity, especially when local variables or parameters shadow instance fields.',
      commonViolations: 'c = c; // ambiguous assignment',
      correctUsage: 'this.a = a; // this keyword used'
    },

    // Variable-Level Checks
    {
      name: 'MemberName',
      category: 'Variable-Level',
      whereUsed: 'Instance Variables',
      whatItChecks: 'Instance variable names should follow camelCase, starting with a lowercase letter.',
      whyItMatters: 'Consistent naming improves code readability and maintainability.',
      commonViolations: 'public int NUM1; // violation',
      correctUsage: 'public int num1;'
    },
    {
      name: 'LocalVariableName',
      category: 'Variable-Level',
      whereUsed: 'Local Variables',
      whatItChecks: 'Local variable names should follow camelCase convention.',
      whyItMatters: 'Maintains consistency with Java naming conventions.',
      commonViolations: 'for (int VAR = 1; VAR < 10; VAR++) { }',
      correctUsage: 'for (int var = 1; var < 10; var++) {}'
    },
    {
      name: 'StaticVariableName',
      category: 'Variable-Level',
      whereUsed: 'Static Variables',
      whatItChecks: 'Static, non-final variable names should follow camelCase. Static final constants should be UPPER_SNAKE_CASE.',
      whyItMatters: 'Distinguishes between mutable static state and immutable constants.',
      commonViolations: 'public static int ItStatic1 = 2; // should be camelCase',
      correctUsage: 'public static int goodStatic = 2;'
    },
    {
      name: 'LocalFinalVariableName',
      category: 'Variable-Level',
      whereUsed: 'Local Final Variables',
      whatItChecks: 'Checks that local final variable names conform to a specified pattern (usually camelCase).',
      whyItMatters: 'Ensures consistent naming for all local variables, final or not.',
      commonViolations: 'final int VAR1 = 5; // should be camelCase',
      correctUsage: 'final int var1 = 10;'
    },
    {
      name: 'UnusedLocalVariable',
      category: 'Variable-Level',
      whereUsed: 'Method Body',
      whatItChecks: 'Finds local variables that are declared but never used.',
      whyItMatters: 'Removes dead code; improves readability; may indicate logic errors.',
      commonViolations: 'int unusedVar = 10; // declared but never used',
      correctUsage: 'Remove unused variables'
    },
    {
      name: 'MultipleVariableDeclarations',
      category: 'Variable-Level',
      whereUsed: 'Variable Declarations',
      whatItChecks: 'Checks that each variable is declared in its own statement.',
      whyItMatters: 'Improves readability and makes it easier to add comments for each variable.',
      commonViolations: 'int lower, higher; // violation',
      correctUsage: 'int lower; int higher;'
    },
    {
      name: 'ExplicitInitialization',
      category: 'Variable-Level',
      whereUsed: 'Variable Initialization',
      whatItChecks: 'Checks if variables are explicitly initialized to their type\'s default value.',
      whyItMatters: 'This is redundant as Java provides default initialization. Omitting it makes code cleaner.',
      commonViolations: 'private int intField1 = 0; // violation',
      correctUsage: 'private int intField3; // relies on default init'
    },
    {
      name: 'VariableDeclarationUsageDistance',
      category: 'Variable-Level',
      whereUsed: 'Method Body',
      whatItChecks: 'Checks the distance (in lines) between a variable\'s declaration and its first use.',
      whyItMatters: 'Minimizing scope makes code easier to understand and reduces the chance of bugs.',
      commonViolations: 'Variable declared too far from its first use',
      correctUsage: 'Declare variables close to where they are used'
    },

    // Control-Flow Checks
    {
      name: 'ModifiedControlVariable',
      category: 'Control-Flow',
      whereUsed: 'for Loops',
      whatItChecks: 'Control variables in for loops should not be modified within the loop body.',
      whyItMatters: 'Prevents confusing loop behavior; makes loop bounds predictable and easy to understand.',
      commonViolations: 'for (int i = 0; i < 10; i++) { i++; } // modifying control variable',
      correctUsage: 'for (int i = 0; i < 10; i += 2) { } // modify in update clause'
    },
    {
      name: 'MissingSwitchDefault',
      category: 'Control-Flow',
      whereUsed: 'switch Statements',
      whatItChecks: 'All switch statements should have a default clause.',
      whyItMatters: 'Handles unexpected values; improves robustness; documents that all cases have been considered.',
      commonViolations: 'switch statement without default clause',
      correctUsage: 'switch (dayOfWeek) { case 1: return "Monday"; default: throw new ...; }'
    },
    {
      name: 'SimplifyBooleanExpression',
      category: 'Control-Flow',
      whereUsed: 'Boolean Expressions',
      whatItChecks: 'Finds boolean expressions that can be simplified.',
      whyItMatters: 'Improves readability; reduces complexity; eliminates redundancy.',
      commonViolations: 'if (condition == true) { ... } // redundant == true',
      correctUsage: 'if (condition) { ... } // simplified'
    },
    {
      name: 'SimplifyBooleanReturn',
      category: 'Control-Flow',
      whereUsed: 'Return Statements',
      whatItChecks: 'Finds if-else blocks that can be simplified to a single boolean return statement.',
      whyItMatters: 'Reduces code complexity and line count; improves readability.',
      commonViolations: 'if (cond) { return true; } else { return false; }',
      correctUsage: 'return cond;'
    },
    {
      name: 'DefaultComesLast',
      category: 'Control-Flow',
      whereUsed: 'switch Statements',
      whatItChecks: 'The default clause should be the last clause in switch statements.',
      whyItMatters: 'Follows conventional ordering; improves readability and predictability.',
      commonViolations: 'default clause not at the end of switch',
      correctUsage: 'default clause as the last case in switch'
    },
    {
      name: 'NeedBraces',
      category: 'Control-Flow',
      whereUsed: 'Control Flow Statements',
      whatItChecks: 'Ensures if, else, for, while, and do-while statements use curly braces {}.',
      whyItMatters: 'Prevents common bugs like the "dangling else" problem and improves code clarity.',
      commonViolations: 'if (obj.equals(num)) return true; // violation',
      correctUsage: 'if (obj.equals(num)) { return true; }'
    },
    {
      name: 'EmptyStatement',
      category: 'Control-Flow',
      whereUsed: 'Anywhere',
      whatItChecks: 'Detects empty statements (a standalone semicolon ;).',
      whyItMatters: 'Empty statements are often typos that create hard-to-find bugs.',
      commonViolations: 'if(i > 3); // violation',
      correctUsage: 'if(i > 3) { i++; }'
    },
    {
      name: 'EmptyBlock',
      category: 'Control-Flow',
      whereUsed: 'Any Block',
      whatItChecks: 'Checks for empty blocks {}.',
      whyItMatters: 'Empty blocks can indicate unfinished code or a logical error.',
      commonViolations: 'if ( SomeTest ) { } // empty block',
      correctUsage: 'if ( SomeTest ) { // do nothing, by design }'
    },
    {
      name: 'AvoidInlineConditionals',
      category: 'Control-Flow',
      whereUsed: 'Ternary Operator',
      whatItChecks: 'Detects inline conditional (ternary) operators.',
      whyItMatters: 'Complex ternaries can be very hard to read. A standard if-else is often clearer.',
      commonViolations: 'b = (a != null && a.length() >= 1) ? a.substring(1) : null;',
      correctUsage: 'Use if-else for better readability'
    },
    {
      name: 'BooleanExpressionComplexity',
      category: 'Control-Flow',
      whereUsed: 'Boolean Expressions',
      whatItChecks: 'Restricts the number of boolean operators in an expression.',
      whyItMatters: 'Overly complex conditions are hard to read, debug, and maintain.',
      commonViolations: 'boolean d = (a & b) | (b ^ a) | (a ^ b); // too complex',
      correctUsage: 'Break down complex boolean expressions'
    },
    {
      name: 'FallsThrough',
      category: 'Control-Flow',
      whereUsed: 'switch Statements',
      whatItChecks: 'Checks for fall-through in switch statements where a case lacks a break, return, etc.',
      whyItMatters: 'Accidental fall-through is a common source of bugs.',
      commonViolations: 'case 1: i++; case 2: // fall through from case 1',
      correctUsage: 'case 1: i++; // fall through (intentional comment)'
    },
    {
      name: 'NestedIfDepth',
      category: 'Control-Flow',
      whereUsed: 'if Statements',
      whatItChecks: 'Restricts the depth of nested if statements.',
      whyItMatters: 'Deeply nested logic is extremely difficult to follow and should be refactored.',
      commonViolations: 'Too many nested if statements',
      correctUsage: 'Refactor using helper methods or guard clauses'
    },

    // Java-Specific Checks
    {
      name: 'MissingOverride',
      category: 'Java-Specific',
      whereUsed: 'Method Declarations',
      whatItChecks: 'Verifies that the @Override annotation is present when a method overrides a superclass method.',
      whyItMatters: 'Prevents subtle bugs from typos in method signatures and clearly communicates intent.',
      commonViolations: 'public void test2() { } // missing @Override',
      correctUsage: '@Override public void test1() { }'
    },
    {
      name: 'CovariantEquals',
      category: 'Java-Specific',
      whereUsed: 'equals() Methods',
      whatItChecks: 'Classes that define a covariant equals(SomeType) should also override equals(Object).',
      whyItMatters: 'Ensures the equals contract is correctly implemented, preventing bugs when using collections.',
      commonViolations: 'public boolean equals(Test i) { } // missing equals(Object)',
      correctUsage: 'Override both equals(SomeType) and equals(Object)'
    },
    {
      name: 'EqualsHashCode',
      category: 'Java-Specific',
      whereUsed: 'Class Definitions',
      whatItChecks: 'Classes that override equals() must also override hashCode().',
      whyItMatters: 'Maintains the equals-hashCode contract, essential for hash-based collections.',
      commonViolations: 'Override equals() without overriding hashCode()',
      correctUsage: 'Override both equals() and hashCode() together'
    },
    {
      name: 'SuperClone',
      category: 'Java-Specific',
      whereUsed: 'clone() Method',
      whatItChecks: 'Checks that an overriding clone() method invokes super.clone().',
      whyItMatters: 'Ensures the cloning process is correctly chained up the inheritance hierarchy.',
      commonViolations: 'clone() method not calling super.clone()',
      correctUsage: 'public Object clone() { return super.clone(); }'
    },
    {
      name: 'SuperFinalize',
      category: 'Java-Specific',
      whereUsed: 'finalize() Method',
      whatItChecks: 'Checks that an overriding finalize() method invokes super.finalize().',
      whyItMatters: 'Ensures that cleanup logic in all superclasses is executed correctly.',
      commonViolations: 'finalize() method not calling super.finalize()',
      correctUsage: 'protected void finalize() { super.finalize(); }'
    }
  ], []);

  const categories = [
    { id: 'all', label: 'All Rules', count: checkstyleRules.length },
    { id: 'Class-Level', label: 'Class-Level', count: checkstyleRules.filter(r => r.category === 'Class-Level').length },
    { id: 'Method-Level', label: 'Method-Level', count: checkstyleRules.filter(r => r.category === 'Method-Level').length },
    { id: 'Variable-Level', label: 'Variable-Level', count: checkstyleRules.filter(r => r.category === 'Variable-Level').length },
    { id: 'Control-Flow', label: 'Control-Flow', count: checkstyleRules.filter(r => r.category === 'Control-Flow').length },
    { id: 'Java-Specific', label: 'Java-Specific', count: checkstyleRules.filter(r => r.category === 'Java-Specific').length }
  ];

  const generateAnswerOptions = useCallback(() => {
    if (shuffledRules.length === 0) return;

    const currentRule = shuffledRules[currentRuleIndex];
    if (!currentRule) return;

    const incorrectAnswers = checkstyleRules
      .filter(rule => rule.name !== currentRule.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(rule => rule.name);
    
    const options = [...incorrectAnswers, currentRule.name].sort(() => Math.random() - 0.5);
    setAnswerOptions(options);
  }, [shuffledRules, currentRuleIndex, checkstyleRules]);

  useEffect(() => {
    const filteredRules = selectedCategory === 'all' 
      ? checkstyleRules 
      : checkstyleRules.filter(rule => rule.category === selectedCategory);
    
    const shuffled = [...filteredRules].sort(() => Math.random() - 0.5);
    setShuffledRules(shuffled);
    setCurrentRuleIndex(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [selectedCategory, checkstyleRules]);

  useEffect(() => {
    if (shuffledRules.length > 0) {
      generateAnswerOptions();
    }
  }, [currentRuleIndex, shuffledRules, generateAnswerOptions]);

  const handleAnswerSelection = (answer: string) => {
    if (showAnswer) return;
    
    const currentRule = shuffledRules[currentRuleIndex];
    setSelectedAnswer(answer);
    setShowAnswer(true);

    if (answer === currentRule.name) {
      setIsCorrect(true);
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setIsCorrect(false);
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const nextRule = () => {
    if (currentRuleIndex < shuffledRules.length - 1) {
      setCurrentRuleIndex(prevIndex => prevIndex + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // End of quiz, maybe show a summary screen or restart
      setGameStarted(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Class-Level': 'from-blue-500 to-cyan-500',
      'Method-Level': 'from-emerald-500 to-teal-500',
      'Variable-Level': 'from-purple-500 to-violet-500',
      'Control-Flow': 'from-orange-500 to-amber-500',
      'Java-Specific': 'from-rose-500 to-pink-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  const getScoreColor = () => {
    const percentage = score.total > 0 ? (score.correct / score.total) * 100 : 0;
    if (percentage >= 80) return 'text-emerald-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

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
                  href="/checkstyle"
                  className="nav-link text-slate-600 hover:text-slate-800 flex items-center text-sm sm:text-base"
                >
                  Reference Guide
                </Link>
              </div>
              <div className="flex items-center space-x-3 sm:space-x-4 order-1 sm:order-2">
                <div className="floating-element">
                  <BeakerIcon className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">Checkstyle Reverse Quiz</h1>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-600">Guess the rule by its definition</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 order-3">
                {gameStarted && (
                  <div className="glass-card px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                    <span className={`text-xs sm:text-sm font-medium ${getScoreColor()}`}>
                      Score: {score.correct}/{score.total}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {!gameStarted ? (
          // Start Screen
          <div className="text-center">
            <div className="study-card p-8 sm:p-12 max-w-2xl mx-auto">
              <div className="floating-element mb-6 sm:mb-8">
                <TrophyIcon className="h-16 w-16 sm:h-20 sm:w-20 text-yellow-500 mx-auto" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">Ready for a New Challenge?</h2>
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
                This time, you&apos;ll see a rule&apos;s definition and have to guess its name. Good luck!
              </p>

              {/* Category Selection */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">Choose Category:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        // Auto-start the game when category is selected
                        setGameStarted(true);
                        setScore({ correct: 0, total: 0 });
                        setCurrentRuleIndex(0);
                        setShowAnswer(false);
                      }}
                      className={`p-3 sm:p-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      {category.label}
                      <div className="text-xs opacity-75 mt-1">{category.count} rules</div>
                    </button>
                  ))}
                </div>
              </div>

              {score.total > 0 && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <h3 className="text-base sm:text-lg font-semibold text-yellow-800 mb-2 flex items-center justify-center">
                    <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    Last Score
                  </h3>
                  <div className={`text-xl sm:text-2xl font-bold ${getScoreColor()}`}>
                    {score.correct}/{score.total} ({Math.round((score.correct / score.total) * 100)}%)
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Quiz Interface
          <div className="space-y-6 sm:space-y-8">
            {/* Progress Bar */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm font-medium text-slate-600">
                  Question {currentRuleIndex + 1} of {shuffledRules.length}
                </div>
                <div className={`text-xs sm:text-sm font-medium ${getScoreColor()}`}>
                  Score: {score.correct}/{score.total}
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                  style={{ width: `${((currentRuleIndex + 1) / shuffledRules.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {shuffledRules[currentRuleIndex] && (
              <div className="study-card p-6 sm:p-8">
                {/* Rule Definition */}
                <div className="text-left mb-6 sm:mb-8">
                  <div className={`inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gradient-to-r ${getCategoryColor(shuffledRules[currentRuleIndex].category)} text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4`}>
                    {shuffledRules[currentRuleIndex].category}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">What it checks:</h3>
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{shuffledRules[currentRuleIndex].whatItChecks}</p>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">Why it matters:</h3>
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base">{shuffledRules[currentRuleIndex].whyItMatters}</p>
                    </div>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {answerOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerSelection(option)}
                      disabled={showAnswer}
                      className={`p-4 rounded-xl text-left font-medium transition-all duration-200 w-full
                        ${showAnswer && option === selectedAnswer && isCorrect ? 'bg-emerald-500 text-white border-emerald-700' : ''}
                        ${showAnswer && option === selectedAnswer && !isCorrect ? 'bg-red-500 text-white border-red-700' : ''}
                        ${showAnswer && option !== selectedAnswer && option === shuffledRules[currentRuleIndex].name ? 'bg-emerald-200 text-emerald-900 border-emerald-400' : ''}
                        ${!showAnswer ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300' : ''}
                        ${showAnswer ? 'disabled:opacity-80' : ''}
                      `}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showAnswer && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={nextRule}
                      className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      Next Question
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}